import { NextResponse } from "next/server";
import prisma from "../../../../../prisma";
import { Log } from "@/models/Log";

export async function POST(req: Request, res: NextResponse) {
  try {
    prisma.$connect();
    const reqBody = await req.json();

    const {
      place,
      rating,
      latitude,
      longitude,
      image,
      visitDate,
      expression,
    }: Log = reqBody.form;

    console.log(rating);

    const newLog = await prisma.log.create({
      data: {
        place,
        rating,
        latitude,
        longitude,
        image,
        visitDate,
        expression,
      },
    });

    return NextResponse.json({ log: newLog }, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
