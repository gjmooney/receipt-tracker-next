"use client";

import { toast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { FC } from "react";
import { useForm } from "react-hook-form";
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

  //TODO resolver, types, and defaults
  const form = useForm({});

  const { mutate: submitForm, isLoading } = useMutation({
    mutationFn: async (fields: any) => {
      const payload: any = fields;

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

        {/**receipt text should come from db */}
        <FormField
          control={form.control}
          name="receiptText"
          render={({ field }) => (
            <FormItem className="col-span-4">
              <FormLabel>Receipt Text</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      className="text-slate-600"
                      placeholder="Text on the receipt"
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {receiptText.map((text) => (
                    <SelectItem key={text.value} value={text.value}>
                      {text.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Item as it appears on the receipt
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

export default AddPurchaseForm;
