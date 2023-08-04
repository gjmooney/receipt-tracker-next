import { z } from "zod";

//TODO: add custom error messages
export const AddItemValidator = z.object({
  // fields for Product
  type: z.string(),
  receiptText: z.string(),
  subtype: z.string().optional(),
  microtype: z.string().optional(),
  description: z.string().max(150).optional(),
  category: z.string().optional(),
  isProduce: z.boolean().default(false),
  upc: z.string(),
  brand: z.string().optional(),
  weight: z.coerce.number().positive(),
  weightUnit: z.enum(["G", "KG", "ML", "CL", "L"]),
});

export type AddItemRequest = z.infer<typeof AddItemValidator>;
