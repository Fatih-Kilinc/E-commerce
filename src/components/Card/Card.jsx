"use client";
import React, { useEffect, useState } from "react";
import { formatCurrency, slugify } from "@/utils/helper";
import Link from "next/link";
import RatingPage from "../Rating/Rating";
import LoadingComp from "../common/LoadingComp";

export default function Card({ products }) {
  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (products?.data) {
      setProductData(products?.data);
      setIsLoading(false); // Veri yüklendikten sonra loading state false yapılır
    }
  }, [products]);

  return (
    <>
      {isLoading ? (
        <div className="h-[500px]"><LoadingComp isLoading={true} /></div>
      ) : (
        <div className="bg-white my-5">
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <h2 className="text-xl font-bold text-gray-900">
              {productData?.length} Products
            </h2>
            <div className="relative h-fit grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3">
              {productData?.map((product, idx) => (
                <div key={idx} className="relative ">
                  <Link
                    href={`/product/${product?.id}${
                      product?.category?.[0]?.name
                        ? `/${slugify(product?.category?.[0]?.name)}`
                        : ``
                    }${product?.name ? `/${slugify(product?.name)}` : ""}${
                      product?.ean ? `/${slugify(product?.ean)}` : ""
                    }`}
                    className="group relative flex flex-col overflow-hidden rounded-2xl h-full border border-gray-300 pt-4 px-3"
                  >
                    <img
                      src={product?.image}
                      alt={product?.name}
                      className="object-contain object-center w-full h-[250px] transition duration-500 group-hover:scale-105"
                    />
                    <div className="relative bg-white flex flex-1 flex-col justify-between space-y-2 p-2">
                      <div className="flex flex-col">
                        <RatingPage
                          star={product?.rating?.rate}
                          count={product?.rating?.count}
                        />
                        <h3 className="mt-[1px] text-base font-medium text-gray-900 font-sans line-clamp-3">
                          {product?.title ?? "Product Name"}
                        </h3>
                      </div>

                      <div className="flex justify-start items-center gap-2">
                        {product?.price?.discounted_price ? (
                          <p className="text-lg font-bold text-[#707072] line-through">
                            {formatCurrency(product?.price)}
                          </p>
                        ) : (
                          <p className="text-lg font-bold text-[#696969]">
                            {formatCurrency(product?.price)}
                          </p>
                        )}

                        {product?.price?.discounted_price && (
                          <p className="text-generalOrange text-lg font-bold">
                            {formatCurrency(product?.price?.discounted_price)}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
