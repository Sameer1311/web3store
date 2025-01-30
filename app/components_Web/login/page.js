"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {signIn} from 'next-auth/react'


const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [theme, setTheme] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const router = useRouter() ; 
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setTheme(true);
    }
    setIsLoaded(true);
  }, []);

  if (!isLoaded) return null;

  const handleThemes = () => {
    const newTheme = !theme;
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };
  
  const Handleform = async(e)=>{
    e.preventDefault()
    try{
      const res = await signIn("credentials",{
        email , 
        password , 
        redirect : false  ,
      }) ;
      if(res.error){
        alert("User not found")
        return ; 
      }
      router.replace('/')
    }catch(error){
      console.log("error", error)
    }
  }
  return (
    <div
      className={`w-full flex justify-center items-center min-h-screen overflow-hidden transition-colors duration-300 ${
        theme ? "dark bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Theme toggle */}
      <Button
        onClick={handleThemes}
        className="absolute top-5 left-5 p-2 rounded-full shadow-lg transition-all"
      >
        {theme ? <Sun width={30} height={30} /> : <Moon width={30} height={30} />}
      </Button>

      {/* Login form */}
      <div className="flex flex-col bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 w-[90%] max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image
            src="/logo.webp"
            width={80}
            height={80}
            alt="logo of the website"
            className="rounded-full border"
            priority
          />
        </div>

        {/* Form */}
        <form action="" className="space-y-6">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="text-black  w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Email Address"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full text-black p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Password"
          />
          <Button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-3 rounded-md hover:bg-blue-600"
            onClick={Handleform}
            disabled = {!email || !password}
          >
            Login
          </Button>
        </form>

        {/* Forgot Password */}
        <div className="text-center mt-4">
          <a href="#" className="text-blue-500 hover:underline">
            Forgot Password?
          </a>
        </div>

        {/* Create Account Link */}
        <div className="text-center mt-4">
          <Link href="/components_Web/logout">
            <Button className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-2 px-4 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600">
              Create New Account
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
