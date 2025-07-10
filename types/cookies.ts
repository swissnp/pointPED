import { z } from "zod";

// Define Zod schema for RecentCalculation
export const RecentCalculationSchema = z.object({
  weight: z.number().nonnegative(),
  height: z.number().min(45).max(170),
  sex: z.union([z.literal("Male"), z.literal("Female")]),
  age: z.number().nonnegative(),
  ageUnit: z.union([z.literal("years"), z.literal("months")]),
});

// Infer the type from the schema
export type RecentCalculation = z.infer<typeof RecentCalculationSchema>;

// Define Zod schema for RecentsCookie
export const RecentsCookieSchema = z.object({
  data: z.array(RecentCalculationSchema),
});

// Define Zod schema for old cookie format (array directly)
export const OldRecentsCookieSchema = z.array(RecentCalculationSchema); 