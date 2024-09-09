import { z } from "zod";

// 註冊綱要
export const UserFormValidation = z.object({
  name: z
    .string()
    .min(3, {
      message: "Name must be at least 3 characters.",
    })
    .max(50, {
      message: "Name must be at most 50 characters.",
    }),
  email: z.string().email("Invalid email address."),
  phone: z.string().refine((phone) => /^\+\d{10,15}$/.test(phone), {
    // test() method 檢查是否符合格式並 return boolean
    message: "Invalid phone number",
  }),
});
