"use client";

import { useEffect, useState } from "react";

import { Col, Row } from "antd";
import Card from "../components/Card/Card";

function App() {
  const [products, setproducts] = useState([]);
  const getproducts = async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    setproducts(data);
  };
  useEffect(() => {
    getproducts();
  }, []);

  return <Card />;
}

export default App;
