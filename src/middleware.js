import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const authToken = request.cookies.get("token");
  console.log("middleware triggered");
  const isLoginPage = request.nextUrl.pathname === "/login";

  if (isLoginPage && authToken) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  const isProtectedPage = request.nextUrl.pathname.startsWith("/dashboard");

  if (isProtectedPage && !authToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
