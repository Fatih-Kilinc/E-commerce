"use client";
import React, { createContext, useEffect, useState } from "react";

export const GeneralContext = createContext(null);

export default function GeneralContextProvider({ children }) {
  const [openSideBar, setOpenSideBar] = useState(false);
  const [cartData, setCartData] = useState([]);
  const [cartSummary, setCartSummary] = useState({});

  useEffect(() => {
    if (window === undefined) return;
    const data = localStorage.getItem("cartData");
    if (data && data !== "undefined") {
      setCartData(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartData", JSON.stringify(cartData));
    reCalculateCartSummary();
  }, [cartData]);

  const addProductToCart = (product) => {
    const newCartData = { ...cartData };
    if (!newCartData?.products) {
      newCartData.products = [];
    }

    const productIndex = newCartData?.products?.findIndex(
      (item) => item?.product_id === product?.product_id
    );
    if (productIndex === -1) {
      newCartData.products.push(product);
    } else {
      newCartData.products[productIndex].quantity += product.quantity;
    }
    setCartData(newCartData);
    setOpenSideBar(true);
  };

  const reCalculateCartSummary = () => {
    let totalPrice = 0;
    let totalPriceNoDiscount = 0;
    let subTotal = 0;
    let totalQuantity = 0;
    let totalDiscount = 0;
    let totalShipping = 0;
    let totalTax = 0;
    let shippingTax = 0;
    let tax = [];
    let products = [];

    let discountAmountComing = parseFloat(cartData?.discount?.amount) ?? 0;
    cartData?.products?.forEach((item) => {
      let totalItemPrice = parseFloat(item.price) * parseInt(item.quantity);
      totalQuantity += parseInt(item.quantity);

      let subTotalItem = totalItemPrice;
      let taxAmount = 0;
      if (item?.taxRate) {
        let taxRate = parseFloat(item?.taxRate);
        if (taxRate > 0) taxRate = taxRate / 100;
        subTotalItem = totalItemPrice / (taxRate + 1);

        if (
          discountAmountComing > 0 &&
          cartData?.discount?.type === "percentage"
        ) {
          let discountAmount = (totalItemPrice * discountAmountComing) / 100;
          subTotalItem -= discountAmount;
          totalDiscount += discountAmount;
        }

        taxAmount = subTotalItem * taxRate;
        totalTax += taxAmount;

        let taxIndex = tax.findIndex((t) => t.rate === item?.taxRate);
        if (taxIndex === -1) {
          tax.push({
            rate: taxRate,
            amount: taxAmount,
          });
        } else {
          tax[taxIndex].amount += taxAmount;
        }
      }

      item.condition = item?.condition ?? "new";
      products.push(item);

      totalPriceNoDiscount += totalItemPrice;
      totalPrice += subTotalItem + taxAmount;
      subTotal += subTotalItem;
    });

    //other data
    if (cartData?.shipping?.amount) {
      totalShipping = cartData?.shipping?.amount;
      shippingTax = cartData?.shipping?.tax;
    }

    totalPrice += totalShipping;

    setCartSummary({
      subTotal,
      totalPrice,
      totalPriceNoDiscount,
      totalQuantity,
      totalTax,
      shippingTax,
      totalDiscount,
      shipping: cartData?.shipping,
      discount: cartData?.discount,
      products,
    });
  };

  const applyDiscount = (discountAmount, discountType, discountDescription) => {
    setCartData((prev) => ({
      ...prev,
      discount: {
        amount: discountAmount,
        description: discountDescription,
        type: discountType,
      },
    }));
  };

  const applyShipping = (shippingAmount, shippingDescription, tax = null) => {
    setCartData((prev) => ({
      ...prev,
      shipping: {
        amount: shippingAmount,
        tax: tax,
        description: shippingDescription,
      },
    }));
  };

  const removeProductFromCart = (productId) => {
    const newCartData = { ...cartData };
    if (!newCartData?.products) {
      return;
    }
    const productIndex = newCartData.products.findIndex(
      (item) => item?.product_id === productId
    );
    if (productIndex !== -1) {
      newCartData?.products?.splice(productIndex, 1);
    }
    newCartData.shipping = null;
    setCartData(newCartData);
  };

  const updateProductQuantity = (productId, quantity) => {
    if (quantity === 0) {
      removeProductFromCart(productId);
      return;
    }
    if (quantity < 0) {
      return;
    }

    if (quantity > 100) {
      quantity = 100;
    }

    const newCartData = { ...cartData };
    if (!newCartData?.products) {
      return;
    }
    const productIndex = newCartData.products.findIndex(
      (item) => item?.product_id === productId
    );
    if (productIndex !== -1) {
      newCartData.products[productIndex].quantity = quantity;
    }
    newCartData.shipping = null;
    setCartData(newCartData);
  };

  return (
    <GeneralContext.Provider
      value={{
        openSideBar,
        setOpenSideBar,
        cartData,
        setCartData,
        addProductToCart,
        cartSummary,
        removeProductFromCart,
        updateProductQuantity,
        applyDiscount,
        applyShipping,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
}

export const useGeneralContext = () => {
  return React.useContext(GeneralContext);
};
