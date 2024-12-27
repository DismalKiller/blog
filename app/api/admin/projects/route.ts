import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { title, description, image, url, githubUrl } = body;
  const project = await prisma.project.create({
    data: {
      title,
      description,
      image,
      url,
      githubUrl,
    },
  });
  return NextResponse.json({ code: 200, message: "success" });
}
