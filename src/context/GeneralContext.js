"use client";
import React, { createContext, useState } from "react";

export const GeneralContext = createContext(null);

export default function GeneralContextProvider({ children }) {
  const [openSideBar, setOpenSideBar] = useState(false)
  const [cartData, setCartData] = useState([])
  // setCartData, cartSummary, removeProductFromCart, updateProductQuantity,
  return (
    <GeneralContext.Provider
      value={{
       openSideBar, setOpenSideBar
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
}

export const useGeneralContext = () => {
  return React.useContext(GeneralContext);
};
