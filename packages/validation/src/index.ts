import { z } from "zod";

export const createShopSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(10),
  categoryId: z.string().uuid()
});

export const createProductSchema = z.object({
  name: z.string().min(2),
  categoryId: z.string().uuid(),
  regularPrice: z.number().positive(),
  salePrice: z.number().positive().optional()
});
