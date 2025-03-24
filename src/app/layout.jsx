import React from "react";
import Footer from "../components/footer/page";
import Providers from "../providers/Providers";
import "./globals.css";
import Navbar from "../components/navbar/NavBar";
import ShopppingCart from "../components/sidebar/SideBar";
export const metadata = {
  title: "E-commerce",
  description:
    "E-commerce is a simple e-commerce website built with Next.js and Redux Toolkit",
};
export default async function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Providers >
          <ShopppingCart />
          <Navb   ar />
          <div className="relative">
          {children}
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
