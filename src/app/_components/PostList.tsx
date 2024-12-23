import PostItem from "./PostItem";
import { PostListParams } from "../_lib/websocket";

interface PostListProps {
  list: PostListParams[];
}

export default function PostList({ list }: PostListProps) {
  return (
    <article className="w-full flex flex-col">
      {list.map((post) => (
        <PostItem key={post.id} id={post.id} title={post.title} />
      ))}
    </article>
  );
}
