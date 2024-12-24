import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import sendMail from "@/utils/mail";
import { setKey } from "@/utils/redis";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

export const POST = async (req: NextRequest) => {
  const { email, password } = await req.json();
  const user = await prisma.user.findFirst({ where: { email } });
  if (!user) {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const html = `
        <p>您的验证码是：<strong>${code}</strong></p>
        <p>请在10分钟内使用此验证码注册</p>
        `;
    sendMail(email, "欢迎注册hyun's blog", html);
    await setKey(email, code, 600);
    return NextResponse.json({ code: 402, message: "邮件已发送，请查收" });
  }
  if (!bcrypt.compareSync(password, user.password)) {
    return NextResponse.json({ code: 401, message: "密码错误" });
  }
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return NextResponse.json({
    code: 200,
    message: "登录成功",
    data: {
      token,
    },
  });
};
