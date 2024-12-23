import PostItem from "./PostItem";

export default function PostList() {
  const posts = [
    { id: 1, title: "나 진짜 뒤질게~" },
    { id: 2, title: "아 몰라 과제 오늘 밤까지야~ 기능 구현 안됬다 수고해라" },
  ];

  return (
    <article className="w-full flex flex-col">
      {posts.map((post) => (
        <PostItem key={post.id} id={post.id} title={post.title} />
      ))}
    </article>
  );
}
