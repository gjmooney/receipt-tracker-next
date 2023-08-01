"use client";

import { toast } from "@/hooks/use-toast";
import { AddItemRequest, AddItemValidator } from "@/lib/validators/addItem";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import AddItemFormField from "./AddItemFormField";

interface AddItemFormProps {}

const AddItemForm: FC<AddItemFormProps> = ({}) => {
  //TODO: all current array values will come from db
  // these are just for figuring it out
  const types = [
    { label: "Hummus", value: "hummus" },
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

  const brands = [
    { label: "Leader Price", value: "leader_price" },
    { label: "Eden", value: "eden" },
    { label: "Monoprix", value: "monoprix" },
  ];

  const category = [
    { label: "(Not) Dairy", value: "(not)dairy)" },
    { label: "Fake Meat", value: "fake_meat" },
    { label: "Produce", value: "produce" },
  ];

  const form = useForm<AddItemRequest>({
    resolver: zodResolver(AddItemValidator),
    defaultValues: {
      type: "",
      subtype: "",
      microtype: "",
      description: "",
      category: "",
      brand: "",
      upc: "",
    },
  });

  const { mutate: submitForm, isLoading } = useMutation({
    mutationFn: async (fields: AddItemRequest) => {
      const payload: AddItemRequest = fields;

      const { data } = await axios.post(`/api/add-item`, payload);

      return data;
    },
    onError: (error: any) => {
      //TODO use error codes for better handling
      console.log("onError", error.response?.status);
      if (error instanceof AxiosError) {
        if (error.response?.status === 409) {
          toast({
            description: "Product already exists",
            variant: "destructive",
          });
        } else {
          toast({
            description: "Something went wrong",
            variant: "destructive",
          });
        }
      }
    },
    onSuccess: () => {
      toast({
        description: "Your item has been added!",
      });
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((e) => {
          submitForm(e);
        })}
        className="grid w-full grid-cols-12 gap-2 rounded-lg border p-4 px-3 md:px-6"
      >
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <AddItemFormField
              className="col-span-full"
              name={field.name}
              value={field.value}
              label="The thing you bought"
              data={types}
              description="Hummus, Milk, etc...? "
            />
          )}
        />

        <FormField
          control={form.control}
          name="subtype"
          render={({ field }) => (
            <AddItemFormField
              className="col-span-6"
              name={field.name}
              value={field.value}
              label="Subtype"
              data={subTypes}
              description="Oat, Soy, etc...? (Optional)"
            />
          )}
        />

        <FormField
          control={form.control}
          name="microtype"
          render={({ field }) => (
            <AddItemFormField
              className="col-span-6"
              name={field.name}
              value={field.value}
              label="Microtype"
              data={microTypes}
              description="Vanilla, Chocolate, etc...? (Optional)"
            />
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
              <FormDescription>
                Wax poetic about your hummus (Optional)
              </FormDescription>
              <FormMessage />
            </FormItem>
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
              description="Select the brand (Optional)"
              data={brands}
              className="col-span-6"
            />
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <AddItemFormField
              name={field.name}
              value={field.value}
              label="Category"
              description="Select the category (Optional)"
              data={category}
              className="col-span-6"
            />
          )}
        />

        <FormField
          control={form.control}
          name="upc"
          render={({ field }) => (
            <FormItem className="col-span-full ">
              <FormLabel>UPC Number</FormLabel>
              <FormControl>
                <Input placeholder="UPC number?" {...field} />
              </FormControl>
              <FormDescription>
                13 digit number from the barcode (Optional)
              </FormDescription>
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
