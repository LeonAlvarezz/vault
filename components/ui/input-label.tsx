import React from "react";
import { Label } from "./label";
import { Input } from "./input";
import { Textarea } from "./textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { IconType } from "react-icons/lib";
type Props = {
  label: string;
  placeholder?: string;
};
type SelectWithLabelProps = {
  label: string;
  defaultValue?: string;
  placeholder?: string;
  options: SelectOption[];
};
export function InputWithLabel({ label, placeholder }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <Label>{label}</Label>
      <Input variant={"outline"} placeholder={placeholder} />
    </div>
  );
}

type IconInputWithLabelProps = {
  label: string;
  placeholder?: string;
  icon: React.ReactNode;
};

export function IconInputWithLabel({
  label,
  placeholder,
  icon,
}: IconInputWithLabelProps) {
  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex gap-2 items-center">
        {icon}
        <Label>{label}</Label>
      </div>
      <Input variant={"outline"} placeholder={placeholder} />
    </div>
  );
}

export function TextAreaWithLabel({ label, placeholder }: Props) {
  return (
    <div className="flex flex-col gap-3 h-full">
      <Label>{label}</Label>
      <Textarea
        placeholder={placeholder}
        variant={"outline"}
        className="h-full"
      />
    </div>
  );
}

export function SelectWithLabel({
  label,
  options,
  defaultValue,
  placeholder,
}: SelectWithLabelProps) {
  return (
    <div className="flex flex-col gap-3">
      <Label>{label}</Label>

      <Select defaultValue={defaultValue}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option, index) => (
            <SelectItem key={index} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
