"use client";

import { cn } from "@/lib/utils";
import { AddItemRequest, AddItemValidator } from "@/lib/validators/addItem";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { FC } from "react";
import { useForm } from "react-hook-form";
import AddItemFormField from "./AddItemFormField";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface AddItemFormProps {}

const AddItemForm: FC<AddItemFormProps> = ({}) => {
  const productType = ["WEIGHT", "BUNCH", "PIECE"];

  const weightUnit = ["G", "KG", "ML", "CL", "L"];

  //TODO: all current array values will come from db
  //TODO these are just for figuring it out
  const types = [
    { label: "Hummus", value: "hummms" },
    { label: "Milk", value: "milk" },
    { label: "Cashews", value: "cashews" },
  ];

  const subTypes = [
    { label: "Oat", value: "oat" },
    { label: "Soy", value: "soy" },
  ];

  const microTypes = [
    { label: "Chocolate", value: "chocolate" },
    { label: "Vanilla", value: "vanilla" },
  ];

  const stores = [
    { label: "Monoprix", value: "monoprix" },
    { label: "Leader Cash", value: "leader cash" },
    { label: "Carrefour", value: "carrefour" },
  ];

  const brands = [
    { label: "Leader Price", value: "leader price" },
    { label: "Eden", value: "eden" },
    { label: "Monoprix", value: "monoprix" },
  ];

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

  const onValueChange = (name: keyof AddItemRequest, v: string) =>
    form.setValue(name, v);

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
            <AddItemFormField
              name={field.name}
              value={field.value}
              label="Subtype"
              data={subTypes}
              description="Sub what you get? "
            />
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
            <FormItem className="col-span-4">
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
            <FormItem className="col-span-4">
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
            <FormItem className="col-span-4">
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
            <FormItem className="col-span-4">
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
            <FormItem className="col-span-4">
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
            <FormItem className="col-span-4">
              <FormLabel>Size Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Enter the quantity category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="border">
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
        <div className="col-span-full"></div>

        <FormField
          control={form.control}
          name="fromStore"
          render={({ field }) => (
            <AddItemFormField
              name={field.name}
              value={field.value}
              label="Store"
              description="Store you bought from"
              data={stores}
            />
          )}
        />

        <FormField
          control={form.control}
          name="brand"
          render={({ field }) => (
            <AddItemFormField
              name={field.name}
              value={field.value}
              label="Brand"
              description="Select the brand"
              data={brands}
            />
          )}
        />

        <div className="col-span-full"></div>

        <Button type="submit" className="">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default AddItemForm;
