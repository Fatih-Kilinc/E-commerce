"use client";
import React from "react";
import GeneralContextProvider from "../context/GeneralContext";
const Providers = ({ children }) => {
  return <GeneralContextProvider>
    <div className="relative">
    {children}
    </div>
    </GeneralContextProvider>;
};

export default Providers;
