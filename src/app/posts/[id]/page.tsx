"use client";
import { getPost } from "@/app/_lib/websocket";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { Block, PartialBlock } from "@blocknote/core";
import { useEffect, useState } from "react";

const Editor = dynamic(() => import("../../_components/Editor"), {
  ssr: false,
});

interface blockType {
  postId: number;
  title: string;
  data: Array<Block>;
}

export default function GetPost() {
  const [blocks, setBlocks] = useState<blockType | undefined>(undefined);
  const [init, setInit] = useState<PartialBlock[] | undefined>(undefined);
  const { id } = useParams();

  useEffect(() => {
    getPost<blockType>(parseInt(id as string), setBlocks);
  }, [id]);

  useEffect(() => {
    console.log("blocks", blocks);
    if (Array.isArray(blocks?.data)) {
      setInit(
        blocks.data.map((block) => {
          console.log("block", block);

          return {
            type: block.type,
            content: block.content,
            children: block.children,
          } as PartialBlock;
        })
      );
    }
  }, [blocks]);

  return <Editor id={parseInt(id as string)} initialContent={init} />;
}
