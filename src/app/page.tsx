import LogForm from "@/components/LogForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Link href={"/map"}>
        <Button variant={"secondary"} className="fixed z-[999] top-4 right-4">
          Go To Map
        </Button>
      </Link>
      <LogForm />
    </>
  );
}
