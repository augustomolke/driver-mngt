"use client";
import { ExitIcon } from "@radix-ui/react-icons";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

export default () => (
  <Button onClick={signOut} variant="outliner">
    <ExitIcon />
  </Button>
);
