import {  Roboto } from "next/font/google";
import "@/app/globals.css";
import SideMenu from "@/components/sidemenu/SideMenu";
import Header from "@/components/Header/Header";
import { Toaster } from "react-hot-toast";


const roboto = Roboto({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"], // Use 'weight' instead of 'weights'
});
export const metadata = {
  title: "MIS Department - University of Dhaka",
  description: "The Management Information Systems (MIS) Department at the University of Dhaka focuses on the intersection of technology, business, and management, providing students with the skills and knowledge to excel in the digital age.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={` ${roboto.variable} antialiased bg-gray-100`}
      >
        {/* Header */}
        <Toaster position="top-right" reverseOrder={false} />
        <Header />

        <div className="flex lg:ml-[270px] order-1 h-screen">
          {/* Sidebar */}
         
            <SideMenu />
        

          {/* Main Content */}
          <main className="flex-1 mt-20 md:p-6 overflow-y-auto bg-gray-200 shadow-md">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
