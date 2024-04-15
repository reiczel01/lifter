import Image from "next/image";
import {Button} from '@nextui-org/button';
import LogIn from "@/components/LogIn";

export default function Home() {
  return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="w-1/3">
          <LogIn  />
        </div>
      </main>
  );
}
