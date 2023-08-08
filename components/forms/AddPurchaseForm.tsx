"use client";

import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { ReceiptText, Store } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
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
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface AddPurchaseFormProps {
  stores: Store[];
  receiptTexts: ReceiptText[];
}
type rct = Pick<ReceiptText, "id" | "text">;

const AddPurchaseForm: FC<AddPurchaseFormProps> = ({
  stores,
  receiptTexts,
}) => {
  const [selectedStoreId, setSelectedStoreId] = useState("");
  const [receiptTextOptions, setReceiptTextOptions] = useState<rct[]>([]);

  useEffect(() => {
    // get all the receipt texts from the selected store
    console.log("receiptTexts", receiptTexts);
    const filteredReceipts = receiptTexts
      .filter((receipt) => receipt.storeId === selectedStoreId)
      .map(({ text, id }) => {
        return { text, id };
      });

    console.log("selectedStoreId", selectedStoreId);

    setReceiptTextOptions(filteredReceipts);
  }, [receiptTexts, selectedStoreId]);

  //TODO - use location to differentiate stores in chain and
  //TODO resolver, types, and defaults
  const form = useForm({
    defaultValues: {
      store: "",
      date: new Date(),
      entries: [{ name: "test", price: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "entries",
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
            <FormItem className="col-span-8">
              <FormLabel>Store</FormLabel>
              <Select
                onValueChange={(value) => {
                  console.log("value", value);
                  field.onChange(value);

                  setSelectedStoreId(value);
                }}
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

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="col-span-4">
              <FormLabel>Date of purchase</FormLabel>
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
              <FormDescription>The date the purchase was made.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="col-span-full ">
          {fields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`entries.${index}`}
              render={({ field }) => (
                <FormItem className="grid grid-cols-12 gap-x-4">
                  <FormLabel
                    className={cn("col-span-full", index !== 0 && "sr-only")}
                  >
                    Items
                  </FormLabel>
                  <FormDescription
                    className={cn("col-span-full", index !== 0 && "sr-only")}
                  >
                    Add the items you bought on this purchase.
                  </FormDescription>

                  <FormField
                    control={form.control}
                    name={`entries.${index}.name`}
                    render={({ field }) => (
                      <FormItem className="col-span-5">
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a receipt item" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {receiptTextOptions.map((text) => (
                              <SelectItem
                                className="capitalize"
                                key={text.id}
                                value={text.id}
                              >
                                <span className="capitalize">{text.text}</span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`entries.${index}.price`}
                    render={({ field }) => (
                      <FormItem className="col-span-5">
                        <FormControl>
                          <Input placeholder="price" {...field} />
                        </FormControl>
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
            onClick={() => append({ name: "", price: 0 })}
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
