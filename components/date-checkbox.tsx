import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Toggle } from "@/components/ui/toggle";

export default ({ text, checked, onCheckedChange, id }) => {
  return (
    <div className="">
      <Toggle
        size="lg"
        id={id}
        pressed={checked}
        onPressedChange={onCheckedChange}
        variant="outline"
        aria-label={text}
      >
        {text}
      </Toggle>
      {/* <Checkbox id={id} checked={checked} onCheckedChange={onCheckedChange} />
      <Label
        for={id}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-500"
      >
        {text}
      </Label> */}
    </div>
  );
};
