//import React, { useState, useEffect } from "react";
import Header from "./header";
import { BiSearch } from 'react-icons/bi'

const Order = () => {

    return (
        <>
        <Header /> 
        <div className="flex justify-start mt-11 width-full">
        <button type="submit">
            <BiSearch className="text-white ml-7 text-2xl bg-grey" />
          </button>
        <input
            className="bg-transparent border-x-0 border-t-0 border-b-1  width-full mr-3 px-2 leading-tight focus:outline-none text-white"
            type="text"
            placeholder="Search"
          />
        </div>
        <div className="flex justify-start">
            <p className="mt-5 ml-3">Order #</p>
        </div>
        </>
    )
}

export default Order