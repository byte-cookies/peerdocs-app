"use client";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";

const Editor = dynamic(() => import("../../_components/Editor"), {
  ssr: false,
});

export default function GetPost() {
  const { id } = useParams();

  return <Editor id={parseInt(id as string)} />;
}
