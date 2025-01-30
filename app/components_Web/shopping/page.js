/* eslint-disable jsx-a11y/role-supports-aria-props */
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {ShoppingCart ,  PanelTopOpenIcon, PanelTopCloseIcon, Sun, Moon } from "lucide-react";
import clsx from "clsx";
import Link from "next/link";
import Shopping_sec from "../shoppingsection/page";
import Image from 'next/image'



const IconButton = ({ onClick, Icon, className, ariaLabel }) => (
  <Button
    onClick={onClick}
    className={className}
    aria-label={ariaLabel} // Added for better accessibility
  >
    <Icon width={30} height={30} />
  </Button>
);

const Shopping = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [panelOpen, setPanelOpen] = useState(false);
  const [theme, setTheme] = useState(false);
  

  // Load theme preference from localStorage
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) setTheme(storedTheme === "dark");
  }, []);

  // Save theme preference to localStorage
  useEffect(() => {
    localStorage.setItem("theme", theme ? "dark" : "light");
  }, [theme]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://fakestoreapi.com/products/categories", {
          method: "GET",
        });

        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        } else {
          console.error("Failed to fetch categories");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const togglePanel = () => setPanelOpen(!panelOpen);
  const toggleTheme = () => setTheme(!theme);

  return (
    <main
      className={clsx(
        "flex h-screen w-full transition-colors duration-300 ",
        {
          "dark bg-black text-white": theme,
        }
      )}
    >
      
      {/* Sidebar Section */}
      <section
        aria-expanded={panelOpen}
        className={clsx(
          "absolute flex flex-col justify-between space-y-4 md:space-y-8 transition-all ease-in-out duration-300 my-2 md:my-0 md:mx-2",
          {
            "w-64 h-full md:w-1/4 bg-gray-100 dark:bg-zinc-800 dark:border-zinc-700":
              panelOpen,
            "w-fit h-fit": !panelOpen,
          }
        )}
      >
        {/* Header Section */}
        <div className="w-fit mt-3 mx-4 transition-all ease-in-out duration-300">
          <IconButton
            onClick={togglePanel}
            Icon={panelOpen ? PanelTopOpenIcon : PanelTopCloseIcon}
            className="border-2 border-gray-300 dark:border-zinc-600 rounded-md transition-all ease-in-out duration-300"
            ariaLabel="Toggle Sidebar"
          />
        </div>

        {/* Sidebar Content */}
        {panelOpen && (
          <div className="p-4 flex flex-col justify-between h-full">
            {/* Theme Toggle */}
            <div className="flex justify-end w-fit">
              <IconButton
                onClick={toggleTheme}
                Icon={theme ? Moon : Sun}
                className="border-2 border-gray-300 dark:border-zinc-600 rounded-full"
                ariaLabel="Toggle Theme"
              />
            </div>

            {/* Navigation Links */}
            <div className="mt-4 w-fit">
              <Link href="/">
                <p className="font-bold text-blue-600 dark:text-blue-400 w-fit hover:underline cursor-pointer">
                  Home
                </p>
              </Link>
            </div>

            {/* Categories Section */}
            <div className="mt-6">
              <h1 className="text-lg md:text-xl font-bold text-gray-700 dark:text-gray-300">
                Categories
              </h1>
              {loading ? (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Loading categories...
                </p>
              ) : (
                categories.map((category, index) => (
                  <ol key={index} className="list-disc ml-5 mt-2">
                    <li className="text-gray-600 dark:text-gray-400 hover:underline hover:text-blue-500 dark:hover:text-blue-300 cursor-pointer">
                      {category}
                    </li>
                  </ol>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
              <small>&copy; All rights reserved</small>
            </div>
          </div>
        )}
      </section>

      {/* Main Content Section */}
      <div className="flex-grow overflow-y-auto md:overflow-x-hidden h-full">
        <Shopping_sec />
      </div>
    </main>
  );
};

export default Shopping;
