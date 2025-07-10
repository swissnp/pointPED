import { Constraint } from "@/components/drugData";

export function findConstraint(ageInMonths: number, constraints: Constraint[]): Constraint | null {
  if (!constraints || constraints.length === 0) {
    return null;
  }

  // Sort constraints by ageMonth just in case they are not already sorted.
  const sortedConstraints = [...constraints].sort((a, b) => a.ageMonth - b.ageMonth);

  let bestMatch = null;

  for (const constraint of sortedConstraints) {
    if (ageInMonths >= constraint.ageMonth) {
      bestMatch = constraint;
    } else {
      break;
    }
  }

  return bestMatch;
} 