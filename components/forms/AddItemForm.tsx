"use client";

import { toast } from "@/hooks/use-toast";
import { AddItemRequest, AddItemValidator } from "@/lib/validators/addItem";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
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
import FormComboBox from "./FormComboBox";

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
      isProduce: false,
    },
  });

  const { mutate: submitForm, isLoading } = useMutation({
    mutationFn: async (fields: AddItemRequest) => {
      const payload: AddItemRequest = fields;

      if (form.getValues("isProduce")) {
        const { data } = await axios.post(`/api/add-produce`, payload);
        return data;
      } else {
        const { data } = await axios.post(`/api/add-item`, payload);
        return data;
      }
    },
    onError: (error: any) => {
      //TODO use error codes for better handling
      if (error instanceof AxiosError) {
        if (error.response?.status === 400) {
          toast({
            description: "UPC is required",
            variant: "destructive",
          });
        } else if (error.response?.status === 409) {
          toast({
            description: "Product already exists",
            variant: "destructive",
          });
        }
      } else {
        toast({
          description: "Something went wrong",
          variant: "destructive",
        });
      }
    },
    onSuccess: () => {
      toast({
        description: "Your item has been added!",
      });
    },
  });

  //TODO: hide product fields behind produce check
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
            <FormComboBox
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
            <FormComboBox
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
            <FormComboBox
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
            <FormItem className="col-span-6 ">
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
          name="weight"
          render={({ field }) => (
            <FormItem className="col-span-6 ">
              <FormLabel>Weight</FormLabel>
              <FormControl>
                <Input placeholder="the weight?" {...field} />
              </FormControl>
              <FormDescription>how much you get</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="brand"
          render={({ field }) => (
            <FormComboBox
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
            <FormComboBox
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
          name="isProduce"
          render={({ field }) => (
            <FormItem className="col-span-3 flex flex-col items-start justify-between">
              <FormLabel className="pt-1">Loose Produce?</FormLabel>
              <FormControl className="ml-7 ">
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>

              <FormDescription>Is this loose produce?</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="upc"
          render={({ field }) => (
            <FormItem className="col-span-9">
              <FormLabel>UPC Number</FormLabel>
              <FormControl>
                <Input
                  disabled={form.getValues("isProduce")}
                  placeholder="UPC number?"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                13 digit number from the barcode (Not required for produce)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="col-span-full mt-6">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default AddItemForm;
