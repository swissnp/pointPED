import { z } from "zod";
import { DrugOption } from "@/components/drugData";

// --- Zod Schema Definition ---
export const formSchema = z
  .object({
    weight: z.string().refine(
      (val) => {
        if (val === "") return true; // Allow empty string initially or if height is provided
        const num = Number(val);
        return !isNaN(num) && num >= 0 && num <= 400;
      },
      { message: "Weight must be a number between 0 and 400" }
    ),
    height: z.string().refine(
      (val) => {
        if (val === "") return true; // Allow empty string initially or if weight is provided
        const num = Number(val);
        return !isNaN(num) && num >= 45 && num <= 170;
      },
      { message: "Height must be a number between 45 and 170" }
    ),
    sex: z.union([z.literal("Male"), z.literal("Female"), z.literal("")]), // Allow "" initially, but require Male/Female on submit
    selectedDrug: z.array(z.custom<DrugOption>()).min(1, { message: "Select at least one drug" }), // Ensure at least one drug
    age: z.string().min(1, { message: "Age is required." }),
    ageUnit: z.union([z.literal("years"), z.literal("months")]),
  })
  .refine(
    (data) => 
      (data.weight !== "" && Number(data.weight) > 0) || 
      (data.height !== "" && Number(data.height) > 0),
    {
      message: "Please enter a valid positive Weight or Height",
      path: ["weight"], // Or path: ["height"] or general form error
    }
  )
  .refine(
    (data) => data.sex !== "",
    {
      message: "Sex is required",
      path: ["sex"],
    }
  )

// Infer the form data type from the schema
export type FormData = z.infer<typeof formSchema>; 