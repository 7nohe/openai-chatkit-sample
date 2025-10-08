'use client';

import { Chat } from "./components/Chat";

export default function Home() {
  return (
    <div className="font-sans">
      <main className="flex flex-col w-full min-h-screen items-center justify-center">
        <Chat />
      </main>
    </div>
  );
}
