import LogSidebar from "@/components/LogSidebar";
import MapL from "@/components/MapL";
import { Button } from "@/components/ui/button";
import { Log } from "@/models/Log";
import Link from "next/link";

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

export default async function page() {
  const data: { logs: Log[] } = await getLogs();

  return (
    <div>
      <LogSidebar logs={data.logs} />

      <Link href={"/"}>
        <Button className="fixed z-[998] top-2 right-2">
          Add Destinations You Visited
        </Button>
      </Link>
      <MapL logs={data.logs} />
    </div>
  );
}
