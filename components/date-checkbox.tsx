import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface DateCheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  text: string;
  icon?: LucideIcon;
}

const DateCheckbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  DateCheckboxProps
>(({ className, text, icon: Icon, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer relative h-full w-full rounded-2xl border-2 border-primary shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary focus-visible:ring-opacity-50 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300",
      "data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      "hover:shadow-lg hover:scale-105",
      className
    )}
    {...props}
  >
    <motion.div
      className="flex flex-col items-center justify-center h-full"
      whileTap={{ scale: 0.95 }}
    >
      {Icon && <Icon className="h-10 w-10 mb-2" />}
      <span className="text-lg font-semibold">{text}</span>
      <CheckboxPrimitive.Indicator
        className={cn(
          "absolute top-2 right-2 flex items-center justify-center text-white"
        )}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <Check className="h-6 w-6" />
        </motion.div>
      </CheckboxPrimitive.Indicator>
    </motion.div>
  </CheckboxPrimitive.Root>
));
DateCheckbox.displayName = CheckboxPrimitive.Root.displayName;

export default DateCheckbox;
