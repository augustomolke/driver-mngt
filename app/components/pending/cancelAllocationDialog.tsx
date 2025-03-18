"use client";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";
import { FC } from "react";

interface Props {
  action: (id: string) => void;
  id: string;
}

const CancelAllocationDialog: FC<Props> = ({ action, id }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <XCircle className="text-muted-foreground cursor-pointer" />
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Você tem certeza?</DialogTitle>
          <DialogDescription>
            Se você cancelar, poderá escolher outra rota somente se houverem
            vagas.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button variant="outline" onClick={() => action(id)}>
              Cancelar minha rota
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CancelAllocationDialog;
