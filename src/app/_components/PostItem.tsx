import Link from "next/link";

interface PostItemProps {
  id: number;
  title: string;
}

export default function PostItem({ id, title }: PostItemProps) {
  return (
    <Link href={`/posts/${id}`}>
      <p className="mb-1 pl-2 w-full flex items-center h-[2.2rem] bg-gray-200 rounded-lg">
        {title}
      </p>
    </Link>
  );
}
