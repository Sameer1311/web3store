"use client"; // Ensure the component is client-side

import React from "react";
import Image from "next/image";
import About from "@/app/components_Web/About/page";
import Link from "next/link";

const Section = () => {
  return (
    <section className="w-full h-auto bg-white dark:bg-gray-900 flex flex-col items-center justify-center px-6 py-12">
      <div className="flex flex-col md:flex-row w-full border-b-2 my-2 border-black">
        {/* Background Video */}
        <video
          className="w-full md:w-1/2 h-64 md:h-auto object-cover rounded-t-lg md:rounded-t-none md:rounded-l-lg my-1"
          src="/Website_clip.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        />
        {/* Text Content */}
        <div className="flex flex-col items-center justify-center w-full p-6 space-y-4">
          <p className="text-sm text-gray-500 dark:text-gray-400 font-light">
            {"Trendy collection's"}
          </p>

          <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white text-center">
            Building
            <Image
              className="inline-block  mx-2 border border-white rounded-full"
              src="/logo.webp"
              alt="logo image"
              width={50}
              height={50}
            />
            <br />a better you
          </h1>

          <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 text-center">
            Anyone can beat you, but not your outfit.
          </p>

          <Link href="/components_Web/shopping">
  <button className="px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900">
    Start Shopping
  </button>
</Link>
        </div>
      </div>
      <About />
    </section>
  );
};

export default Section;
