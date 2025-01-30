"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function UserInfo() {
  const { data: session } = useSession();

  return (
    <div className="grid place-items-center  h-[90vh] md:h-screen  bg-gray-100 dark:bg-gray-900 text-center p-4">
    <Link href='/'>
        <Button className='absolute  top-2 left-4 w-fit font-bold'>
            Home
        </Button>
    </Link>
     
      <div className="shadow-lg p-8 bg-zinc-300/10 dark:bg-zinc-800 rounded-lg flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Welcome, {session?.user?.name}!</h1>
        
        <p className="text-gray-700 dark:text-gray-300 font-bold">
          Thank you for visiting my page. I appreciate your time and support! 😊
        </p>

        <div className="mt-4">
          <div className="text-lg">
            <span className="font-semibold">Name:</span> {session?.user?.name}
          </div>
          <div className="text-lg">
            <span className="font-semibold">Email:</span> {session?.user?.email}
          </div>
        </div>

        <button
          onClick={() => signOut()}
          className="bg-red-500 hover:bg-red-600 text-white font-bold px-6 py-2 mt-4 rounded-md transition-all"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
