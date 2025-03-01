import { z } from "zod";

export const salespersonSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" }),
  name2: z.string().optional(),
  id_employee: z.number().int().positive().optional().nullable(),
  job_title: z
    .string()
    .min(2, { message: "Job title must be at least 2 characters long" })
    .optional(),
  gender: z.string().optional(),
  commission: z.number().min(0).max(100).optional().nullable(),
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, { message: "Invalid phone number" })
    .optional(),
  email: z.string().email("Invalid email address").optional(),
  blocked: z.boolean().optional(),
});
