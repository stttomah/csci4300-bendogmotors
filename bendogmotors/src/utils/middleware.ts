import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const authToken = req.cookies.get("authToken");

  // redirect to login if no token found
  if (!authToken) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/authenticated/:path*", "/create-listing/:path*"],
};