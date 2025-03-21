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
>(({ className, text, icon: Icon, ...props }, ref) => {
  return (
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(
        "peer relative flex h-full w-full flex-col items-center justify-center rounded-2xl border-2 border-primary p-4 text-center shadow-md transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary focus-visible:ring-opacity-50 disabled:cursor-not-allowed disabled:opacity-50 hover:scale-105 hover:shadow-lg",
        "data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
        className
      )}
      {...props}
    >
      <motion.div whileTap={{ scale: 0.95 }} className="flex flex-col items-center">
        {Icon && <Icon className="mb-2 h-8 w-8" aria-hidden="true" />}
        <span className="text-lg font-semibold">{text}</span>
      </motion.div>
      <CheckboxPrimitive.Indicator
        className="absolute right-2 top-2 flex items-center justify-center text-white"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <Check className="h-6 w-6" aria-hidden="true" />
        </motion.div>
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
});

DateCheckbox.displayName = "DateCheckbox";

export default DateCheckbox;
