import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Lycan Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="bg-black h-screen">
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
