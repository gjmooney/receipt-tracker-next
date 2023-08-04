import { z } from "zod";

//TODO: add custom error messages
export const AddItemValidator = z.object({
  // fields for Product
  type: z.string(),
  receiptText: z.string(),
  store: z.string(),
  subtype: z.string().optional(),
  microtype: z.string().optional(),
  description: z.string().max(150).optional(),
  category: z.string().optional(),
  isProduce: z.boolean().default(false),
  upc: z.string(),
  brand: z.string().optional(),
  weight: z.coerce.number().positive().optional(),
  weightUnit: z.enum(["G", "KG", "ML", "CL", "L"]).optional(),
});

export type AddItemRequest = z.infer<typeof AddItemValidator>;
