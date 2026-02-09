import { REQUIRED_FIELD } from "@/shared/constants";
import { z } from "zod";

export const addProductSchema = z.object({
  title: z.string().min(1, REQUIRED_FIELD),
  price: z.coerce.number().min(1, REQUIRED_FIELD),
  brand: z.string().min(1, REQUIRED_FIELD),
  sku: z.string().min(1, REQUIRED_FIELD),
});

export type AddProductForm = z.infer<typeof addProductSchema>;
