import { Inter } from "next/font/google";
import Todos from "@/components/Todos";

export const metadata = {
  title: 'Todo List',
  description: 'A todolist app with NextJS for Cosmos assesment.',
}

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex flex-col items-center h-screen overflow-auto bg-gradient-to-r from-purple-500
       to-indigo-500 via-purple-500 ${inter.className}`}
    >
      <Todos />
    </main>
  );
}
