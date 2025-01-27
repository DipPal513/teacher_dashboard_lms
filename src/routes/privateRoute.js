// components/PrivateRoute.js
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function PrivateRoute(Component) {
  return function ProtectedComponent(props) {
    const router = useRouter();

    useEffect(() => {
      const token = Cookies.get("token"); // Get token from cookies

      if (!token) {
        // Redirect to login page if token is not present
        router.replace("/login");
      }
    }, [router]);

    // Return the component if the user is authenticated
    return <Component {...props} />;
  };
}
