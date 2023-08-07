"use client";

import { toast } from "@/hooks/use-toast";

import { cn } from "@/lib/utils";
import { AddItemRequest, AddItemValidator } from "@/lib/validators/addItemForm";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import FormComboBox from "./FormComboBox";

interface AddItemFormProps {}

const AddItemForm: FC<AddItemFormProps> = ({}) => {
  //TODO: all current array values will come from db
  // these are just for figuring it out
  const varieties = [
    { label: "Grape", value: "grape)" },
    { label: "Red", value: "red" },
    { label: "Olive", value: "olive" },
    { label: "Graffiti", value: "graffiti" },
  ];

  const types = [
    { label: "Tomato", value: "tomato" },
    { label: "Bell Pepper", value: "bell pepper" },
    { label: "Oil", value: "oil" },
    { label: "Eggplant", value: "eggplant" },
  ];

  const brands = [
    { label: "Leader Price", value: "leader price" },
    { label: "Eden", value: "eden" },
    { label: "Monoprix", value: "monoprix" },
  ];

  const category = [
    { label: "(Not) Dairy", value: "(not)dairy)" },
    { label: "Fake Meat", value: "fake_meat" },
    { label: "Produce", value: "produce" },
  ];

  //TODO - use location to differentiate stores in chain
  const stores = [
    { label: "Leader Cash", value: "leader cash" },
    { label: "Monoprix", value: "monoprix" },
    { label: "Casino", value: "casino" },
  ];

  const weightUnits = [
    { label: "g", value: "G" },
    { label: "Kg", value: "KG" },
    { label: "Ml", value: "ML" },
    { label: "Cl", value: "CL" },
    { label: "l", value: "L" },
  ];

  //TODO reset after submit
  //TODO think i do want a subvariety as well
  const form = useForm<AddItemRequest>({
    resolver: zodResolver(AddItemValidator),
    defaultValues: {
      type: "",
      receiptText: "",
      subtype: "",
      microtype: "",
      description: "",
      category: "",
      brand: "",
      upc: "",
      variety: "",
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

  //TODO: really just need separate form for produce
  // right now doesn't work with no upc not by weight stuff
  // like produce sold by piece
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((e) => {
          submitForm(e);
        })}
        className="grid w-full grid-cols-12 gap-4 rounded-lg border p-4 px-3 md:px-6"
      >
        <FormField
          control={form.control}
          name="variety"
          render={({ field }) => (
            <FormComboBox
              className="col-span-5"
              name={field.name}
              value={field.value}
              label="The variety of the thing you bought"
              data={varieties}
              description="grape(tomato) graffiti (eggplant) "
            />
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormComboBox
              className="col-span-5"
              name={field.name}
              value={field.value}
              label="The type of the thing you bought"
              data={types}
              description="(grape) tomato (graffiti) eggplant "
            />
          )}
        />

        <FormField
          control={form.control}
          name="isProduce"
          render={({ field }) => (
            <FormItem className="col-span-2 flex flex-col items-end justify-between">
              <FormLabel className="pt-1">Sold by weight?</FormLabel>
              <FormControl className="ml-7 ">
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormDescription>Is this item sold by weight?</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="receiptText"
          render={({ field }) => (
            <FormItem className="col-span-8">
              <FormLabel>Receipt Text</FormLabel>
              <FormControl>
                <Input placeholder="Receipt text?" {...field} />
              </FormControl>
              <FormDescription>
                The item as it appears on your receipt
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="store"
          render={({ field }) => (
            <FormItem className="col-span-4">
              <FormLabel>Store</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      className="text-slate-600"
                      placeholder="Select a store"
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {stores.map((store) => (
                    <SelectItem key={store.value} value={store.value}>
                      {store.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>From store</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div
          className={cn(
            form.getValues("isProduce")
              ? "hidden"
              : "col-span-full grid w-full grid-cols-12 gap-4 rounded-lg  ",
          )}
        >
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
            name="weightUnit"
            render={({ field }) => (
              <FormItem className="col-span-6">
                <FormLabel>Weight Unit</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        className="text-slate-600"
                        placeholder="Select a unit of weight"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {weightUnits.map((unit) => (
                      <SelectItem key={unit.value} value={unit.value}>
                        {unit.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>Unit of Weight</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="upc"
            render={({ field }) => (
              <FormItem className="col-span-full">
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
        </div>

        <Button type="submit" className="col-span-full mt-6">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default AddItemForm;
