import { z } from "zod";

//TODO: add custom error messages
export const AddPurchaseValidator = z.object({
  // required fields
  store: z.string().nonempty(),
  date: z.coerce.date(),
  receiptTexts: z.array(
    z.object({
      productId: z.string().nonempty(),
      price: z.coerce.number().nonnegative(),
      onSale: z.boolean(),
    }),
  ),
});

export type AddPurchaseRequest = z.infer<typeof AddPurchaseValidator>;
