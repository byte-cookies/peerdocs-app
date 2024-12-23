"use client";
import { Block, BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { useState } from "react";
import { createPost, updatePost } from "../_lib/websocket";

interface EditorProps {
  id: number;
  initialContent?: PartialBlock[];
}

export default function Editor({ id, initialContent }: EditorProps) {
  const [blocks, setBlocks] = useState<Block[]>([]);

  let editor: BlockNoteEditor;

  if (initialContent) {
    editor = useCreateBlockNote({
      initialContent: initialContent,
    });
  } else {
    editor = useCreateBlockNote();
  }

  return (
    <main className="p-4">
      <article className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <header className="bg-gray-100 flex items-center justify-between px-4 py-2 rounded-t-lg">
          <h2 className="text-lg font-semibold text-gray-800">
            {id === -1 ? "새 게시물 작성" : `게시물: ${id}`}
          </h2>
          <button
            className="w-[6rem] h-[2.5rem] bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition"
            onClick={() => {
              // id === -1 means creating a new post
              if (id === -1) {
                createPost<Block>(blocks);
              } else {
                updatePost<Block>(id, blocks);
              }
            }}
          >
            저장하기
          </button>
        </header>

        {/* Editor */}
        <div className="p-4">
          <BlockNoteView
            theme="light"
            editor={editor}
            onChange={() => {
              setBlocks(editor.document);
            }}
          />
        </div>
      </article>
    </main>
  );
}
