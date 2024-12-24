import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getKey, delKey } from "@/utils/redis";
var bcrypt = require("bcryptjs");
import { randomUUID } from "crypto";

const prisma = new PrismaClient();

export const POST = async (req: NextRequest) => {
  const { email, otp, password } = await req.json();
  const code = await getKey(email);
  if (code !== otp) {
    return NextResponse.json({ code: 401, message: "验证码错误" });
  }
  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: bcrypt.hashSync(password, 10),
        nickname: "用户_" + randomUUID().slice(0, 8),
      },
    });
    await delKey(email);
    return NextResponse.json({ code: 200, message: "注册成功", data: user });
  } catch (error) {
    console.error(error, 22233);
    return NextResponse.json({ code: 500, message: "注册失败" });
  }
};
