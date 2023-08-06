"use client";

import { toast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { FC } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

interface AddPurchaseFormProps {}

const AddPurchaseForm: FC<AddPurchaseFormProps> = ({}) => {
  //TODO - use location to differentiate stores in chain and pull from db
  const stores = [
    { label: "Leader Cash", value: "leader cash" },
    { label: "Monoprix", value: "monoprix" },
    { label: "Casino", value: "casino" },
  ];

  //TODO pull from db - populate based on selected store
  const receiptText = [
    { label: "Leader Cash", value: "leader cash" },
    { label: "Monoprix", value: "monoprix" },
    { label: "Casino", value: "casino" },
  ];

  const urls = [{ value: "test1" }, { value: "test2" }];

  //TODO resolver, types, and defaults
  const form = useForm({
    defaultValues: {
      store: "",
      urls: [
        { value: "https://shadcn.com" },
        { value: "http://twitter.com/shadcn" },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "urls",
    control: form.control,
  });

  const { mutate: submitForm, isLoading } = useMutation({
    mutationFn: async (fields: any) => {
      console.log("fields", fields);
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
          name="store"
          render={({ field }) => (
            <FormItem className="col-span-full">
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

        {/**receipt text should come from db */}
        <div className="col-span-full ">
          {fields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`urls.${index}.value`}
              render={({ field }) => (
                <FormItem className="grid grid-cols-12 gap-x-4">
                  <FormLabel
                    className={cn("col-span-full", index !== 0 && "sr-only")}
                  >
                    URLs
                  </FormLabel>
                  <FormDescription
                    className={cn("col-span-full", index !== 0 && "sr-only")}
                  >
                    Add links to your website, blog, or social media profiles.
                  </FormDescription>
                  <FormControl>
                    <Input className="col-span-10" {...field} />
                  </FormControl>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="col-span-2 mt-2"
                    onClick={() => remove(index)}
                  >
                    Delete
                  </Button>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => append({ value: "" })}
          >
            Add another item
          </Button>
        </div>

        <div className="col-span-full"></div>

        <Button type="submit" className="col-span-full mt-6">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default AddPurchaseForm;
