import React from "react";
import Footer from "../components/Footer/page";
import Providers from "../providers/Providers";
import "./globals.css";
import Navbar from "../components/NavBar/NavBar";
import ShopppingCart from "../components/SideBar/SideBar";
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
          <Navbar />
          <div className="relative">
          {children}
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
