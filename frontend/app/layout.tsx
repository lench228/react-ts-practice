import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import NavLinks from "@/components/nav-links";
import { montserrat } from "@/components/ui/fonts";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Movemarket",
  description: "БАмбам",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className + " flex flex-col min-h-screen "}>
        <header>
          <Navbar></Navbar>
          <NavLinks></NavLinks>
        </header>
        {children}
        <Footer></Footer>
      </body>
    </html>
  );
}
