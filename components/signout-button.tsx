"use client";
import { ExitIcon } from "@radix-ui/react-icons";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { useState } from "react";
import { Tooltip } from "./ui/tooltip";

export default function SignOutButton() {
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
        size="icon"
        disabled={isLoading}
        aria-label="Sign out"
      >
        <ExitIcon className="h-4 w-4" />
      </Button>
    </Tooltip>
  );
}
