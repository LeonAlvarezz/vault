"use client";
import React, { useState } from "react";
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
import { Button } from "./button";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Toggle } from "./toggle";
type Props = {
  label: string;
  placeholder?: string;
  type?: string;
  name?: string;
};
type SelectWithLabelProps = {
  label: string;
  defaultValue?: string;
  placeholder?: string;
  options: SelectOption[];
};
export function InputWithLabel({
  label,
  name,
  type = "text",
  placeholder,
}: Props) {
  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor={name}>{label}</Label>
      <Input
        type={type}
        name={name}
        variant={"outline"}
        placeholder={placeholder}
      />
    </div>
  );
}

// export function InputPasswordWithLabel({ label, name, placeholder }: Props) {
//   const [type, setType] = useState("password");

//   const togglePasswordVisibility = () => {
//     setType((prevType) => (prevType === "password" ? "text" : "password"));
//   };

//   return (
//     <div className="flex flex-col gap-3 relative">
//       <Label htmlFor={name}>{label}</Label>
//       <Input
//         type={type}
//         name={name}
//         variant={"outline"}
//         placeholder={placeholder}
//       />
//       <Button
//         onClick={togglePasswordVisibility}
//         variant={"icon"}
//         size={"icon"}
//         className="absolute bottom-0 right-0 hover:bg-neutral-700/50"
//       >
//         {type === "password" ? <FaEye /> : <FaEyeSlash />}
//       </Button>
//     </div>
//   );
// }

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
