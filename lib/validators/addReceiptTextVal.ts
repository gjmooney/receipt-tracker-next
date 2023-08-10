import { z } from "zod";

//TODO: add custom error messages
export const AddReceiptTextValidator = z.object({
  // required fields
  receiptTexts: z.array(
    z.object({ text: z.string().min(1), store: z.string().min(1) }),
  ),
});

export type AddReceiptTextRequest = z.infer<typeof AddReceiptTextValidator>;
