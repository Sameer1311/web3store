"use client"
import React from 'react'
import { Button } from '@/components/ui/button';
const Buy_Now = ({buy  , setbuy =()=>{}}) => {

    const handle_buy_Now = ()=>{
        setbuy(!buy)
    }
    return (
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 text-black dark:text-white p-8 rounded-lg shadow-lg max-w-3xl w-full mx-4">
          <h1 className="text-3xl font-bold text-center mb-6">
            Thank You for Visiting Us!
          </h1>
          <p className="text-center text-lg mb-6">
           { "We're thrilled to have you here. Explore our wide range of products and services tailored to meet your needs. Your satisfaction is our top priority!"}
          </p>
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold mb-4">Why Choose Us?</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>High-quality products at affordable prices.</li>
              <li>24/7 customer support to assist you anytime.</li>
              <li>Fast and reliable shipping options.</li>
              <li>Exclusive discounts and offers for loyal customers.</li>
            </ul>
          </div>
          <div className="text-center space-y-3">
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg mr-4">
              Browse Products
            </button>   
            <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg">
              Contact Us
            </button>
          </div>
          <div className = "w-full flex justify-center items-center my-2">
          <Button onClick={handle_buy_Now}>Close</Button>
          </div>
        </div>
      </div>
    );
  };
  
  export default Buy_Now;
  