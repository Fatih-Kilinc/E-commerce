"use client"
import { useDispatch, useSelector } from "react-redux";
import React from 'react';
import { removeFromCart } from "../../features/Cart/cartSlice";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { Button, Col, Row } from "antd";

function Cart() {
    const { cart } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
   
    
    return (
        <div className="w-1/3 fixed border top-0 right-0 z-50 h-full">
            {cart.map((item, i) => (
                <Row gutter={24} key={i} className="w-full">
                    <Col  className="w-full">
                    <h3 className="text-black"></h3>
                    <Button>
                    <IoIosCloseCircleOutline  className="cursor-pointer flex items-center justify-center"/>
                    </Button>
                    <button onClick={() =>  dispatch(removeFromCart(item))}>Remove</button>
                    </Col>
                </Row> 
            ))}
        </div>
    );
}
export default Cart;