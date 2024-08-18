import * as React from "react";

import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
const textAreaVariant = cva(
  "flex min-h-[80px] w-full rounded-md px-3 py-2 text-sm placeholder:text-neutral-500 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        outline:
          "border border-neutral-700 bg-transparent focus-visible:ring-1 focus-visible:ring-neutral-500 outline-0",
      },
      input_size: {
        default: "h-10 px-4 py-2 ",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      input_size: "default",
    },
  }
);

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textAreaVariant> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, input_size, ...props }, ref) => {
    return (
      <textarea
        className={cn(textAreaVariant({ variant, input_size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
