import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import NavLinks from "@/components/nav-links";
import { montserrat } from "@/components/ui/fonts";

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
      <body className={montserrat.className}>
        <header>
          <Navbar></Navbar>
          <NavLinks></NavLinks>
        </header>
        <main>
          {children}
        </main>
        <footer>

        </footer>
        </body>
    </html>
  );
}
