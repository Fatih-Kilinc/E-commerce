import React from "react";
import StorePage from "./index";
import axios from "axios";

export const getData = async () => {
  try {
    const data = await axios.get("https://fakestoreapi.com/products");
    return data?.data;
  } catch (error) {}

  return null;
};

const ProductList = async ({ params }) => {
  const data = await getData();

  return (
    <div>
      <StorePage data={data} />
    </div>
  );
};

export default ProductList;
