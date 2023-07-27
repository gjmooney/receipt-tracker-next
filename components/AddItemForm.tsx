"use client";

import { AddItemRequest, AddItemValidator } from "@/lib/validators/addItem";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
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

interface AddItemFormProps {}

const AddItemForm: FC<AddItemFormProps> = ({}) => {
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
        className="grid w-full grid-cols-12 gap-2 rounded-lg border p-4 px-3 focus-within:shadow-sm md:px-6"
      >
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="col-span-6 lg:col-span-10">
              <FormLabel>Type</FormLabel>
              <FormControl className="m-0 p-0">
                <Input placeholder="What you get?" {...field} />
              </FormControl>
              <FormDescription>This is the thing you bought</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem className="col-span-6 lg:col-span-10">
              <FormLabel>Category</FormLabel>
              <FormControl className="m-0 p-0">
                <Input placeholder="Categorize what you get?" {...field} />
              </FormControl>
              <FormDescription>This is the thing you category</FormDescription>
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
