import { ExitIcon } from "@radix-ui/react-icons";
import { redirect } from "next/navigation";
import Link from "next/link";

export default function SignOutButton({ text, size = "icon" }) {
  return (
    <Link href={"/logout"} variant="outliner" size={size} aria-label="Sign out">
      {text && <span className="text-xl mr-2">{text}</span>}
      <ExitIcon className="h-4 w-4" />
    </Link>
  );
}
