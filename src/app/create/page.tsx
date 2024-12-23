"use client";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("../_components/Editor"), {
  ssr: false,
});

export default function CreatePost() {
  return <Editor id={-1} />;
}
