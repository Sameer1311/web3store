"use client";

import { useEffect, useState } from "react";
import { Sun, Moon, PanelTopOpen, PanelTopClose } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from 'next/image';
import { signOut, useSession } from "next-auth/react"; // Import useSession from next-auth/react

const Navbar = () => {
  const [theme, setTheme] = useState(false);
  const [panel, setPanel] = useState(false);
  
  // Fetch user session using useSession
  const { data: session } = useSession();

  useEffect(() => {
    document.body.classList.toggle("dark", theme);
  }, [theme]);

  return (
    <nav className={`w-full overflow-x-hidden p-2 font-bold ${theme ? "dark bg-black text-white" : "bg-white text-black"}`}>
      {/* Large Screens */}
      <div className="hidden md:flex items-center justify-between">
        {/* Left Navigation */}
        <ul className="flex space-x-6 p-2 items-center mx-4">
          <Link href="/components_Web/userDetails">
          <div className="text-center">
            <Image
              src="/account.svg"
              height={50}
              width={50}
              alt="Account / Dashboard"
              className="dark:fill-white"
            />
            <span className="font-bold"></span> {session?.user?.name}
            </div>
          </Link>
          <li className="cursor-pointer hover:underline"><Link href="/">Home</Link></li>
          <li className="cursor-pointer hover:underline"><Link href="/components_Web/About">About</Link></li>
          <li className="cursor-pointer hover:underline"><Link scroll={true} href="/components_Web/Section">Contact Us</Link></li>
        </ul>

        {/* Right Actions */}
        <div className="flex space-x-4">
          {/* Conditional Rendering for Login/Logout Button */}
          {!session ? (
            <Link href="/components_Web/login">
              <Button className="p-2 font-bold">Login</Button>
            </Link>
          ) : (
            <Button className="p-2 font-bold" onClick={() => signOut()}>
              Logout
            </Button>
          )}

          {/* Theme Toggle Button */}
          <Button className="p-2" onClick={() => setTheme(!theme)} aria-label="Toggle Theme">
            {theme ? <Moon size={30} /> : <Sun size={30} />}
          </Button>
        </div>
      </div>

      {/* Small Screens */}
      <div className="md:hidden flex justify-between items-center">
        {/* Panel Toggle */}
        <Button className="p-2" onClick={() => setPanel(!panel)} aria-label="Toggle Panel">
          {panel ? <PanelTopClose size={40} /> : <PanelTopOpen size={40} />}
        </Button>

        {/* Right Actions */}
        <div className="flex space-x-3">
          {/* Conditional Rendering for Login/Logout Button */}
          {!session ? (
            <Link href="/components_Web/login">
              <Button className="p-2 font-bold">Login</Button>
            </Link>
          ) : (
            <Button className="p-2 font-bold" onClick={() => signOut()}>
              Logout
            </Button>
          )}

          {/* Theme Toggle Button */}
          <Button className="p-2" onClick={() => setTheme(!theme)} aria-label="Toggle Theme">
            {theme ? <Moon size={30} /> : <Sun size={30} />}
          </Button>
        </div>
      </div>

      {/* Dropdown Menu for Small Screens */}
      {panel && (
        <div className="w-full shadow-md rounded-lg mt-4">
          <ul className="flex flex-col items-center space-y-4 p-4">
            <Link href="/components_Web/userDetails">
            <div className="text-center">
              <Image
                src="/account.svg"
                height={50}
                width={50}
                alt="Account / Dashboard"
              />
              <span className="font-bold"></span> {session?.user?.name}
              </div>
            </Link>
            <li className="cursor-pointer hover:underline"><Link href="/">Home</Link></li>
            <li className="cursor-pointer hover:underline"><Link href="/components_Web/About">About</Link></li>
            <li className="cursor-pointer hover:underline"><Link href="/components_Web/Section">Contact Us</Link></li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
