import {  Roboto } from "next/font/google";
import "./globals.css";


const roboto = Roboto({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"], // Use 'weight' instead of 'weights'
});
export const metadata = {
  title: "Admin dashboard of teachers",
  description: "This is the admin dashboard for teachers, providing various tools and features to manage their classes and students effectively.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={` ${roboto.variable} antialiased bg-gray-100`}
      >
    

        <div className="">
         
        

          {/* Main Content */}
      
            {children}
         
        </div>
      </body>
    </html>
  );
}
