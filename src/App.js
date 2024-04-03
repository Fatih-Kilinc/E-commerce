"use client"
import './App.css';

import { useEffect, useState } from 'react';
import Card from './component/Card/page';
import { useSelector } from 'react-redux';
import Cart from './component/RightCard/page';
import { Col, Row } from 'antd';


function App() {
  const [products,setproducts] = useState([]);
  const getproducts =async()=>{
    const res =await fetch("https://fakestoreapi.com/products");
    const data =await res.json();
    setproducts(data);
  }
  useEffect(()=>{
    getproducts();
   },[])
   const {drawer} = useSelector ((state) => state.drawer);
   console.log(drawer);
   function showDrawer() {
    if (drawer) {
      return 16;
    }else{
      return 24;
    }}
  return (
   
    <Row className="">
<Col span={showDrawer()}>
<Card />
</Col>
<Col span={8}>
   { drawer && <Cart />} 
      
      </Col>
    </Row>
  
  );
}

export default App;
