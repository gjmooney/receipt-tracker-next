import { z } from "zod";

//TODO: add custom error messages
export const AddItemValidator = z.object({
  // required fields
  type: z.string(),
  variety: z.string(),
  isProduce: z.boolean().default(false),
  receiptText: z.string(),
  store: z.string(),

  // always optional
  category: z.string().optional(),
  brand: z.string().optional(),

  // required for not produce
  weight: z.coerce.number().positive(),
  weightUnit: z.enum(["G", "KG", "ML", "CL", "L", "UNIT"]),
  upc: z.string().optional(),

  // might keep might delete
  description: z.string().max(150).optional(),
});

export type AddItemRequest = z.infer<typeof AddItemValidator>;
