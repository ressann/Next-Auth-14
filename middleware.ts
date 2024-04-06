import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(function middleware(req) {
  const { pathname } = req.nextUrl;
  const { token } = req.nextauth;
  console.log(token);
  if (
    !token &&
    ["/CreateUser", "/ClientMember", "/Member"].some((path) =>
      pathname.startsWith(path)
    )
  ) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }
  if (pathname.startsWith("/CreateUser") && token?.role !== "admin") {
    return NextResponse.rewrite(new URL("/Denied", req.url));
  }
  if (
    (pathname.startsWith("/ClientMember") || pathname.startsWith("/Member")) &&
    token?.role !== "admin"
  ) {
    return NextResponse.rewrite(new URL("/Denied", req.url));
  }
});

export const config = { matcher: ["/CreateUser", "/ClientMember", "/Member"] };
