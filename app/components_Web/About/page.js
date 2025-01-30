"use client";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

const About = () => {
  useEffect(() => {
    // Dynamically load lordicon script
    const script = document.createElement("script");
    script.src = "https://cdn.lordicon.com/lordicon.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const technologies = [
    { name: "Next.js", description: "React framework for SSR and SSG." },
    { name: "React.js", description: "Library for building user interfaces." },
    { name: "Tailwind CSS", description: "Utility-first CSS framework." },
    { name: "Lordicon", description: "Animated icons for enhanced visuals." },
    { name: "HTML5", description: "Markup language for building the web." },
    { name: "CSS3", description: "Stylesheet language for responsive design." },
    { name: "JavaScript", description: "Programming language for interactivity." },
    { name: "shadcn", description: "Beautifully designed UI components." },
    { name: "MongoDB", description: "Developer-friendly NoSQL database." },
    { name: "NextAuth", description: "Authentication solution for Next.js apps." },
    { name: "bcryptjs", description: "Library for hashing and comparing passwords." },
  ];

  return (
    <section className="my-10 mx-2 w-[100vw] h-fit bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
      <Head>
        <title>About | Shopping Website</title>
        <meta
          name="description"
          content="About the creator of this shopping website. Learn more about Sameer Negi and the technologies used."
        />
      </Head>

      <div className="flex flex-col space-y-10 animate-fadeIn">
        {/* About Creator Section */}
        <div className="flex flex-col md:flex-row justify-between items-center  hover:border-2 rounded-lg p-6 bg-white dark:bg-gray-800">
          <div className="flex flex-col text-center  md:text-left">
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
              About Creator
            </h1>
            <p className="mt-4 text-lg md:w-[40vw]">
              This website is proudly created by{" "}
              <strong className="font-bold underline">Sameer Negi</strong>. As a passionate web developer, I aim to deliver exceptional digital
              experiences by combining creativity, innovation, and the latest technologies.
            </p>
          </div>
          <Image
            className="rounded-full w-[60vw] md:w-[15vw] h-[30vh] object-cover border-4 border-blue-500 shadow-lg transition-transform hover:scale-105"
            src="/creator.jpeg"
            alt="Sameer Negi - Website Creator"
            width={500}
            height={500}
            priority={true}
          />
        </div>

        {/* Contact Me Section */}
        <div className="p-6 rounded-lg  border-2 bg-white dark:bg-gray-800">
          <h1 className="text-3xl font-extrabold text-center dark:text-white  text-black bg-clip-text">
            Contact Me
          </h1>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 items-center justify-center mt-6 ">
            {[
              { name: "Instagram", href: "https://www.instagram.com/negisameer_106?utm_source=qr", icon: "https://cdn.lordicon.com/roscsuft.json" },
              { name: "Facebook", href: "https://www.facebook.com/sameer.negi.39108", icon: "https://cdn.lordicon.com/cxauoejw.json" },
              { name: "LinkedIn", href: "https://www.linkedin.com/in/sameer-negi-52a85b336?utm_source=share&utm_champaign=share_voa&utm_content=profile&utm_medium=android_app", icon: "https://cdn.lordicon.com/dsdlqjde.json" },
              { name: "WhatsApp", href: "https://wa.me/qr/Y6CUU4BPR42PN1", icon: "https://cdn.lordicon.com/axewyqun.json" },
            ].map((social, index) => (
              <li key={index} className="flex flex-col items-center text-center p-4  rounded-lg shadow-lg  dark:text-white border-2 border-white  bg-gray-700 transition-transform hover:scale-105">
                <Link href={social.href} className="hover:underline text-white dark:text-white font-bold">
                  {social.name}
                </Link>
                <lord-icon src={social.icon} trigger="hover" style={{ width: "50px", height: "50px" }}></lord-icon>
              </li>
            ))}
          </ul>
        </div>

        {/* Technologies Section */}
        <div className="p-6 rounded-lg w-[100vw] hover:shadow-xl transition-all delay-150 border-2 bg-white dark:bg-gray-800">
          <h1 className="text-3xl font-extrabold text-center bg-gradient-to-r from-pink-500 to-orange-500 text-transparent bg-clip-text">
            Technologies Used
          </h1>
          <div className="grid grid-cols-2  md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {technologies.map((tech, index) => (
              <div
                key={index}
                className="border border-gray-300 p-4 rounded-lg shadow-lg bg-gray-50 dark:bg-gray-700 transition-transform hover:scale-105 hover:shadow-xl"
              >
                <h2 className="font-semibold text-lg text-gray-800 dark:text-white mb-2">{tech.name}</h2>
                <p className="text-gray-600 dark:text-gray-300">{tech.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

// "https://www.instagram.com/negisameer_106?utm_source=qr"
// "https://cdn.lordicon.com/roscsuft.json"
