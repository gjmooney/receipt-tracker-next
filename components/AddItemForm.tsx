"use client";

import { cn } from "@/lib/utils";
import { AddItemRequest, AddItemValidator } from "@/lib/validators/addItem";
import { zodResolver } from "@hookform/resolvers/zod";
import { SelectContent } from "@radix-ui/react-select";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Checkbox } from "./ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Select, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface AddItemFormProps {}

const AddItemForm: FC<AddItemFormProps> = ({}) => {
  const productType = ["WEIGHT", "BUNCH", "PIECE"];

  const weightUnit = ["G", "KG", "ML", "CL", "L"];

  const form = useForm<AddItemRequest>({
    resolver: zodResolver(AddItemValidator),
    defaultValues: {
      type: "",
      subtype: "",
      microtype: "",
      description: "",
      category: "",
      upc: 0,

      // fields for Purchase
      price: 0,
      datePurchased: new Date(),
      onSale: false,
      brand: "",
      quantityType: "WEIGHT",
      weightUnit: "G",
      quantityValue: 0,
      fromStore: "",
    },
  });

  // TODO: change this to use mutation stuff
  const onSubmit = (values: AddItemRequest) => {
    try {
      console.log("values", values);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid w-full grid-cols-12 gap-2 rounded-lg border p-4 px-3  md:px-6"
      >
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="col-span-full">
              <FormLabel>Type</FormLabel>
              <FormControl>
                <Input placeholder="What you get?" {...field} />
              </FormControl>
              <FormDescription>Hummus, milk, etc</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subtype"
          render={({ field }) => (
            <FormItem className="col-span-6">
              <FormLabel>Subtype</FormLabel>
              <FormControl>
                <Input placeholder="Sub what you get?" {...field} />
              </FormControl>
              <FormDescription>Soy, Oat, etc...</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="microtype"
          render={({ field }) => (
            <FormItem className="col-span-6">
              <FormLabel>Microtype</FormLabel>
              <FormControl>
                <Input placeholder="Micro what you get?" {...field} />
              </FormControl>
              <FormDescription>Chocolate, vanilla, etc...</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="col-span-full ">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Describe what you get?" {...field} />
              </FormControl>
              <FormDescription>Wax poetic about your hummus</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem className="col-span-3">
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input placeholder="How much??" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="onSale"
          render={({ field }) => (
            <FormItem className="col-span-3">
              <FormLabel>Sale?</FormLabel>
              <FormControl className="ml-7 ">
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormDescription>You get a good deal?</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="datePurchased"
          render={({ field }) => (
            <FormItem className="col-span-3">
              <FormLabel>Purchase Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>The date you purchased</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="col-span-full"></div>
        <FormField
          control={form.control}
          name="quantityValue"
          render={({ field }) => (
            <FormItem className="col-span-3">
              <FormLabel>How many?</FormLabel>
              <FormControl>
                <Input placeholder="How many did you get?" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="weightUnit"
          render={({ field }) => (
            <FormItem className="col-span-3">
              <FormLabel>Weight</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Enter the quantity purchased" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {weightUnit.map((unit) => (
                    <SelectItem key={unit} value={unit}>
                      {unit}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>Choose your measure</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="quantityType"
          render={({ field }) => (
            <FormItem className="col-span-3">
              <FormLabel>Size Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Enter the quantity category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {productType.map((unit) => (
                    <SelectItem key={unit} value={unit}>
                      {unit}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>Choose your bundle</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default AddItemForm;
