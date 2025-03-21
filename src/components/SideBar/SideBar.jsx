"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { GeneralContext } from "../../context/GeneralContext";
import { useRouter } from "next/navigation";
import useOutsideAlerter from "../../hooks/useOutsideDetecter";

export default function ShopppingCart() {
  const {
    cartData,
    setCartData,
    cartSummary,
    removeProductFromCart,
    updateProductQuantity,
    openSideBar,
    setOpenSideBar,
  } = React.useContext(GeneralContext);
  const router = useRouter();
  console.log(cartSummary);
  const ref = useRef();
  useOutsideAlerter(ref, openSideBar, () => {
    if (openSideBar) {
      setOpenSideBar("");
    }
  });
  return (
    <div
      ref={ref}
      className={`grow flex-col gap-y-5 overflow-y-auto border-r bg-[#F3F4F5] sm:px-6 px-2 fixed top-0 right-0 z-[999999] h-full md:w-[434px] w-full xl:border-l-2 p-10 text-white 
    transition ease-in-out duration-150 ${
      openSideBar ? "translate-x-0" : "translate-x-full "
    }`}
    >
      <div className="flex py-3 justify-between border-b-2 border-red-700">
        <h2 className="flex text-black text-2xl font-bold xl:order-1 order-2 leading-1 items-end justify-end gap-2">
          {cartSummary?.products?.length > 0 && (
            <div className="">
              <span
                onClick={() => setCartData([])}
                className="text-sm text-red-500 leading-6 font-thin hover:text-black cursor-pointer"
              >
                Clear Cart
              </span>
            </div>
          )}
        </h2>
        <button
          onClick={() => setOpenSideBar("")}
          className="xl:order-2 order-1"
        >
          <svg
            className="w-8 h-8 text-black dark:text-white hover:text-red-700"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18 18 6m0 12L6 6"
            />
          </svg>
        </button>
        <span className="order-3 xl:hidden block"></span>
      </div>
      <nav className="flex flex-1 flex-col">
        <div className="flex flex-col h-full">
          {cartSummary?.products?.length === 0 ? (
            <>
              <div className="flex flex-col justify-center items-center mt-32">
                <Image
                  src={"/Icons/empty-basket.png"}
                  alt=""
                  width={75}
                  height={75}
                  className="md:block hidden mb-2"
                />
                <p className="text-black font-bold">
                  You don’t have any item in your cart.
                </p>
              </div>
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={() => {
                    router.push("/categories");
                    setOpenSideBar("");
                  }}
                  className="inline-flex items-center uppercase justify-center gap-x-2 mt-9 w-1/2 bg-red-700 text-md font-semibold text-white  rounded-2xl  py-3 px-5"
                >
                  <svg
                    className="w-6 h-6 text-white "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 12H5m14 0-4 4m4-4-4-4"
                    />
                  </svg>
                  Go to shop
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto py-6 ">
                <div className="flow-root">
                  <ul role="list" className="-my-6 ">
                    {cartSummary?.products?.map((product, index) => (
                      <li key={index} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <Image
                            src={product?.img}
                            title={product?.name}
                            fill="responsive"
                            className="h-full w-full object-cover object-center border border-red-700 rounded-xl"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex flex-col justify-between text-base font-medium text-gray-900">
                              <h3 className="text-left">
                                {/* <a href={`/product/${slugify(product?.category)}/${slugify(product?.name)}/${product?.product_id}`} className="font-bold cursor-pointer hover:text-gray-600"> */}
                                {product.name}
                                {/* </a> */}
                              </h3>
                              <div className="flex flex-row sm:gap-2 gap-1  items-baseline">
                                <p className="font-bold text-gray-500">
                                  {/* {formatCurrency(product.price, product.currency)} */}
                                  {product.price}
                                </p>
                                <p className="text-red-700 font-bold">
                                  {product.inclTax}
                                </p>
                                <p className="text-sm">incl. Tax</p>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <div className="relative flex items-center max-w-[8rem] border border-gray-500 rounded-3xl">
                              <button
                                type="button"
                                id="decrement-button"
                                data-input-counter-decrement="quantity-input"
                                className="bg-transparent focus:outline-none p-2 rounded-s-lg"
                                onClick={() => {
                                  updateProductQuantity(
                                    product?.product_id,
                                    product.quantity - 1
                                  );
                                }}
                              >
                                <svg
                                  className="w-3 h-3 text-gray-900 "
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 18 2"
                                >
                                  <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M1 1h16"
                                  />
                                </svg>
                              </button>
                              <input
                                type="text"
                                id="quantity-input"
                                data-input-counter
                                data-input-counter-min="1"
                                data-input-counter-max="50"
                                aria-describedby="helper-text-explanation"
                                className="bg-transparent border-none text-center text-gray-900 text-sm p-0  block w-6  "
                                placeholder="50"
                                value={product.quantity}
                                required
                                onChange={(e) => {
                                  updateProductQuantity(
                                    product?.product_id,
                                    e.target.value
                                  );
                                }}
                              />
                              <button
                                type="button"
                                id="increment-button"
                                data-input-counter-increment="quantity-input"
                                className="bg-transparent focus:outline-none p-2 rounded-e-lg"
                                onClick={() => {
                                  updateProductQuantity(
                                    product?.product_id,
                                    product.quantity + 1
                                  );
                                }}
                              >
                                <svg
                                  className="w-3 h-3 text-gray-900 dark:text-white"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 18 18"
                                >
                                  <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 1v16M1 9h16"
                                  />
                                </svg>
                              </button>
                            </div>

                            <div className="flex">
                              <button
                                type="button"
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                onClick={() =>
                                  removeProductFromCart(product?.product_id)
                                }
                              >
                                <svg
                                  className="w-6 h-6 text-gray-500"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-t-2 border-red-700 px-4 pt-3 pb-24 sm:px-6">
                <div className="flex justify-start gap-2 items-baseline text-base font-medium text-gray-900">
                  <p className="font-bold text-black text-xl">Subtotal:</p>
                  <p className="font-bold text-red-700 text-2xl">
                    {cartSummary?.subtotal}
                  </p>
                  <p className="font-bold text-xs">incl. Tax</p>
                </div>
                <p className="mt-0.5 text-xs text-black font-bold text-left">
                  *Shipping and taxes calculated at checkout.
                </p>
                <div className="mt-6">
                  <button
                    type="button"
                    className="inline-flex items-center uppercase justify-center w-full gap-x-2  bg-red-700 text-md font-semibold text-white   rounded-2xl py-3 px-5"
                    onClick={() => {
                      router.push("/checkout");
                      setOpenSideBar("");
                    }}
                  >
                    <svg
                      className="w-6 h-6 text-white "
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 12H5m14 0-4 4m4-4-4-4"
                      />
                    </svg>
                    checkout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}
