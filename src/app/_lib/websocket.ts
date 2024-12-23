export function setConnectUrl(url: string) {
  localStorage.setItem("url", url);
}

export function getConnectUrl() {
  return localStorage.getItem("url") || "";
}

export interface PostListParams {
  id: number;
  title: string;
}

export function createPost<T>(content: T[]) {
  const connectUrl = getConnectUrl();
  const socket = new WebSocket(connectUrl);

  socket.onopen = () => {
    const postMessage = {
      action: "create_post",
      data: content,
    };
    socket.send(JSON.stringify(postMessage));
    console.log("Create Post:", postMessage);

    socket.close();
  };

  socket.onclose = () => {
    console.log("Socket Closed.");
  };

  socket.onerror = (error) => {
    console.error("Socket Error:", error);
  };
}

export function updatePost<T>(postId: number, content: T[]) {
  const connectUrl = getConnectUrl();
  const socket = new WebSocket(connectUrl);

  if (socket?.readyState === WebSocket.OPEN) {
    const updatePostMessage = {
      action: "update_post",
      data: {
        id: postId,
        content,
      },
    };
    socket.send(JSON.stringify(updatePostMessage));
    console.log("Update Post:", updatePostMessage);
  } else {
    console.log("Socket is not open.");
  }
}

export function getPostList(setPostList: (postList: PostListParams[]) => void) {
  const connectUrl = getConnectUrl();
  const socket = new WebSocket(connectUrl);

  socket.onopen = () => {
    // 서버에 "get_post_list" 요청 보내기
    const postListMessage = {
      action: "get_post_list",
    };
    socket.send(JSON.stringify(postListMessage));
    console.log("Get Post List:", postListMessage);
  };

  socket.onmessage = (event) => {
    try {
      console.log("Received Message:", event.data); // 서버로부터 받은 데이터 출력
      const response = JSON.parse(event.data);
      console.log("Post List:", response.data); // 서버로부터 받은 데이터 출력

      // 받은 데이터를 처리 (예: 화면에 게시글 목록 표시)
      if (response.action === "post_list") {
        // 서버가 반환한 게시글 목록(response.data)을 처리합니다.
        const postList = response.data;
        console.log("Received Post List:", postList);
        // 게시글 목록을 화면에 표시하거나 다른 방식으로 처리

        setPostList(postList);
        socket.close();
      }
    } catch (error) {
      console.error("Error parsing message:", error);
    }
  };

  socket.onclose = () => {
    console.log("Socket Closed.");
  };

  socket.onerror = (error) => {
    console.error("Socket Error:", error);
  };
}

export function getPost<T>(postId: number, setPost: (post: T) => void) {
  const connectUrl = getConnectUrl();
  const socket = new WebSocket(connectUrl);

  socket.onopen = () => {
    // 서버에 "get_post" 요청 보내기
    const postListMessage = {
      action: "get_post",
      data: postId,
    };
    socket.send(JSON.stringify(postListMessage));
    console.log("Get Post:", postListMessage);
  };

  socket.onmessage = (event) => {
    try {
      console.log("Received Message:", event.data); // 서버로부터 받은 데이터 출력
      const response = JSON.parse(event.data);
      console.log("Post:", response.data); // 서버로부터 받은 데이터 출력

      // 받은 데이터를 처리 (예: 화면에 게시글 목록 표시)
      if (response.action === "post") {
        // 서버가 반환한 게시글 목록(response.data)을 처리합니다.
        const post = response.data;
        console.log("Received Post:", post);
        // 게시글 목록을 화면에 표시하거나 다른 방식으로 처리

        setPost(post);
        socket.close();
      }
    } catch (error) {
      console.error("Error parsing message:", error);
    }
  };
}
