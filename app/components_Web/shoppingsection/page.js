"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import Cart from "../cart/page";
import Buy_Now from "../buynow/page"; ; 

const Shopping_sec = () => {
  const [Api, setApi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState("light"); // Default theme is light
  const [view_product, setview_product] = useState(null);
  const [Add_Cart, setAdd_Cart] = useState([]);
  const [Cart_Products, setCart_Products] = useState(null);
  const [buy , setbuy] = useState(false)
  useEffect(() => {
    // Check for theme preference in localStorage
    const storedTheme = localStorage.getItem("theme") || "light";
    setTheme(storedTheme);

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://fakestoreapi.com/products", {
          method: "GET",
        });

        if (response.ok) {
          const mainData = await response.json();
          setApi(mainData);
        } else {
          console.error("Failed to fetch products");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const show_product = (product) => {
    setview_product(product);
  };

  const buy_product = ()=>{
    setbuy(!buy)
  }
  const handle_product = () => setview_product(null);
  const HandleItems = () => {
    if (view_product) {
      const isProduct_inCart = Add_Cart.some(
        (item) => item.id === view_product.id
      );
      if (!isProduct_inCart) {
        setAdd_Cart((prec_cart) => [...prec_cart, view_product]);
      } else {
        alert("This item is already in cart");
      }
      handle_product(); // Close the product modal after adding the product to the cart
    }
  };
  
  const OpenCart = () => {
    setCart_Products((precState) => !precState)
  };
  return (
    <section className="z-10 my-4 mx-2 w-full">
      
      {/* card sec */}
      <Button
        onClick={OpenCart}
        className="absolute   w-fit border-2 border-zinc-200 dark:border-zinc-700  left-[83vw] md:left-[93vw] top-5"
      >
        <ShoppingCart width={30} height={30} />
      </Button>
      {
        Cart_Products ? (
          <div>
            <Cart  Add_Cart={Add_Cart} setAdd_Cart={setAdd_Cart} buy={buy} setbuy={setbuy}/>
          </div>
        ):(
          <div></div>
        )
      }
      <p className="w-full text-center text-sm font-bold">
        <small>Top Products</small>
      </p>
      <h1 className="w-full text-center font-bold text-lg md:text-2xl">
        New Arrivals
      </h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 my-5 w-full md:grid-cols-3">
          {/* Rendering products */}
          {Api.map((ele, index) => (
            <div
              key={index}
              className={`border rounded-md shadow-lg p-4 flex flex-col items-center justify-between ${
                theme === "dark"
                  ? "bg-gray-800 text-white"
                  : "bg-white text-black"
              }`}
            >
              <div className="flex items-center justify-center">
                <Image
                  alt={`Product: ${ele.title}`}
                  width={128}
                  height={128}
                  src={ele.image}
                  priority ={true}
                  className={`${theme === "dark" ? "invert" : ""}`} // Invert for dark mode
                />
              </div>
              <span className="text-center mt-2 font-semibold">
                {ele.title}
              </span>
              <div className="w-full flex items-center justify-between mt-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="capitalize">{ele.category}</span>
                <span className="text-green-400 font-bold">${ele.price.toFixed(2)}</span>
              </div>
              <Button
                onClick={() => show_product(ele)}
                className="my-2 mt-2 bg-green-400 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 dark:focus:ring-offset-gray-900"
              >
                View Product
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Modal for Viewing Selected Product */}
      {view_product && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handle_product} // Close modal when clicking outside
        >
          <div
            className={`bg-white dark:bg-gray-800 text-black dark:text-white p-6 rounded-lg shadow-lg max-w-md w-full`}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <div className="flex items-center justify-center">
              <Image
                alt={`Product: ${view_product.title}`}
                width={256}
                height={256}
                src={view_product.image}
                className={`${theme === "dark" ? "invert" : ""}`}
              />
            </div>
            <h2 className="text2  text-center mt-4 text-lg font-bold">
              {view_product.title}
            </h2>
            <div className="flex justify-evenly md:justify-around">
              <p className="mt-2 text-gray-600 dark:text-gray-300 font-bold">
                Category: {view_product.category}
              </p>
              <p className="mt-2 text-lg font-semibold">
                <small> ${view_product.price.toFixed(2)} </small>
              </p>
            </div>
            <p className="mt-4 text-sm text-center">
              {view_product.description}
            </p>
            <Button
              onClick={handle_product}
              className="mt-4 bg-red-500 hover:bg-red-600 text-white w-full"
            >
              Close
            </Button>
            <div className="w-full flex  justify-around mt-2">
              <Button
                className="font-bold  bg-green-500"
                onClick={() => HandleItems()}
              >
                Add to Cart
              </Button>
              <Button className="bg-green-400 font-bold " onClick={buy_product}>Buy Now</Button>
            </div>
        </div>
          
          {
              buy ? (
                <Buy_Now buy={buy} setbuy={setbuy}/>
              ) : (
                <div>
                  
                </div>
              )
            }
          
          </div>
      )}
      
    </section>
  );
};

export default Shopping_sec;
