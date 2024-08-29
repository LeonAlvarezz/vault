"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select";
type Props = {
  options: SelectOption[];
};
export default function OrderSelect({ options }: Props) {
  return (
    <Select defaultValue="trending">
      <SelectTrigger className="w-full sm:w-[150px]">
        <SelectValue placeholder="Order" />
      </SelectTrigger>
      <SelectContent className="z-[100]">
        {options.map((option, index) => (
          <SelectItem key={index} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
