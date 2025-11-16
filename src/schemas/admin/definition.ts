import { z } from "zod";

export const LoginSchema = z.object({
  username: z.string().min(1, {
    message: "Username is required.",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
});

export const ProductSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  categoryId: z.string().min(1, "Category is required"),
  price: z.number().min(0, "Price must be positive"),
  quantity: z.number().min(0, "Quantity must be positive"),
  discountPercent: z.number().min(0).max(100, "Discount must be between 0-100"),
  description: z.string().min(1, "Description is required"),
  colors: z
    .array(
      z.object({
        id: z.number().optional(),
        hexCode: z
          .string()
          .regex(/^#([0-9A-Fa-f]{6})$/, "Must be a valid 6-digit hex code"),
      })
    )
    .min(1, "At least one color is required"),
});

export const contractFormSchema = z.object({
  employeeId: z.number().min(1, "Employee is required"),
  contractTypeId: z.number().min(1, "Contract type is required"),

  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().nullable().optional(),

  baseSalary: z.number().min(0, "Base salary is required"),

  contractDetail: z.string().optional(),

  // REQUIRED BOOLEAN (not optional)
  isExpired: z.boolean().default(false),
});
export type ContractFormValues = z.infer<typeof contractFormSchema>;
