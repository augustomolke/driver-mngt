import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

export default ({ text, checked, onCheckedChange, id }) => {
  return (
    <div className="flex items-center space-x-2 ">
      <Checkbox id={id} checked={checked} onCheckedChange={onCheckedChange} />
      <Label
        for={id}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-500"
      >
        {text}
      </Label>
    </div>
  );
};
