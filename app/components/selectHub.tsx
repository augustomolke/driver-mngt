import React from 'react';
import { AlertTitle, Alert, AlertDescription } from "@/components/ui/alert";



interface SelectHubProps {
  title: string;
  description: string;
  icon?: React.ElementType;
}

export default function SelectHub({ title, description,  icon: Icon, }: SelectHubProps) {
  return (
    <div className="text-black">
      <Alert variant={"secondary"} className="space-y-2">
        <AlertTitle className="font-bold flex gap-2 items-center">
            {Icon && <Icon />}
         {title}
        </AlertTitle>
        <AlertDescription>
          {description}
        </AlertDescription>
      </Alert>
    </div>
  );
}
