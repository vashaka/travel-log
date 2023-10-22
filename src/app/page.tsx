import LogSidebar from "@/components/LogSidebar";
import MapL from "@/components/MapL";
import { Log } from "@/models/Log";
import prisma from "../../prisma";

async function getLogs() {
  try {
    const res = await fetch("http://localhost:3000/api/logs", {
      next: {
        revalidate: 0,
      },
    });
    const data = res.json();

    return data;
  } catch (error) {
    console.log(error);
  }
}

export default async function Home() {
  const data = await prisma.log.findMany({});

  return (
    <div>
      <LogSidebar logs={data} />
      <MapL logs={data} />
    </div>
  );
}
