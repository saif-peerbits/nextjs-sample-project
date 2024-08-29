// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Middleware to protect routes
export function middleware(request: NextRequest) {
  // List of protected routes
  const protectedRoutes = ["/dashboard"];
  const publicRoutes = ["/"];

  // Get the pathname from the request URL
  const pathname = request.nextUrl.pathname;

  // Get the token from cookies or localStorage
  const token = request.cookies.get("token") || "";

  // Check if the route is protected
  if (protectedRoutes.includes(pathname)) {
    if (!token) {
      // Redirect to login page if no token is present
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Check if the route is public
  if (publicRoutes.includes(pathname)) {
    if (token) {
      // Redirect to dashboard page if  token is present
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  // Allow request to proceed if the route is not protected or token is present
  return NextResponse.next();
}

// Define which paths the middleware should be applied to
export const config = {
  matcher: ["/", "/dashboard"],
};
