import Image from "next/image";
import { SignIn } from "@/components/ui/sign-in";

export default function Home() {
  return (
    <div>
      <main className="flex flex-col items-center justify-centersm:items-start">
        <SignIn />
      </main>
    </div>
  );
}
