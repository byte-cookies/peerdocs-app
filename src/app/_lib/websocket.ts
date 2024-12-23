let socket: WebSocket | null = null;

export function connect(url: string) {
  if (socket !== null) {
    socket.close();
  }

  socket = new WebSocket(url); // ex) ws://localhost:3000/

  socket.onopen = () => {
    alert("Socket is open.");
  };
  socket.onmessage = (event) => {
    console.log("Message Receive:", event.data);
  };
  socket.onclose = () => {
    alert("Socket is closed.");
  };
  socket.onerror = (error) => {
    console.error("Socket Error:", error);
  };
}

export function createPost<T>(content: T[]) {
  if (socket?.readyState === WebSocket.OPEN) {
    const postMessage = {
      action: "create_post",
      data: content,
    };
    socket.send(JSON.stringify(postMessage));
    console.log("Create Post:", postMessage);
  } else {
    console.log("Socket is not open.");
  }
}

export function updatePost<T>(postId: number, content: T[]) {
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

export function getPostList() {}

export function getPost(postId: number) {}
