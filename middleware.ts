import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json({ code: 401, message: "未登录" });
  }
}
export const config = {
  matcher: ["/api/user"],
};
