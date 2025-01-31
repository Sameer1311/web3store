"use client";
import { useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Cart = ({ Add_Cart = [], setAdd_Cart, theme = "light" }) => {
  const router = useRouter();

  useEffect(() => {
    if (Add_Cart) {
      localStorage.setItem("cartitems", JSON.stringify(Add_Cart));
    }
  }, [Add_Cart]);

  const removeFrom_cart = (index) => {
    if (!Add_Cart) return;
    const Updated = Add_Cart.filter((_, i) => i !== index);
    setAdd_Cart(Updated);
  };

  const thankspage = () => {
    alert("Thanks for visiting my page");
    router.replace("/");
  };

  return (
    <section className="fixed inset-0 flex items-center justify-center z-40 bg-black bg-opacity-50">
      <div
        className={`w-11/12 md:w-3/5 lg:w-2/5 max-h-[80vh] overflow-y-auto rounded-lg shadow-lg p-6 ${
          theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
        }`}
      >
        <h2 className="text-center font-bold text-2xl mb-6">Your Cart</h2>
        {Add_Cart?.length === 0 ? (
          <div className="text-center space-y-4">
            <p className="font-bold text-gray-500">Your cart is empty.</p>
            <Button
              className={`rounded ${
                theme === "dark"
                  ? "bg-blue-500 hover:bg-blue-600 text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
              onClick={() => (window.location.href = "/components_Web/shopping")}
            >
              Start Shopping
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {Add_Cart?.map((ele, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b pb-4 last:border-b-0"
              >
                <div className="flex items-center space-x-4">
                  <Image
                    src={ele?.image || "/default-image.jpg"} // Provide a fallback image
                    alt={`Product image of ${ele?.title || "Unknown Product"}`}
                    width={80}
                    height={80}
                    className="rounded-md"
                  />
                  <div className="max-w-[60%]">
                    <span className="font-medium block truncate">
                      {ele?.title || "No title"}
                    </span>
                    <span className="text-sm text-gray-500">
                      ${ele?.price ? ele.price.toFixed(2) : "0.00"}
                    </span>
                  </div>
                </div>
                <button
                  className={`px-4 py-2 text-sm rounded ${
                    theme === "dark"
                      ? "bg-red-500 hover:bg-red-600 text-white"
                      : "bg-red-600 hover:bg-red-700 text-white"
                  }`}
                  onClick={() => removeFrom_cart(index)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between mt-6">
          <Button
            className="px-6 py-2 rounded bg-green-500 hover:bg-green-600 text-white"
            onClick={thankspage}
          >
            Buy Now
          </Button>
          <Button
            className={`px-6 py-2 rounded ${
              theme === "dark"
                ? "bg-white text-black hover:bg-gray-200"
                : "bg-black text-white hover:bg-gray-800"
            }`}
            onClick={() => (window.location.href = "/components_Web/shopping")}
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Cart;
