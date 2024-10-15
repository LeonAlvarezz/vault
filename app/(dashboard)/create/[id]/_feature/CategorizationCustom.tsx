import { CategoryCombobox } from "@/components/ui/combobox/category-combobox";
import { TagMultiSelect } from "@/components/ui/select/tag-multi-select";
import { ICON_COLOR, ICON_SIZE } from "@/components/ui/sidebar/sidebar";
import React from "react";
import { UseFormSetValue } from "react-hook-form";
import { BiSolidCategory } from "react-icons/bi";
import { FaTags } from "react-icons/fa";
import { CreateNoteFormValues } from "../page";
type Props = {
  categories: SelectOption[];
  selectedCategory: string;
  tags: SelectOption[];
  selectedTags: string[];
  handleGetTags?: () => Promise<void>;
  setValue: UseFormSetValue<CreateNoteFormValues>;
};
export default function CategorizationCustom({
  categories,
  selectedCategory,
  tags,
  selectedTags,
  handleGetTags,
  setValue,
}: Props) {
  return (
    <div className="flex gap-2 flex-col mt-4">
      <div className="flex sm:items-center items-start flex-col sm:flex-row sm:gap-0 gap-2">
        <div className="flex gap-2 w-1/3 ">
          <BiSolidCategory
            size={ICON_SIZE}
            color={ICON_COLOR}
            className="flex-shrink-0"
          />
          <p className="text-sm">Category</p>
        </div>

        <CategoryCombobox
          options={categories}
          label="Click to select category"
          size="md"
          className="w-full border-0 hover:bg-neutral-700/50 px-1"
          icon={false}
          value={selectedCategory}
          onChange={(value) => setValue("category", value)}
        />
      </div>
      <div className="flex sm:items-center items-start flex-col sm:flex-row sm:gap-0 gap-2">
        <div className="flex gap-2 w-1/3">
          <FaTags
            size={ICON_SIZE}
            color={ICON_COLOR}
            className="flex-shrink-0"
          />
          <p className="text-sm">Tag</p>
        </div>
        <TagMultiSelect
          options={tags}
          placeholder="Click to select tags"
          onValueChange={(value) => setValue("tags", value)}
          defaultValue={selectedTags}
          maxCount={3}
          onTagUpdate={handleGetTags}
        />
      </div>
    </div>
  );
}
