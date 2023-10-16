import { NextResponse } from "next/server";
import prisma from "../../../../prisma";

export async function GET(req: Request, res: NextResponse) {
  try {
    await prisma.$connect();
    const logs = await prisma.log.findMany({});

    return NextResponse.json({ logs }, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
