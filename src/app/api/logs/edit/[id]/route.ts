import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../prisma";
import { Log } from "@/models/Log";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    await prisma.$connect();
    const reqBody = await req.json();
    const {
      place,
      rating,
      latitude,
      longitude,
      image,
      visitDate,
      expression,
    }: Log = reqBody;

    const logId = req.nextUrl.href.split(
      "http://localhost:3000/api/logs/edit/"
    )[1];

    console.log(req.nextUrl.href);

    const foundLog = await prisma.log.findFirst({ where: { id: logId } });

    if (!foundLog) {
      console.log("Log not found");
      return NextResponse.json({ message: "Log not found" });
    }

    const uptLog = await prisma.log.update({
      where: { id: logId },
      data: {
        place: place || foundLog.place,
        rating: rating || foundLog.rating,
        latitude: latitude || foundLog.latitude,
        longitude: longitude || foundLog.longitude,
        image: image || foundLog.image,
        visitDate: visitDate || foundLog.visitDate,
        expression: expression || foundLog.expression,

        // foundLog.place = place || foundLog.place;
        // foundLog.rating = rating || foundLog.rating;
        // foundLog.latitude = latitude || foundLog.latitude;
        // foundLog.longitude = longitude || foundLog.longitude;
        // foundLog.image = image || foundLog.image;
        // foundLog.visitDate = visitDate || foundLog.visitDate;
        // foundLog.expression = expression || foundLog.expression;
      },
    });

    return NextResponse.json({ form: uptLog });
  } catch (error) {
    console.log(error);
  }
}
