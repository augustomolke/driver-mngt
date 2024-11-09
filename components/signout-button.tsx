"use client";
import { ExitIcon } from "@radix-ui/react-icons";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { useState } from "react";
import { Tooltip } from "./ui/tooltip";

export default function SignOutButton({ text, size = "icon" }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Tooltip content="Sign out">
      <Button
        onClick={handleSignOut}
        variant="outliner"
        size={size}
        disabled={isLoading}
        aria-label="Sign out"
      >
        {text && <span className="text-xl mr-2">{text}</span>}
        <ExitIcon className="h-4 w-4" />
      </Button>
    </Tooltip>
  );
}
