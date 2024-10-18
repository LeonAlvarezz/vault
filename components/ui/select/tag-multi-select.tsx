// src/components/multi-select.tsx

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import {
  CheckIcon,
  XCircle,
  ChevronDown,
  XIcon,
  WandSparkles,
  Check,
} from "lucide-react";
import { IoClose } from "react-icons/io5";

import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import Tag from "../tag";
// import { createTags } from "@/data/client/tag";
import { useToast } from "../use-toast";
import { IoIosOptions } from "react-icons/io";
import { SlOptionsVertical } from "react-icons/sl";
import TagEditDropdown from "../dropdown/tag-edit-dropdown";
import { createTags, revalidatePathClient } from "@/app/api/action";
import Spinner from "../spinner";

/**
 * Variants for the multi-select component to handle different styles.
 * Uses class-variance-authority (cva) to define different styles based on "variant" prop.
 */
const multiSelectVariants = cva(
  "m-1 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300",
  {
    variants: {
      variant: {
        default:
          "border-foreground/10 text-foreground bg-card hover:bg-card/80",
        secondary:
          "border-foreground/10 bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        inverted: "inverted",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

/**
 * Props for MultiSelect component
 */
interface MultiSelectProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof multiSelectVariants> {
  /**
   * An array of option objects to be displayed in the multi-select component.
   * Each option object has a label, value, and an optional icon.
   */
  options: {
    /** The text to display for the option. */
    label: string;
    /** The unique value associated with the option. */
    value: string;
    color?: string;
    /** Optional icon component to display alongside the option. */
    icon?: React.ComponentType<{ className?: string }>;
  }[];

  /**
   * Callback function triggered when the selected values change.
   * Receives an array of the new selected values.
   */
  onValueChange: (value: string[]) => void;

  /** The default selected values when the component mounts. */
  defaultValue: string[];

  /**
   * Placeholder text to be displayed when no values are selected.
   * Optional, defaults to "Select options".
   */
  placeholder?: string;

  /**
   * Animation duration in seconds for the visual effects (e.g., bouncing badges).
   * Optional, defaults to 0 (no animation).
   */
  animation?: number;

  /**
   * Maximum number of items to display. Extra selected items will be summarized.
   * Optional, defaults to 3.
   */
  maxCount?: number;

  /**
   * The modality of the popover. When set to true, interaction with outside elements
   * will be disabled and only popover content will be visible to screen readers.
   * Optional, defaults to false.
   */
  modalPopover?: boolean;

  /**
   * If true, renders the multi-select component as a child of another component.
   * Optional, defaults to false.
   */
  asChild?: boolean;

  /**
   * Additional class names to apply custom styles to the multi-select component.
   * Optional, can be used to add custom styles.
   */
  className?: string;

  onTagUpdate?: () => Promise<void>;
}

export const TagMultiSelect = React.forwardRef<
  HTMLButtonElement,
  MultiSelectProps
>(
  (
    {
      options,
      onValueChange,
      variant,
      defaultValue = [],
      placeholder = "Select options",
      animation = 0,
      maxCount = 3,
      modalPopover = false,
      asChild = false,
      className,
      onTagUpdate,
      ...props
    },
    ref
  ) => {
    const [selectedValues, setSelectedValues] =
      React.useState<string[]>(defaultValue);
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
    const [isAnimating, setIsAnimating] = React.useState(false);
    const [empty, setEmpty] = React.useState(false);
    const [inputValue, setInputValue] = React.useState("");
    const { toast } = useToast();
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [tagLoading, setTagLoading] = React.useState(false);

    React.useEffect(() => {
      if (JSON.stringify(selectedValues) !== JSON.stringify(defaultValue)) {
        setSelectedValues(defaultValue);
      }
    }, [defaultValue, selectedValues]);

    const handleInputKeyDown = async (
      event: React.KeyboardEvent<HTMLInputElement>
    ) => {
      if (event.key === "Enter") {
        event.preventDefault();
        setIsPopoverOpen(true);
        setTagLoading(true);

        if (empty || options.length == 0) {
          try {
            const { error } = await createTags({ name: inputValue.trim() });

            if (error) {
              if (error.code === "23505") {
                toast({
                  title: "Error Creating Tag",
                  description: "Cannot create tag with the same name",
                  variant: "destructive",
                });
              } else if (error.code === "23514") {
                toast({
                  title: "Error Creating Tag",
                  description: "Tag name cannot be longer than 20 characters",
                  variant: "destructive",
                });
              } else {
                toast({
                  title: "Error Creating Tag",
                  description: error.message || "An unknown error occurred",
                  variant: "destructive",
                });
              }
            } else {
              toast({
                title: "Tag Created",
                description: "The tag was created successfully",
                variant: "success",
              });
              setInputValue("");
              revalidatePathClient("/create");
              if (onTagUpdate) {
                onTagUpdate();
              }
            }
          } catch (error) {
            toast({
              title: "Error Creating Tag",
              description: "An unexpected error occurred",
              variant: "destructive",
            });
          } finally {
            setTagLoading(false);
          }
        }
      } else if (event.key === "Backspace" && !event.currentTarget.value) {
        const newSelectedValues = [...selectedValues];
        newSelectedValues.pop();
        setSelectedValues(newSelectedValues);
        onValueChange(newSelectedValues);
      }
    };

    const toggleOption = (value: string) => {
      const newSelectedValues = selectedValues.includes(value)
        ? selectedValues.filter((v) => v !== value)
        : [...selectedValues, value];
      setSelectedValues(newSelectedValues);
      onValueChange(newSelectedValues);
    };

    const handleClear = () => {
      setSelectedValues([]);
      onValueChange([]);
    };

    const handleTogglePopover = () => {
      setIsPopoverOpen((prev) => !prev);
    };

    const clearExtraOptions = () => {
      const newSelectedValues = selectedValues.slice(0, maxCount);
      setSelectedValues(newSelectedValues);
      onValueChange(newSelectedValues);
    };

    const toggleAll = () => {
      if (selectedValues.length === options.length) {
        handleClear();
      } else {
        const allValues = options.map((option) => option.value);
        setSelectedValues(allValues);
        onValueChange(allValues);
      }
    };

    const handleInputChange = (search: string) => {
      setInputValue(search);
    };

    return (
      <Popover
        open={isPopoverOpen}
        onOpenChange={setIsPopoverOpen}
        modal={modalPopover}
      >
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            {...props}
            onClick={handleTogglePopover}
            className={cn(
              "flex w-full p-1 rounded-md  min-h-10 h-auto items-center justify-between bg-inherit hover:bg-neutral-700/50",
              className
            )}
          >
            {selectedValues.length > 0 ? (
              <div className="flex justify-between items-center w-full">
                <div className="flex flex-wrap items-center gap-2">
                  {selectedValues.slice(0, maxCount).map((value) => {
                    const option = options.find((o) => o.value === value);
                    const IconComponent = option?.icon;
                    return (
                      <Tag
                        key={value}
                        color={option?.color}
                        // style={{ animationDuration: `${animation}s` }}
                      >
                        {IconComponent && (
                          <IconComponent className="h-4 w-4 mr-2" />
                        )}
                        {option?.label}
                        <IoClose
                          className="ml-2 h-4 w-4 cursor-pointer hover:text-blue-600"
                          onClick={(event) => {
                            event.stopPropagation();
                            toggleOption(value);
                          }}
                        />
                      </Tag>
                    );
                  })}
                  {selectedValues.length > maxCount && (
                    <Badge
                      className={cn(
                        "bg-popover text-foreground border-foreground/1 hover:bg-transparent",
                        isAnimating ? "animate-bounce" : ""
                      )}
                      style={{ animationDuration: `${animation}s` }}
                    >
                      {`+ ${selectedValues.length - maxCount} more`}
                      <IoClose
                        className="ml-2 h-4 w-4 cursor-pointer"
                        onClick={(event) => {
                          event.stopPropagation();
                          clearExtraOptions();
                        }}
                      />
                    </Badge>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between w-full px-1">
                <span className="text-sm text-neutral-500 font-normal">
                  {placeholder}
                </span>
                {/* <ChevronDown className="h-4 cursor-pointer text-muted-foreground mx-2" /> */}
              </div>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-full p-0 relative"
          align="start"
          onEscapeKeyDown={() => setIsPopoverOpen(false)}
        >
          <Command
            filter={(value, search) => {
              const hasMatch = value
                .toLowerCase()
                .includes(search.toLowerCase());
              if (!hasMatch) {
                setEmpty(true);
              } else {
                setEmpty(false);
              }
              return hasMatch ? 1 : 0;
            }}
          >
            {tagLoading && (
              <div className="absolute top-0 left-0 bg-neutral-900/50 w-full h-full z-50 flex justify-center items-center">
                <Spinner size={24} />
              </div>
            )}
            <CommandInput
              placeholder="Search..."
              onKeyDown={handleInputKeyDown}
              onValueChange={handleInputChange}
              value={inputValue}
              ref={inputRef}
            />
            <CommandList>
              <CommandEmpty>
                <p className="text-xs text-neutral-400 pr-4 pl-2">
                  Type and enter to create new tag +
                </p>
              </CommandEmpty>
              <CommandGroup>
                {/* <CommandItem
                  key="all"
                  onSelect={toggleAll}
                  className="cursor-pointer"
                >
                  <div
                    className={cn(
                      "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                      selectedValues.length === options.length
                        ? "bg-primary text-primary-foreground"
                        : "opacity-50 [&_svg]:invisible"
                    )}
                  >
                    <CheckIcon className="h-4 w-4" />
                  </div>
                  <span>(Select All)</span>
                </CommandItem> */}
                {options.map((option) => {
                  const isSelected = selectedValues.includes(option.value);
                  return (
                    <CommandItem
                      key={option.value}
                      value={option.label}
                      onSelect={() => toggleOption(option.value)}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          isSelected ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {/* <p>{option.label}</p> */}
                      <div className="flex justify-between items-center w-full">
                        <Tag
                          // key={value}
                          color={option.color}
                          // style={{ animationDuration: `${animation}s` }}
                        >
                          {option?.label}
                        </Tag>
                        <TagEditDropdown
                          tag={option}
                          onTagUpdate={onTagUpdate}
                          onStartLoading={() => setTagLoading(true)}
                          onFinishLoading={() => setTagLoading(false)}
                        />
                      </div>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
              <CommandGroup>
                <div className="flex justify-center flex-col items-center">
                  {selectedValues.length > 0 && (
                    <>
                      <Separator
                        // orientation=""
                        className="w-full block"
                      />

                      <div className="py-2 flex justify-center items-center">
                        <p className="text-xs text-neutral-400 pr-4 pl-2">
                          Type and enter to create new tag +
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
        {animation > 0 && selectedValues.length > 0 && (
          <WandSparkles
            className={cn(
              "cursor-pointer my-2 text-foreground bg-background w-3 h-3",
              isAnimating ? "" : "text-muted-foreground"
            )}
            onClick={() => setIsAnimating(!isAnimating)}
          />
        )}
      </Popover>
    );
  }
);

TagMultiSelect.displayName = "TagMultiSelect";
