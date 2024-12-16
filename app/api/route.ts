import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GET = async () => {
    const user = await prisma.user.findMany();
    return NextResponse.json({ code: 200, message: "获取用户列表成功", data: user });
};
export const POST = async (req: NextRequest) => {
    const { email, password, nickname } = await req.json();
    const user = await prisma.user.create({ data: { email, password, nickname } });
    return NextResponse.json({ code: 200, message: "创建用户成功", data: user });
};
