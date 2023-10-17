import LogSidebar from "@/components/LogSidebar";
import MapL from "@/components/MapL";
import { Log } from "@/models/Log";

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
  const data: { logs: Log[] } = await getLogs();

  return (
    <div>
      <LogSidebar logs={data.logs} />
      <MapL logs={data.logs} />
    </div>
  );
}
