"use client";

import * as React from "react";
import { Check, ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Tag from "../tag";
type Options = {
  value: string;
  label: string;
  color: string;
};

type ComboboxProps = {
  options: Options[];
  label?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  icon?: boolean;
  color?: string[];
};

const sizeClasses = {
  sm: "w-[150px]",
  md: "w-[200px]",
  lg: "w-[400px]",
};

export function CategoryCombobox({
  size = "md",
  options,
  className,
  label = "Select option...",
  icon = true,
  color,
  value,
  onChange, // Add this
}: ComboboxProps & { value: string; onChange: (value: string) => void }) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            `${sizeClasses[size]} justify-between rounded-sm font-normal`,
            className
          )}
        >
          {value ? (
            <Tag
              key={value}
              color={options.find((option) => option.value === value)?.color}
            >
              {options.find((option) => option.value == value)?.label}
            </Tag>
          ) : (
            <p className="text-neutral-500 px-1">{label}</p>
          )}
          {icon && <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />}
        </Button>
      </PopoverTrigger>
      <PopoverContent className={`${sizeClasses[size]} p-0`}>
        <Command
          filter={(value, search) => {
            if (value.toLowerCase().includes(search.toLowerCase())) return 1;
            return 0;
          }}
        >
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>No option found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={`${option.value} ${option.label}`}
                  onSelect={(currentValue) => {
                    const selectedValue = currentValue.split(" ")[0];
                    onChange(selectedValue); // Call the onChange handler
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
