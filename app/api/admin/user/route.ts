import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const jwt = require("jsonwebtoken");
import { cookies } from "next/headers";

const prisma = new PrismaClient();

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await prisma.user.findUnique({ where: { id: decoded.id } });
  if (!user) {
    return NextResponse.json({ code: 401, message: "未查询到用户信息" });
  }
  return NextResponse.json({
    code: 200,
    message: "查询成功",
    data: {
      id: user.id,
      email: user.email,
      avatar: user.avatar,
      nickname: user.nickname,
    },
  });
}
