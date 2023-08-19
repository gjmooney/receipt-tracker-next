import { z } from "zod";

//TODO: add custom error messages
export const AddItemValidator = z.object({
  // required fields
  type: z.string().min(1),
  variety: z.string().min(1),
  isProduce: z.boolean().default(false),

  // always optional
  category: z.string().optional(),
  brand: z.string().optional(),

  // required for not produce
  weight: z.coerce.number().positive().optional(),
  weightUnit: z.enum(["G", "KG", "ML", "CL", "L", "UNIT"]).optional(),
  upc: z.string().length(13).optional(),

  // might keep might delete
  description: z.string().max(150).optional(),
});

export type AddItemRequest = z.infer<typeof AddItemValidator>;
