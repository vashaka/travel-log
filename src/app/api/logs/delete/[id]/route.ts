import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../prisma";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    await prisma.$connect();

    const logId = req.nextUrl.href.split(
      "http://localhost:3000/api/logs/delete/"
    )[1];

    await prisma.log.delete({ where: { id: logId } });

    console.log("Log successfully deleted");
    return NextResponse.json({ message: "Log successfully deleted" });
  } catch (error) {}
}
