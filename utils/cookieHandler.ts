import { RecentCalculation, RecentsCookieSchema, OldRecentsCookieSchema } from "@/types/cookies";
import { z } from "zod";

export function handleCookies(
  weight: number,
  height: number,
  sex: "Male" | "Female",
  age: number,
  ageUnit: "years" | "months"
) {
  console.log("Handling cookies with values:", { weight, height, sex, age, ageUnit });

  let recents: RecentCalculation[] = [];
  // Parse existing cookie data safely
  if (typeof document !== "undefined") {
    try {
      const cookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("recents="));
      if (cookie) {
        const cookieValue = cookie.split("=")[1];
        if (cookieValue && cookieValue !== "undefined") {
          console.log("Existing cookie string:", cookieValue);

          const parsedCookie = JSON.parse(decodeURIComponent(cookieValue));
          console.log("Parsed cookie before validation:", parsedCookie);

          // Validate with Zod
          const validationResult = RecentsCookieSchema.safeParse({ data: parsedCookie });
          if (validationResult.success) {
            recents = validationResult.data.data;
          } else {
            // Fallback for old format (array directly)
            const oldFormatValidation = OldRecentsCookieSchema.safeParse(parsedCookie);
            if (oldFormatValidation.success) {
              recents = oldFormatValidation.data;
            } else {
              console.warn("Invalid cookie format, resetting (old format validation failed)", oldFormatValidation.error);
              recents = [];
            }
          }
        }
      }
    } catch (error) {
      console.warn("Error parsing or validating recents cookie:", error);
      // Reset if there's an error
      recents = [];
    }
  }

  // Create a new entry for current calculation
  const newEntry: RecentCalculation = {
    weight,
    height,
    sex,
    age,
    ageUnit,
  };

  // Check if a similar entry already exists
  const existingIndex = recents.findIndex(
    (r) =>
      r.weight === weight &&
      r.height === height &&
      r.sex === sex &&
      r.age === age &&
      r.ageUnit === ageUnit
  );

  if (existingIndex >= 0) {
    // Remove existing entry to move it to the end (most recent)
    recents.splice(existingIndex, 1);
  }

  // Add the new entry
  recents.push(newEntry);

  // Keep only the most recent 10 entries
  if (recents.length > 10) {
    recents = recents.slice(recents.length - 10);
  }

  // Store as a consistent format with array directly
  // (not nested inside a 'data' property)
  const cookieData = JSON.stringify(recents);

  console.log("Setting cookie with data:", cookieData);

  // Set the cookie with a 30-day expiry
  document.cookie = `recents=${encodeURIComponent(
    cookieData
  )}; max-age=${60 * 60 * 24 * 30}; path=/`;
} 