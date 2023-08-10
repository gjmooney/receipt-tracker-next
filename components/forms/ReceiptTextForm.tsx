"use client";

import { ReceiptText, Store } from "@prisma/client";
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
import { fi } from "date-fns/locale";
import { cn } from "@/lib/utils";
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
}

type ReceiptTextOptionsType = Pick<ReceiptText, "id" | "text">;

const ReceiptTextForm: FC<ReceiptTextFormProps> = ({ stores }) => {
  const form = useForm({
    defaultValues: {
      store: "sto",
      receiptTexts: [{ text: "text", store: "store" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "receiptTexts",
    control: form.control,
  });

  const onSubmit = () => {
    console.log("i hate ts");
  };

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
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
                    <FormItem className="col-span-8">
                      <FormLabel>Text</FormLabel>
                      <FormControl>
                        <Input placeholder="Text" {...field} />
                      </FormControl>
                      <FormDescription>
                        Text as it appears on the receipt
                      </FormDescription>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="store"
                  render={({ field }) => (
                    <FormItem className="col-span-4">
                      <FormLabel>Store</FormLabel>
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
              </FormItem>
            )}
          />
        ))}
      </form>
    </Form>
  );
};

export default ReceiptTextForm;
