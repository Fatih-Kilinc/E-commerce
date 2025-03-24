import React from "react";

import "./globals.css";
import ShopppingCart from "@/components/sidebar/SideBar";
import Navbar from "@/components/navbar/NavBar";
import Footer from "@/components/footer/page";
import Providers from "@/providers/Providers";

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
