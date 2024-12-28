import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    if (req.nextUrl.pathname.startsWith("/api/admin")) {
      return new NextResponse(JSON.stringify({ message: "未登录" }), {
        status: 401,
        headers: { "content-type": "application/json" },
      });
    }

    if (req.nextUrl.pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/home", req.url));
    }
  }

  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);
      if (payload.id !== 1) {
        return NextResponse.redirect(new URL("/home", req.url));
      }
    } catch (error) {
      return NextResponse.redirect(new URL("/home", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
