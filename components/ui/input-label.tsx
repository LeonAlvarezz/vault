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
  value?: string;
  showCount?: boolean;
  maxLength?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors?: ZodErrorFormatted | null;
};
type SelectWithLabelProps = {
  label: string;
  defaultValue?: string;
  placeholder?: string;
  name?: string;
  options: SelectOption[];
};
export function InputWithLabel({
  label,
  name,
  type = "text",
  placeholder,
  onChange,
  value,
  errors,
}: Props) {
  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor={name}>{label}</Label>
      <Input
        type={type}
        name={name}
        variant={"outline"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {errors && (
        <p className="text-red-400 text-xs">
          {errors._errors.map((error, index) => (
            <span key={index}>
              {error}
              <br />
            </span>
          ))}
        </p>
      )}
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
type ZodErrorFormatted = {
  _errors: string[];
};

type IconInputWithLabelProps = {
  label: string;
  placeholder?: string;
  name?: string;
  icon: React.ReactNode;
  errors?: ZodErrorFormatted;
};

export function IconInputWithLabel({
  label,
  name,
  placeholder,
  icon,
  errors,
}: IconInputWithLabelProps) {
  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex gap-2 items-center">
        {icon}
        <Label>{label}</Label>
      </div>
      <Input name={name} variant={"outline"} placeholder={placeholder} />
      {errors && (
        <p className="text-red-400 text-xs">
          {errors._errors.map((error, index) => (
            <span key={index}>
              {error}
              <br />
            </span>
          ))}
        </p>
      )}
    </div>
  );
}

export function TextAreaWithLabel({
  label,
  placeholder,
  showCount = false,
  maxLength = 100,
}: Props) {
  const [text, setText] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    if (newText.length <= maxLength) {
      setText(newText);
    }
  };
  return (
    <div className="flex flex-col gap-3 h-full relative">
      <Label>{label}</Label>
      <Textarea
        value={text}
        onChange={handleChange}
        placeholder={placeholder}
        variant={"outline"}
        className="h-full"
      />
      {showCount && (
        <p className="absolute bottom-1 right-5 text-[12px] text-neutral-500">
          {text.length}/{maxLength}
        </p>
      )}
    </div>
  );
}

export function SelectWithLabel({
  label,
  options,
  defaultValue,
  placeholder,
  name,
}: SelectWithLabelProps) {
  return (
    <div className="flex flex-col gap-3">
      <Label>{label}</Label>

      <Select defaultValue={defaultValue} name={name}>
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
