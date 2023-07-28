import { z } from "zod";

export const AddItemValidator = z.object({
  // fields for Product
  type: z.string(),
  subtype: z.string().optional(),
  microtype: z.string().optional(),
  description: z.string().max(150).optional(),
  category: z.string().optional(),
  upc: z.number().optional(),

  // fields for Purchase
  price: z.coerce.number().positive(),
  datePurchased: z.date(),
  onSale: z.boolean(),
  brand: z.string().optional(),
  quantityType: z.enum(["WEIGHT", "BUNCH", "PIECE"]),
  weightUnit: z.enum(["G", "KG", "ML", "CL", "L"]).optional(),
  quantityValue: z.coerce.number().positive(),
  fromStore: z.string(),
});

export type AddItemRequest = z.infer<typeof AddItemValidator>;
