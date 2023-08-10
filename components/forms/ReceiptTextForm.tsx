"use client";

import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import {
  AddReceiptTextRequest,
  AddReceiptTextValidator,
} from "@/lib/validators/addReceiptTextVal";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReceiptText, Store } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { FC } from "react";
import { useFieldArray, useForm } from "react-hook-form";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface ReceiptTextFormProps {
  stores: Store[];
  productId: string;
}

type ReceiptTextOptionsType = Pick<ReceiptText, "id" | "text">;

const ReceiptTextForm: FC<ReceiptTextFormProps> = ({ stores, productId }) => {
  const form = useForm({
    resolver: zodResolver(AddReceiptTextValidator),
    defaultValues: {
      receiptTexts: [{ text: "", storeId: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "receiptTexts",
    control: form.control,
  });

  const { mutate: submitForm, isLoading } = useMutation({
    mutationFn: async (fields: AddReceiptTextRequest) => {
      const payload = fields;

      const { data } = await axios.post(
        `/api/add-receipt-text?id=${productId}`,
        payload,
      );

      return data;

      //console.log("payload", payload);
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
    onSuccess: (data) => {
      // if we get a 0 back, it was a duplicate
      if (!data) {
        toast({
          description: "Entry already exists!",
          variant: "destructive",
        });
      } else {
        toast({
          description: `Added ${data} records`,
        });
      }
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((e) => {
          submitForm(e);
        })}
        className="w-full gap-4 rounded-lg border p-4 px-3 md:px-6"
      >
        <div className="col-span-full">
          {fields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`receiptTexts.${index}`}
              render={({ field }) => (
                <FormItem className="grid grid-cols-12 gap-x-4">
                  <FormLabel
                    className={cn("col-span-full", index !== 0 && "sr-only")}
                  >
                    Receipt Text
                  </FormLabel>
                  <FormDescription
                    className={cn("col-span-full", index !== 0 && "sr-only")}
                  >
                    Enter the text as it appears on the receipt and where
                    it&apos;s from
                  </FormDescription>

                  <FormField
                    control={form.control}
                    name={`receiptTexts.${index}.text`}
                    render={({ field }) => (
                      <FormItem className="col-span-7">
                        <FormControl>
                          <Input
                            placeholder="the junk on the receipt"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Text as it appears on the receipt
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`receiptTexts.${index}.storeId`}
                    render={({ field }) => (
                      <FormItem className="col-span-3">
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
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
                              <SelectItem key={store.id} value={store.id}>
                                <p className="capitalize">{store.name}</p>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>From store</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="col-span-2 mt-2"
                    onClick={() => remove(index)}
                  >
                    Delete
                  </Button>
                </FormItem>
              )}
            />
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => append({ text: "", storeId: "" })}
          >
            Add another
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

export default ReceiptTextForm;
