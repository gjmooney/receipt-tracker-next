import { z } from "zod";

export const AddItemValidator = z.object({
  // fields for Product
  type: z.string(),
  subtype: z.string().optional(),
  microtype: z.string().optional(),
  description: z.string().max(150).optional(),
  category: z.string().optional(),
  isProduce: z.boolean().default(false),
  upc: z.string(),
  brand: z.string().optional(),
});

export type AddItemRequest = z.infer<typeof AddItemValidator>;
