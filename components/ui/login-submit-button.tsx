"use client";
import { Button } from "./button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useFormStatus } from "react-dom";

export default ({ disabled }) => {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending || disabled} type="submit">
      {pending ? (
        <ReloadIcon className="mx-4 h-4 w-4 animate-spin" />
      ) : (
        "Entrar"
      )}
    </Button>
  );
};
