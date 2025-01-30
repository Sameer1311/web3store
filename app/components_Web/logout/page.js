"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Logout = () => {
  const [password, setpassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [theme, setTheme] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const isDark = savedTheme === "dark";
    setTheme(isDark);

    // Apply theme to <html>
    document.documentElement.classList.toggle("dark", isDark);
    setIsLoaded(true);
  }, []);

  if (!isLoaded) return null;

  const handleThemes = () => {
    const newTheme = !theme;
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newTheme);
  };

  const handleForm = async (e) => {
    e.preventDefault();
   try{
    const User_info = await fetch("/api/userExist",{
      method : "POST" , 
      headers :{
        "Content-type" : "application/json"
      },
      body : JSON.stringify({email})
    })

    const {User}  =await User_info.json() ; 
    if(User){
      alert("User already Exist")
      return ; 
    }

    const res = await fetch('/api/registeruser',{
      method : "POST" , 
      headers :{
        "Content-Type" : 'application/json'
      } , 
      body : JSON.stringify({email ,  name , password }) ,
    })
    if(res.ok){
      router.push("/components_Web/login") ; 
    }else{
      alert("User alreay exist")
    }
   }catch(error){
    console.log("Failed to sumbit the user details" , error)
   }
  };

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

      {/* Registration form */}
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
        <form onSubmit={handleForm} className="space-y-6">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter username"
            className="w-full p-3 text-black border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Username"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full p-3 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Email Address"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            aria-label="Password"
          />
          <Button
            type="submit"
            className={`w-full py-3 rounded-md font-semibold transition-all ${
              !email || !password || !name
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
            disabled={!email || !password || !name}
          >
            Register
          </Button>
          <Link href='/components_Web/login'>
            <span className="flex text2 mt-3 items-end pointer-events-none">Already have an Account? <p className="cursor-pointer underline text-blue-500 font-bold">Click here</p> </span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Logout;
