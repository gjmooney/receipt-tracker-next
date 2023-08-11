import { z } from "zod";

//TODO: add custom error messages
export const AddPurchaseValidator = z.object({
  // required fields
  store: z.string(),
  date: z.coerce.date(),
  receiptTexts: z.array(
    z.object({
      productId: z.string().min(1),
      price: z.coerce.number().nonnegative(),
      onSale: z.boolean(),
    }),
  ),
});

export type AddPurchaseRequest = z.infer<typeof AddPurchaseValidator>;
