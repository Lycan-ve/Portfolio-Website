import { Inter } from "next/font/google";
import Image from "next/image";
import Navbar from "./components/navbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Lycan Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="w-screen h-screen bg-gradient-to-b from-black to-zinc-900">
          <div className="h-24">
          <Navbar/>
          </div>
          <div className="h-[calc(100vh-6rem)]">
        {children}
          </div>
        </div>
        </body>
    </html>
  );
}
