"use client";
import { connect } from "./_lib/websocket";
import PostList from "./_components/PostList";
import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState<string>("");

  return (
    <main className="p-4">
      <section className="max-w-4xl mx-auto flex flex-col gap-6">
        {/* Action Buttons */}
        <header className="flex justify-between gap-4">
          {/* input text 서버 url 입력 */}
          <input
            type="text"
            className="w-[78%] p-2 border border-gray-300 rounded-lg"
            placeholder="서버 URL을 입력해주세요."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button
            className="h-[2.5rem] px-4 text-sm font-medium rounded-lg bg-blue-500 text-white hover:bg-blue-600"
            onClick={() => connect(url)}
          >
            서버 연결
          </button>
        </header>

        <article className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Header */}
          <header className="flex justify-between bg-gray-100 px-4 py-2">
            <h2 className="text-lg font-semibold text-gray-800">모든 게시글</h2>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
          </header>

          {/* Post List */}
          <article className="p-4">
            <div className="w-full flex justify-center gap-4 mb-4">
              <button
                className="h-[2.5rem] px-4 text-sm font-medium rounded-lg bg-green-500 text-white hover:bg-green-600"
                onClick={() => {
                  window.location.href = "./create";
                }}
              >
                게시글 작성하기
              </button>
              <button
                className="h-[2.5rem] px-4 text-sm font-medium rounded-lg bg-purple-500 text-white hover:bg-purple-600"
                onClick={() => connect(url)}
              >
                게시글 가져오기
              </button>
            </div>
            <PostList />
          </article>
        </article>
      </section>
    </main>
  );
}
