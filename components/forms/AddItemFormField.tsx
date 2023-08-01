import { cn } from "@/lib/utils";
import { AddItemRequest } from "@/lib/validators/addItem";
import { Check, ChevronsUpDown } from "lucide-react";
import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../ui/command";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface AddItemFormFieldProps {
  name: keyof AddItemRequest;
  label: string;
  value?: string;
  description?: string;
  data: {
    label: string;
    value: string;
  }[];
  className: string;
}

const AddItemFormField: FC<AddItemFormFieldProps> = ({
  name,
  label,
  value,
  description,
  data,
  className,
}) => {
  const { setValue } = useFormContext<AddItemRequest>();

  function toTitleCase(str: string) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
    });
  }

  const onSetValue = (value: string) => setValue(name, value);

  return (
    <FormItem className={className}>
      <FormLabel>{label}</FormLabel>
      <Popover>
        <PopoverTrigger asChild>
          <FormControl className="flex flex-col">
            <Button
              variant="outline"
              role="combobox"
              className={cn(
                "w-full flex-row justify-between",
                !value && "text-muted-foreground",
              )}
            >
              {value ? toTitleCase(value) : `Select ${label}`}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput
              onValueChange={(v) => onSetValue(v.toLowerCase())}
              placeholder={`Search ${label}...`}
            />
            <CommandEmpty>{label} not found.</CommandEmpty>
            <CommandGroup>
              {data.map((item) => (
                <CommandItem
                  value={item.label}
                  key={item.value}
                  onSelect={(value) => {
                    onSetValue(value);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      item.value === value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      <FormDescription>{description}</FormDescription>
      <FormMessage />
    </FormItem>
  );
};

export default AddItemFormField;
