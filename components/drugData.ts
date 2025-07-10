export interface Constraint {
  ageMonth: number;
  min: number;
  max: number | null;
  coef: number | [number, number];
}

export interface DrugOption {
  value: string;
  label: string;
  constraints: Constraint[];
  unit: string;
  bodyWeightType: "TBW" | "IBW" | "AdjBW" | null;
  notes?: string;
}

export interface GroupedDrugOptions {
  [category: string]: DrugOption[];
}

// Data parsed from drug_info.csv
// NOTE: This list is now populated with data parsed from drug_info.csv.
// However, the source data was complex and required interpretation.
// Please carefully review all drug data for accuracy before use.
// Dosages for continuous infusions or those based on BSA were generally omitted.
// Doses are calculated per-dose, derived from daily dose and frequency where necessary.
export const groupedDrugOptions: GroupedDrugOptions = {
  "CPR Drugs": [
    {
      value: "adenosine",
      label: "Adenosine",
      constraints: [{ ageMonth: 0, min: 0, max: null, coef: 0.1 }],
      unit: "mg",
      bodyWeightType: "IBW",
      notes: "Increase by 0.1 mg/kg each time. If BW >= 50 kg, use adult dose.",
    },
    {
      value: "amiodarone",
      label: "Amiodarone",
      constraints: [{ ageMonth: 0, min: 0, max: null, coef: 5 }],
      unit: "mg",
      bodyWeightType: "TBW",
      notes: "For perfusing tachydysrhythmias, follow with a drip of 5-15 mcg/kg/min.",
    },
    {
      value: "atropine",
      label: "Atropine",
      constraints: [{ ageMonth: 0, min: 0.1, max: 1, coef: 0.02 }],
      unit: "mg",
      bodyWeightType: "TBW",
      notes: "Minimum dose 0.1 mg.",
    },
    {
      value: "calciumChloride",
      label: "Calcium Chloride",
      constraints: [{ ageMonth: 0, min: 0, max: null, coef: 20 }],
      unit: "mg",
      bodyWeightType: "TBW",
    },
    {
      value: "calciumGluconate",
      label: "Calcium Gluconate 10%",
      constraints: [{ ageMonth: 0, min: 0, max: null, coef: [0.6, 1] }],
      unit: "ml",
      bodyWeightType: "IBW",
    },
    {
      value: "dextroseInjection",
      label: "Dextrose Injection",
      constraints: [{ ageMonth: 0, min: 0, max: null, coef: [0.5, 1] }],
      unit: "g",
      bodyWeightType: "TBW",
      notes: "5-10 ml/kg of 10%dextrose, 2-4 ml/kg of 25%dextrose, 1-2 ml/kg of 50%dextrose",
    },
    {
      value: "epinephrine",
      label: "Epinephrine (1:10000)",
      constraints: [{ ageMonth: 0, min: 0, max: null, coef: 0.1 }],
      unit: "ml",
      bodyWeightType: "TBW",
      notes: "Continuous with 0.1 - 3 mcg/kg/min.",
    },
    {
      value: "furosemide",
      label: "Furosemide",
      constraints: [{ ageMonth: 0, min: 0, max: null, coef: [0.5, 2] }],
      unit: "mg",
      bodyWeightType: "IBW",
      notes: "Continuous with 0.05 mg/kg/min.",
    },
    {
      value: "lidocaine",
      label: "Lidocaine",
      constraints: [{ ageMonth: 0, min: 0, max: null, coef: 1 }],
      unit: "mg",
      bodyWeightType: "TBW",
      notes: "Continuous with 20-60 mcg/kg/min.",
    },
    {
      value: "magnesiumSulfate",
      label: "Magnesium Sulfate",
      constraints: [{ ageMonth: 0, min: 0, max: 2000, coef: [25, 50] }],
      unit: "mg",
      bodyWeightType: "IBW",
    },
    {
      value: "naloxone",
      label: "Naloxone",
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: [0.01, 0.1] },
        { ageMonth: 60, min: 0, max: 2, coef: 2 },
      ],
      unit: "mg",
      bodyWeightType: "TBW",
    },
    {
      value: "sodiumBicarbonate",
      label: "Sodium Bicarbonate",
      constraints: [{ ageMonth: 0, min: 0, max: null, coef: 1 }],
      unit: "ml",
      bodyWeightType: "IBW",
      notes: "Repeat with 0.5 ml/kg.",
    },
    {
      value: "milrinone",
      label: "Milrinone",
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: [50, 70] },
      ],
      unit: 'mcg',
      bodyWeightType: 'TBW',
      notes: "Loading dose. Follow with infusion drip 0.5-0.75 mcg/kg/min."
    }
  ],
  "Antacids & Gastric Remedies": [
    {
      value: 'antacid',
      label: 'Antacid',
      constraints: [
          { ageMonth: 0, min: 0, max: null, coef: [0.5, 1] },
      ],
      unit: 'ml',
      bodyWeightType: 'IBW',
      notes: "Na can cause fluid retention; Aluminium can cause constipation, osteomalacia, dementia, hypophosphatemia, seizures; Calcium can cause milk-alkali syndrome; Mg can cause diarrhea."
    },
    {
      value: 'cimetidine',
      label: 'Cimetidine',
      constraints: [
          { ageMonth: 0, min: 0, max: null, coef: [1.67, 5] },
          { ageMonth: 1, min: 0, max: null, coef: [2.5, 10] },
          { ageMonth: 12, min: 0, max: null, coef: [5, 7.5] },
      ],
      unit: 'mg',
      bodyWeightType: 'IBW',
      notes: "Give every 6 hr for CrCl > 40; every 8 hr for CrCl 20-40; every 12 hr for CrCl < 20."
    },
    {
      value: 'sucralfate',
      label: 'Sucralfate',
      constraints: [
          { ageMonth: 0, min: 0, max: null, coef: [10, 20] },
      ],
      unit: 'mg',
      bodyWeightType: 'IBW',
    },
    {
      value: 'calcium_carbonate_hypocalcemia',
      label: 'Calcium Carbonate (Hypocalcemia)',
      constraints: [
        { ageMonth: 1, min: 0, max: null, coef: [3.3, 16.3] }
      ],
      unit: 'mg',
      bodyWeightType: 'IBW',
      notes: "Calculated per dose from 20-65 mg/kg/day q4-6hr. Dose is for elemental Ca."
    }
  ],
  "GI Regulators & Antiflatulents": [
    {
      value: 'cisapride',
      label: 'Cisapride',
      constraints: [
          { ageMonth: 0, min: 0, max: null, coef: [0.2, 0.3] }
      ],
      unit: 'mg',
      bodyWeightType: 'TBW',
    },
    {
      value: 'simethicone',
      label: 'Simethicone',
      constraints: [
          { ageMonth: 0, min: 0, max: 500, coef: 20},
          { ageMonth: 12, min: 0, max: 500, coef: 40},
          { ageMonth: 144, min: 0, max: 500, coef: 120},
      ],
      unit: 'mg',
      bodyWeightType: null,
    }
  ],
  "Antispasmodics": [
    {
      value: 'dicyclomine',
      label: 'Dicyclomine',
      constraints: [
        { ageMonth: 6, min: 0, max: null, coef: 5 },
        { ageMonth: 12, min: 0, max: null, coef: 10 },
      ],
      unit: 'mg',
      bodyWeightType: null,
    },
    {
      value: 'hyoscine',
      label: 'Hyoscine',
      constraints: [
        { ageMonth: 0, min: 0, max: 40, coef: 0.5 }
      ],
      unit: 'mg',
      bodyWeightType: 'TBW',
    },
    {
      value: 'mebeverine',
      label: 'Mebeverine',
      constraints: [
        { ageMonth: 120, min: 0, max: null, coef: 150 }
      ],
      unit: 'mg',
      bodyWeightType: null,
      notes: 'For >= 10 years old. Use with caution.'
    },
    {
      value: 'propantheline_bromide',
      label: 'Propantheline Bromide',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: 0.75 }
      ],
      unit: 'mg',
      bodyWeightType: 'IBW',
      notes: 'For antispasmodic use.'
    }
  ],
  "Laxatives & Purgatives": [
    {
      value: 'bisacodyl_po',
      label: 'Bisacodyl (PO)',
      constraints: [
        { ageMonth: 36, min: 0, max: null, coef: 10 },
        { ageMonth: 144, min: 0, max: null, coef: 15 }
      ],
      unit: 'mg',
      bodyWeightType: null,
    },
    {
      value: 'bisacodyl_rectal',
      label: 'Bisacodyl (Rectal)',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: 5 },
        { ageMonth: 24, min: 0, max: null, coef: 10 }
      ],
      unit: 'mg',
      bodyWeightType: null,
    },
    {
      value: 'glycerin',
      label: 'Glycerin',
      constraints: [{ ageMonth: 0, min: 0, max: null, coef: 1 }],
      unit: 'suppository',
      bodyWeightType: null,
      notes: 'Rectal suppository. Dose is per suppository.'
    },
    {
      value: 'lactobacillus_acidophilus',
      label: 'Lactobacillus acidophilus',
      constraints: [{ ageMonth: 0, min: 0, max: null, coef: 4 }],
      unit: 'capsules',
      bodyWeightType: null,
      notes: "Can be mixed in milk for children. Dose is 2-4 capsules."
    },
    {
      value: 'lactulose',
      label: 'Lactulose',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: 2.5 },
        { ageMonth: 12, min: 0, max: null, coef: 22.5 }
      ],
      unit: 'ml',
      bodyWeightType: null,
      notes: 'Dose for laxatives.'
    },
    {
      value: 'paraffin_liquid',
      label: 'Paraffin Liquid',
      constraints: [
        { ageMonth: 60, min: 0, max: null, coef: [5, 15] },
        { ageMonth: 144, min: 0, max: null, coef: [15, 45] }
      ],
      unit: 'ml',
      bodyWeightType: null,
      notes: 'Do not use for more than 1 week.'
    },
    {
      value: 'milk_of_magnesia',
      label: 'Milk of Magnesia',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: 0.5 }
      ],
      unit: 'ml',
      bodyWeightType: 'TBW',
      notes: 'Use with caution in renal dysfunction. Dose for < 2 years. Older children have non-weight-based dosing.'
    },
    {
      value: 'phenolphthalein',
      label: 'Phenolphthalein',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: 1 }
      ],
      unit: 'mg',
      bodyWeightType: 'IBW',
    },
    {
      value: 'polyethylene_glycol',
      label: 'Polyethylene Glycol',
      constraints: [
        { ageMonth: 0, min: 0, max: 17, coef: 1 }
      ],
      unit: 'g',
      bodyWeightType: 'IBW',
      notes: 'Not for more than 2 months.'
    },
    {
      value: 'psyllium_mucilloid',
      label: 'Psyllium Mucilloid',
      constraints: [
        { ageMonth: 72, min: 0, max: null, coef: [1.25, 15] },
        { ageMonth: 144, min: 0, max: null, coef: [2.5, 30] }
      ],
      unit: 'g',
      bodyWeightType: null,
    },
    {
      value: 'senna_glycosides',
      label: 'Senna Glycosides',
      constraints: [{ ageMonth: 144, min: 0, max: null, coef: 2 }],
      unit: 'tab',
      bodyWeightType: null,
      notes: 'For children > 12 years old. Dose is 1-2 tablets.'
    },
    {
      value: 'sodium_phosphate',
      label: 'Sodium Phosphate',
      constraints: [
        { ageMonth: 60, min: 0, max: null, coef: 5 },
        { ageMonth: 120, min: 0, max: null, coef: 10 },
        { ageMonth: 144, min: 0, max: null, coef: 30 }
      ],
      unit: 'ml',
      bodyWeightType: null,
      notes: 'Dose for laxatives.'
    }
  ],
  "Cardiac Drugs": [
    {
      value: 'amiodarone_po',
      label: 'Amiodarone (PO)',
      constraints: [
        { ageMonth: 12, min: 0, max: null, coef: [5, 15] },
      ],
      unit: 'mg',
      bodyWeightType: 'TBW',
      notes: "Continue for 4-14 days then decrease to 5mg/kg/day OD."
    },
    {
      value: 'diazoxide',
      label: 'Diazoxide',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: [1, 3] },
      ],
      unit: 'mg',
      bodyWeightType: 'AdjBW',
      notes: 'Repeatable q 5-15 min until target blood pressure is reached.'
    },
    {
      value: 'digoxin_po',
      label: 'Digoxin (PO)',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: [4, 5] }, // Term newborn, using upper end of 4-5mcg/kg/dose
        { ageMonth: 1, min: 0, max: null, coef: [5, 6] }, // 1mo-2yr, using upper end of 5-6mcg/kg/dose
        { ageMonth: 24, min: 0, max: null, coef: [4, 5] }, // 2-10yr, using upper end of 4-5mcg/kg/dose
        { ageMonth: 120, min: 0, max: null, coef: [2.5, 5] }, // >10yr, using upper end of 2.5-5mcg/kg/dose
      ],
      unit: 'mcg',
      bodyWeightType: 'IBW',
      notes: 'Daily maintenance dose. Contraindicated for ventricular dysrhythmias.'
    },
    {
      value: 'digoxin_iv',
      label: 'Digoxin (IV/IM)',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: [1.5, 2] }, // Preterm
        { ageMonth: 0.5, min: 0, max: null, coef: [3, 4] }, // Term
        { ageMonth: 1, min: 0, max: null, coef: [3.75, 4.5] }, // 1mo-2yr
        { ageMonth: 24, min: 0, max: null, coef: [3, 4] }, // 2-10yr
        { ageMonth: 120, min: 0, max: null, coef: [2, 3] }, // >10yr
      ],
      unit: 'mcg',
      bodyWeightType: 'IBW',
    },
    {
      value: 'quinidine',
      label: 'Quinidine',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: [2.5, 7.5] }
      ],
      unit: 'mg',
      bodyWeightType: 'AdjBW',
      notes: 'Test dose 2 mg/kg oral.'
    },
    {
      value: 'streptokinase',
      label: 'Streptokinase',
      constraints: [{ ageMonth: 0, min: 0, max: null, coef: [3500, 4500] }],
      unit: 'unit',
      bodyWeightType: 'IBW',
      notes: 'Loading dose (3500-4500 unit/kg) dripped in 30 min. Followed by continuous drip.'
    }
  ],
  "Calcium Channel Blockers": [
    {
      value: 'amlodipine',
      label: 'Amlodipine',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: 5 }
      ],
      unit: 'mg',
      bodyWeightType: 'TBW',
    },
    {
      value: 'diltiazem',
      label: 'Diltiazem',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: [0.375, 0.67] }
      ],
      unit: 'mg',
      bodyWeightType: 'TBW',
    },
    {
      value: 'nifedipine_emergency',
      label: 'Nifedipine (Emergency)',
      constraints: [
        { ageMonth: 0, min: 0, max: 10, coef: [0.25, 0.5] }
      ],
      unit: 'mg',
      bodyWeightType: 'TBW',
      notes: 'For hypertensive emergency.'
    },
    {
      value: 'nifedipine_cardiomyopathy',
      label: 'Nifedipine (Cardiomyopathy)',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: [0.15, 0.3] }
      ],
      unit: 'mg',
      bodyWeightType: 'TBW',
      notes: 'For hypertrophic cardiomyopathy.'
    },
    {
      value: 'verapamil_iv',
      label: 'Verapamil (IV)',
      constraints: [
        { ageMonth: 0, min: 0, max: 5, coef: 0.3 }
      ],
      unit: 'mg',
      bodyWeightType: 'AdjBW',
      notes: 'For dysrhythmias; slowly push in 2-3 min; max dose in second dose 10 mg/dose.'
    },
    {
      value: 'verapamil_po',
      label: 'Verapamil (PO)',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: [1.33, 2.67] }
      ],
      unit: 'mg',
      bodyWeightType: 'AdjBW',
      notes: 'For hypertension.'
    }
  ],
  "Antihypertensives": [
    {
      value: 'captopril',
      label: 'Captopril',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: 0.01 }, // Preterm
        { ageMonth: 1, min: 0, max: null, coef: 0.3 }, // 1mo-1yr
        { ageMonth: 12, min: 0, max: null, coef: 0.5 }, // >1yr
        { ageMonth: 60, min: 0, max: null, coef: 25 }, // >5yr, non-weight-based
      ],
      unit: 'mg',
      bodyWeightType: 'TBW',
    },
    {
      value: 'clonidine',
      label: 'Clonidine',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: [1.25, 3.5] }
      ],
      unit: 'mcg',
      bodyWeightType: 'TBW',
      notes: 'For clonidine test: 0.5 mg/m2 or 4 mcg/kg one dose.'
    },
    {
      value: 'enalapril',
      label: 'Enalapril',
      constraints: [
        { ageMonth: 0, min: 0, max: 5, coef: 0.08 }
      ],
      unit: 'mg',
      bodyWeightType: 'TBW',
      notes: 'Contraindication if GFR < 30.'
    },
    {
      value: 'hydralazine_po',
      label: 'Hydralazine (PO)',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: [0.1875, 0.5] }
      ],
      unit: 'mg',
      bodyWeightType: 'IBW',
    },
    {
      value: 'lisinopril',
      label: 'Lisinopril',
      constraints: [
        { ageMonth: 72, min: 0, max: 40, coef: 0.07 }
      ],
      unit: 'mg',
      bodyWeightType: 'IBW',
      notes: 'Not recommended in pediatric patients less than 6 years old or GFR < 30 mL/min.'
    },
    {
      value: 'methyldopa',
      label: 'Methyldopa',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: 2.5 }
      ],
      unit: 'mg',
      bodyWeightType: 'IBW',
      notes: "SE: positive Coomb's test, hemolytic anemia."
    },
    {
      value: 'minoxidil',
      label: 'Minoxidil',
      constraints: [
        { ageMonth: 0, min: 0, max: 5, coef: 1 }
      ],
      unit: 'mg',
      bodyWeightType: 'TBW',
      notes: 'SE: Steven-Johnson syndrome.'
    },
    {
      value: 'prazosin',
      label: 'Prazosin',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: [5, 150] }
      ],
      unit: 'mcg',
      bodyWeightType: 'TBW',
      notes: 'Hypersensitivity to quinazolines.'
    },
    {
      value: "reserpine",
      label: "Reserpine",
      constraints: [
        { ageMonth: 0, min: 0, max: 0.25, coef: 0.02 }
      ],
      unit: "mg",
      bodyWeightType: "TBW"
    }
  ],
  "Beta Blockers": [
    {
      value: 'atenolol',
      label: 'Atenolol',
      constraints: [
        { ageMonth: 0, min: 0, max: 100, coef: [1, 3] }
      ],
      unit: 'mg',
      bodyWeightType: 'IBW',
      notes: 'Do not stop abruptly, taper over 1-2 weeks.'
    },
    {
      value: 'metoprolol',
      label: 'Metoprolol',
      constraints: [
        { ageMonth: 72, min: 0, max: 200, coef: 1 }
      ],
      unit: 'mg',
      bodyWeightType: 'TBW',
      notes: 'For >= 6 years.'
    },
    {
      value: 'propranolol_po',
      label: 'Propranolol (PO)',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: 0.25 }, // Neonates
        { ageMonth: 1, min: 0, max: null, coef: 0.25 }, // Children
      ],
      unit: 'mg',
      bodyWeightType: 'AdjBW',
      notes: 'For thyrotoxicosis 2 mg/kg/day divided q 6-12 hr. Adjust q 3-5 days for typically use 2-4 mg/kg/day.'
    }
  ],
  "Diuretics & Antidiuretics": [
    {
      value: 'acetazolamide_glaucoma',
      label: 'Acetazolamide (Glaucoma)',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: [2, 10] }
      ],
      unit: 'mg',
      bodyWeightType: 'IBW',
    },
    {
      value: 'amiloride_hcl',
      label: 'Amiloride HCl',
      constraints: [
        { ageMonth: 0, min: 0, max: 20, coef: 0.625 }
      ],
      unit: 'mg',
      bodyWeightType: 'IBW',
      notes: 'Safety and efficacy for pediatric use has not been established.'
    },
    {
      value: 'desmopressin_po',
      label: 'Desmopressin (PO)',
      constraints: [
        { ageMonth: 0, min: 0, max: 0.2, coef: 5 }
      ],
      unit: 'mcg',
      bodyWeightType: 'IBW'
    },
    {
      value: 'furosemide_po',
      label: 'Furosemide (PO)',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: [0.5, 1] },
        { ageMonth: 1, min: 0, max: null, coef: [0.5, 2] },
      ],
      unit: 'mg',
      bodyWeightType: 'IBW',
      notes: 'IV infusion 0.5-3 mcg/kg/min.'
    },
    {
      value: 'hydrochlorothiazide',
      label: 'Hydrochlorothiazide',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: [1, 2] },
        { ageMonth: 6, min: 0, max: null, coef: 1 },
      ],
      unit: 'mg',
      bodyWeightType: 'TBW',
    },
    {
      value: 'mannitol',
      label: 'Mannitol',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: 1 }
      ],
      unit: 'g',
      bodyWeightType: 'IBW',
      notes: 'Keep UOP >= 1 ml/kg/hr.'
    },
    {
      value: 'spironolactone',
      label: 'Spironolactone',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: [0.375, 3.5] }
      ],
      unit: 'mg',
      bodyWeightType: 'TBW',
      notes: 'For diagnosis of primary hyperaldosteronism: 125 - 375 mg/BSA/day bid.'
    }
  ],
  "Peripheral & Cerebral Vasodilators": [
    {
      value: 'cinnarizine',
      label: 'Cinnarizine',
      constraints: [ { ageMonth: 0, min: 0, max: null, coef: 50 } ],
      unit: 'mg',
      bodyWeightType: null,
      notes: 'Contraindication in asthmatic attack.'
    },
    {
      value: 'flunarizine',
      label: 'Flunarizine',
      constraints: [ { ageMonth: 0, min: 0, max: null, coef: 10 } ],
      unit: 'mg',
      bodyWeightType: null,
      notes: 'SE: EPS.'
    }
  ],
  "Migraine Drugs": [
    {
      value: 'ergotamine_tartrate',
      label: 'Ergotamine Tartrate',
      constraints: [ { ageMonth: 144, min: 0, max: null, coef: 1 } ],
      unit: 'tab',
      bodyWeightType: null,
      notes: 'For adolescents.'
    }
  ],
  "Respiratory Stimulants": [
    {
      value: 'ephedrine',
      label: 'Ephedrine HCl',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: 1 }
      ],
      unit: 'drop',
      bodyWeightType: null,
      notes: '1 drop per nostril. Do not use for more than 5-7 days.'
    }
  ],
  "Antiasthmatic & Bronchodilators": [
    {
      value: 'aminophylline_iv',
      label: 'Aminophylline (IV)',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: 5 }, // newborn, loading dose
        { ageMonth: 1.5, min: 0, max: null, coef: 5 }, // 6 weeks - 6 months, loading dose
        { ageMonth: 6, min: 0, max: null, coef: 5 }, // 6 months - 1 year, loading dose
        { ageMonth: 12, min: 0, max: null, coef: 5 }, // 1 - 9 years, loading dose
        { ageMonth: 108, min: 0, max: null, coef: 5 }, // 9 - 12 years, loading dose
        { ageMonth: 144, min: 0, max: null, coef: 5 }, // 12 - 16 years, loading dose
      ],
      unit: 'mg',
      bodyWeightType: 'TBW', // Loading dose is Actual BW
      notes: 'Requires aminophylline level 6-13 mcg/ml.'
    },
    {
      value: 'epinephrine_anaphylaxis',
      label: 'Epinephrine (Anaphylaxis)',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: 0.01 }
      ],
      unit: 'mg',
      bodyWeightType: 'TBW',
      notes: 'For anaphylaxis.'
    },
    {
      value: 'salbutamol_po',
      label: 'Salbutamol (PO)',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: [0.075, 0.1] }
      ],
      unit: 'mg',
      bodyWeightType: 'TBW',
    },
    {
      value: 'terbutaline_sc',
      label: 'Terbutaline (SC)',
      constraints: [
        { ageMonth: 0, min: 0, max: 0.3, coef: [0.005, 0.01] }
      ],
      unit: 'mg',
      bodyWeightType: 'TBW',
    },
    {
      value: 'beclomethasone_inhaler',
      label: 'Beclomethasone (Inhaler)',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: 4 }
      ],
      unit: 'puff',
      bodyWeightType: null,
      notes: 'Rinse mouth and throat with water after each use.'
    },
    {
      value: 'budesonide_inhaler',
      label: 'Budesonide (Inhaler)',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: 200 }
      ],
      unit: 'mcg',
      bodyWeightType: null,
      notes: 'Rinse mouth and throat with water after each use.'
    },
    {
      value: 'ipratropium_bromide_inhaler',
      label: 'Ipratropium Bromide (Inhaler)',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: 2 }
      ],
      unit: 'puff',
      bodyWeightType: null,
      notes: 'Anticholinergic, use with Beta2 agonist.'
    },
    {
      value: 'ketotifen',
      label: 'Ketotifen',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: 0.02 },
        { ageMonth: 12, min: 0, max: null, coef: 0.5 },
        { ageMonth: 36, min: 0, max: null, coef: 1 },
      ],
      unit: 'mg',
      bodyWeightType: 'TBW',
    },
    {
      value: 'montelukast',
      label: 'Montelukast',
      constraints: [
        { ageMonth: 24, min: 0, max: null, coef: 4 },
        { ageMonth: 72, min: 0, max: null, coef: 5 },
        { ageMonth: 168, min: 0, max: null, coef: 10 },
      ],
      unit: 'mg',
      bodyWeightType: null,
    },
    {
      value: 'procaterol',
      label: 'Procaterol',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: 1.25 }
      ],
      unit: 'mcg',
      bodyWeightType: 'IBW',
      notes: 'Highly selective Beta-2 agonist.'
    },
    {
      value: 'sodium_cromoglycate_inhaler',
      label: 'Sodium Cromoglycate (Inhaler)',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: 2 }
      ],
      unit: 'puff',
      bodyWeightType: null,
      notes: '1-2 puffs 5-15 mins before exercise.'
    },
    {
      value: 'theophylline',
      label: 'Theophylline',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: 5 }, // Loading dose
      ],
      unit: 'mg',
      bodyWeightType: 'TBW',
    },
    {
      value: 'theophylline_sustained',
      label: 'Theophylline (Sustained Release)',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: 8 }
      ],
      unit: 'mg',
      bodyWeightType: 'TBW'
    },
    {
      value: 'theophylline_ultra_sustained',
      label: 'Theophylline (Ultra-Sustained Release)',
      constraints: [
        { ageMonth: 72, min: 0, max: null, coef: 20 },
        { ageMonth: 108, min: 0, max: null, coef: 18 },
        { ageMonth: 144, min: 0, max: null, coef: 16 },
      ],
      unit: 'mg',
      bodyWeightType: 'TBW'
    }
  ],
  "Cough & Cold Remedies": [
    {
      value: 'acetylcysteine',
      label: 'Acetylcysteine',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: [50, 100] }
      ],
      unit: 'mg',
      bodyWeightType: null,
    },
    {
      value: 'ambroxol',
      label: 'Ambroxol',
      constraints: [
        { ageMonth: 60, min: 0, max: null, coef: 15 },
        { ageMonth: 120, min: 0, max: null, coef: 30 },
      ],
      unit: 'mg',
      bodyWeightType: null,
    },
    {
      value: 'bromhexine',
      label: 'Bromhexine',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: 4 }
      ],
      unit: 'mg',
      bodyWeightType: null,
    },
    {
      value: 'codeine',
      label: 'Codeine',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: [0.5, 1] }
      ],
      unit: 'mg',
      bodyWeightType: 'AdjBW',
    },
    {
      value: 'dextromethorphan',
      label: 'Dextromethorphan',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: 0.33 }
      ],
      unit: 'mg',
      bodyWeightType: 'TBW',
    },
    {
      value: 'glyceryl_guaiacolate',
      label: 'Glyceryl Guaiacolate',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: 3 }, // <2yr
        { ageMonth: 24, min: 0, max: null, coef: 100 }, // 2-5yr
        { ageMonth: 72, min: 0, max: null, coef: 200 }, // 6-11yr
        { ageMonth: 144, min: 0, max: null, coef: 400 }, // >12yr
      ],
      unit: 'mg',
      bodyWeightType: 'TBW',
    },
    {
      value: 'pseudoephedrine',
      label: 'Pseudoephedrine',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: [0.75, 1.25] }
      ],
      unit: 'mg',
      bodyWeightType: 'AdjBW',
    }
  ],
  "Analgesics & Antipyretics": [
    {
      value: 'acetaminophen',
      label: 'Acetaminophen',
      constraints: [{ ageMonth: 0, min: 0, max: null, coef: [10, 15] }],
      unit: 'mg',
      bodyWeightType: 'IBW',
    },
    {
      value: 'fentanyl',
      label: 'Fentanyl',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: 4 },
        { ageMonth: 12, min: 0, max: null, coef: 2 },
      ],
      unit: 'mcg',
      bodyWeightType: 'AdjBW',
    },
    {
      value: 'mefenamic_acid',
      label: 'Mefenamic Acid',
      constraints: [
        { ageMonth: 168, min: 0, max: null, coef: 500 }
      ],
      unit: 'mg',
      bodyWeightType: null,
      notes: 'In older children.'
    },
    {
      value: 'methadone',
      label: 'Methadone',
      constraints: [
        { ageMonth: 0, min: 0, max: 10, coef: 0.175 }
      ],
      unit: 'mg',
      bodyWeightType: 'AdjBW',
      notes: 'Opiate dependence 20-120 mg/day in adolescents.'
    },
    {
      value: 'morphine',
      label: 'Morphine',
      constraints: [
        { ageMonth: 0, min: 0, max: 15, coef: 0.1 }
      ],
      unit: 'mg',
      bodyWeightType: 'IBW',
      notes: 'Continuous 0.025-2 mg/kg/hr.'
    },
    {
      value: 'pethidine',
      label: 'Pethidine',
      constraints: [
        { ageMonth: 0, min: 0, max: 100, coef: 2 }
      ],
      unit: 'mg',
      bodyWeightType: 'IBW',
    },
    {
      value: 'tramadol',
      label: 'Tramadol',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: 2 }
      ],
      unit: 'mg',
      bodyWeightType: 'IBW',
    }
  ],
  "NSAIDs & Antirheumatics": [
    {
      value: 'diclofenac',
      label: 'Diclofenac',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: [0.67, 1] }
      ],
      unit: 'mg',
      bodyWeightType: 'TBW',
    },
    {
      value: 'hydroxychloroquine',
      label: 'Hydroxychloroquine',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: [1.5, 2.5] }
      ],
      unit: 'mg',
      bodyWeightType: 'IBW',
      notes: '10 mg/kg then followed by 5 mg/kg next 6 hr then OD for 2 days for malaria.'
    },
    {
      value: 'ibuprofen',
      label: 'Ibuprofen',
      constraints: [{ ageMonth: 0, min: 0, max: null, coef: [4, 10] }],
      unit: 'mg',
      bodyWeightType: 'AdjBW',
    },
    {
      value: 'indomethacin',
      label: 'Indomethacin',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: 1 }
      ],
      unit: 'mg',
      bodyWeightType: 'AdjBW',
    },
    {
      value: 'naproxen',
      label: 'Naproxen',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: 7 }
      ],
      unit: 'mg',
      bodyWeightType: 'AdjBW',
    },
    {
      value: 'piroxicam',
      label: 'Piroxicam',
      constraints: [
        { ageMonth: 0, min: 0, max: 15, coef: 0.3 }
      ],
      unit: 'mg',
      bodyWeightType: 'AdjBW',
    }
  ],
  "Gout Preparations": [
    {
      value: 'allopurinol',
      label: 'Allopurinol',
      constraints: [
        { ageMonth: 12, min: 0, max: 800, coef: 50 },
        { ageMonth: 72, min: 0, max: 800, coef: 100 },
      ],
      unit: 'mg',
      bodyWeightType: 'IBW',
      notes: 'If CrCl 10-50: q12-24hr; CrCl < 10: q 48-72hr.'
    },
    {
      value: 'probenecid',
      label: 'Probenecid',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: 10 }
      ],
      unit: 'mg',
      bodyWeightType: 'IBW',
    }
  ],
  "Antipsychotics & Tranquilizers": [
    {
      value: 'chlorpromazine_po',
      label: 'Chlorpromazine (PO)',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: 1 }
      ],
      unit: 'mg',
      bodyWeightType: 'IBW',
    },
    {
      value: 'diazepam_po',
      label: 'Diazepam (PO)',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: 0.25 }
      ],
      unit: 'mg',
      bodyWeightType: 'IBW',
      notes: 'Febrile seizure prophylaxis.'
    },
    {
      value: 'diazepam_iv_se',
      label: 'Diazepam (Status Epilepticus)',
      constraints: [{ ageMonth: 0, min: 0, max: 10, coef: 0.3 }],
      unit: 'mg',
      bodyWeightType: 'IBW',
      notes: 'For status epilepticus.'
    },
    {
      value: "dipotassium_clorazepate",
      label: "Dipotassium Clorazepate",
      constraints: [
        { ageMonth: 0, min: 0, max: 60, coef: 3.75 }
      ],
      unit: "mg",
      bodyWeightType: "IBW"
    },
    {
      value: 'haloperidol_po',
      label: 'Haloperidol (PO)',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: 0.16 } // 0.5mg/3kg
      ],
      unit: 'mg',
      bodyWeightType: null, // Dosing seems complex
    },
    {
      value: 'lorazepam',
      label: 'Lorazepam',
      constraints: [
        { ageMonth: 0, min: 0, max: 4, coef: 0.1 }
      ],
      unit: 'mg',
      bodyWeightType: 'IBW',
    },
    {
      value: 'thioridazine',
      label: 'Thioridazine',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: 1 }
      ],
      unit: 'mg',
      bodyWeightType: 'IBW',
    }
  ],
  "Hypnotics & Sedatives": [
    {
      value: 'midazolam_iv',
      label: 'Midazolam (IV)',
      constraints: [{ ageMonth: 0, min: 0, max: 5, coef: 0.2 }],
      unit: 'mg',
      bodyWeightType: 'IBW',
      notes: 'Infusion 1-2 mcg/kg/min.'
    },
    {
      value: 'midazolam_po',
      label: 'Midazolam (PO)',
      constraints: [
        { ageMonth: 0, min: 0, max: 15, coef: 0.7 }
      ],
      unit: 'mg',
      bodyWeightType: 'IBW',
    },
    {
      value: 'nitrazepam',
      label: 'Nitrazepam',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: 0.5 }
      ],
      unit: 'mg',
      bodyWeightType: 'IBW'
    },
    {
      value: 'phenobarbital_iv_loading',
      label: 'Phenobarbital (IV Loading)',
      constraints: [{ ageMonth: 0, min: 0, max: null, coef: 20 }],
      unit: 'mg',
      bodyWeightType: 'TBW',
    },
    {
      value: 'phenobarbital_po',
      label: 'Phenobarbital (PO)',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: 4 },
        { ageMonth: 1, min: 0, max: null, coef: 6 },
      ],
      unit: 'mg',
      bodyWeightType: 'TBW',
    }
  ],
  "Antiparkinsonism Drugs": [
    {
      value: 'benztropine',
      label: 'Benztropine',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: 0.05 }
      ],
      unit: 'mg',
      bodyWeightType: 'IBW',
    }
  ],
  "Anticonvulsants": [
    {
      value: 'carbamazepine',
      label: 'Carbamazepine',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: [2.5, 10] }
      ],
      unit: 'mg',
      bodyWeightType: 'AdjBW',
      notes: 'Can increase to 15-30 mg/kg/day.'
    },
    {
      value: 'clonazepam',
      label: 'Clonazepam',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: [0.003, 0.01] },
        { ageMonth: 120, min: 0, max: 20, coef: 0.5 }, // 1.5mg/3 = 0.5
      ],
      unit: 'mg',
      bodyWeightType: 'AdjBW',
      notes: 'Maintenance 0.05-0.2 mg/kg.'
    },
    {
      value: 'lamotrigine',
      label: 'Lamotrigine',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: 15 }
      ],
      unit: 'mg',
      bodyWeightType: 'AdjBW',
    },
    {
      value: 'valproate',
      label: 'Sodium Valproate',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: 5 }
      ],
      unit: 'mg',
      bodyWeightType: 'TBW',
      notes: 'Maintenance 30-60 mg/kg/day.'
    },
    {
      value: 'topiramate',
      label: 'Topiramate',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: 8 }
      ],
      unit: 'mg',
      bodyWeightType: 'AdjBW',
    },
    {
      value: 'vigabatrin',
      label: 'Vigabatrin',
      constraints: [
        { ageMonth: 0, min: 0, max: 4000, coef: 75 }
      ],
      unit: 'mg',
      bodyWeightType: 'AdjBW'
    }
  ],
  "Antihistamines & Antiallergics": [
    {
      value: 'brompheniramine',
      label: 'Brompheniramine',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: 0.5 }
      ],
      unit: 'mg',
      bodyWeightType: 'TBW',
    },
    {
      value: 'chlorpheniramine',
      label: 'Chlorpheniramine',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: 0.09 }
      ],
      unit: 'mg',
      bodyWeightType: 'TBW',
    },
    {
      value: 'cetirizine',
      label: 'Cetirizine',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: 0.25 }
      ],
      unit: 'mg',
      bodyWeightType: 'TBW',
    },
    {
      value: 'diphenhydramine',
      label: 'Diphenhydramine',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: 1.25 }
      ],
      unit: 'mg',
      bodyWeightType: 'TBW',
      notes: '1 mg/kg for dystonic.'
    },
    {
      value: 'hydroxyzine',
      label: 'Hydroxyzine',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: 0.5 }
      ],
      unit: 'mg',
      bodyWeightType: 'TBW',
    },
    {
      value: 'loratadine',
      label: 'Loratadine',
      constraints: [
        { ageMonth: 24, min: 0, max: null, coef: 5},
        { ageMonth: 144, min: 0, max: null, coef: 10 }
      ],
      unit: 'mg',
      bodyWeightType: null,
    },
    {
      value: 'promethazine',
      label: 'Promethazine',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: 1 }
      ],
      unit: 'mg',
      bodyWeightType: 'AdjBW',
      notes: '0.5 mg/kg/dose for motion sickness.'
    }
  ],
  "Antiemetics & Antivertigo Drugs": [
    {
      value: 'dimenhydrinate',
      label: 'Dimenhydrinate',
      constraints: [
        { ageMonth: 24, min: 0, max: null, coef: 25 },
        { ageMonth: 72, min: 0, max: null, coef: 50 },
      ],
      unit: 'mg',
      bodyWeightType: null,
    },
    {
      value: 'domperidone',
      label: 'Domperidone',
      constraints: [{ ageMonth: 0, min: 0, max: null, coef: 0.4 }],
      unit: 'mg',
      bodyWeightType: 'TBW',
    },
    {
      value: 'metoclopramide',
      label: 'Metoclopramide',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: 0.2 }
      ],
      unit: 'mg',
      bodyWeightType: 'IBW',
      notes: '0.4-0.8 mg/kg/day q6hr for GERD.'
    },
    {
      value: 'ondansetron_iv',
      label: 'Ondansetron (IV)',
      constraints: [{ ageMonth: 0, min: 0, max: null, coef: 0.15 }],
      unit: 'mg',
      bodyWeightType: 'TBW',
    }
  ],
  "CNS Stimulants & Nootropics": [
    {
      value: 'methylphenidate',
      label: 'Methylphenidate',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: 1 }
      ],
      unit: 'mg',
      bodyWeightType: 'AdjBW',
      notes: 'Start dose with 0.3 mg/kg.'
    }
  ],
  "Antidepressants": [
    {
      value: 'amitriptyline',
      label: 'Amitriptyline',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: 2 }
      ],
      unit: 'mg',
      bodyWeightType: 'AdjBW',
      notes: 'Start dose with 0.1 mg/kg.'
    },
    {
      value: 'fluoxetine',
      label: 'Fluoxetine',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: 20 }
      ],
      unit: 'mg',
      bodyWeightType: null,
    },
    {
      value: 'imipramine',
      label: 'Imipramine',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: 1.25 }
      ],
      unit: 'mg',
      bodyWeightType: 'AdjBW',
    }
  ],
  "Muscle Relaxants": [
    {
      value: 'atracurium',
      label: 'Atracurium',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: 0.4 }
      ],
      unit: 'mg',
      bodyWeightType: 'IBW'
    },
    {
      value: 'baclofen',
      label: 'Baclofen',
      constraints: [
        { ageMonth: 24, min: 0, max: 40, coef: 15 }
      ],
      unit: 'mg',
      bodyWeightType: null,
    },
    {
      value: 'methocarbamol',
      label: 'Methocarbamol',
      constraints: [
        { ageMonth: 0, min: 0, max: 1800, coef: 15 }
      ],
      unit: 'mg',
      bodyWeightType: 'AdjBW'
    },
    {
      value: 'pancuronium',
      label: 'Pancuronium',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: 0.1 }
      ],
      unit: 'mg',
      bodyWeightType: 'AdjBW'
    },
    {
      value: 'succinyl_choline',
      label: 'Succinyl Choline',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: 2 }
      ],
      unit: 'mg',
      bodyWeightType: 'AdjBW'
    },
    {
      value: 'tolperisone',
      label: 'Tolperisone',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: 50 }
      ],
      unit: 'mg',
      bodyWeightType: 'AdjBW'
    }
  ],
  "Cholinergics & Anticholinergics": [
    {
      value: 'neostigmine',
      label: 'Neostigmine',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: 0.04 }
      ],
      unit: 'mg',
      bodyWeightType: 'AdjBW',
      notes: 'For diagnosis.'
    },
    {
      value: 'pyridostigmine',
      label: 'Pyridostigmine',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: 60 }
      ],
      unit: 'mg',
      bodyWeightType: 'AdjBW'
    }
  ],
  "Antibiotics - Aminoglycosides": [
    {
      value: 'amikacin',
      label: 'Amikacin',
      constraints: [{ ageMonth: 1, min: 0, max: null, coef: 7.5 }],
      unit: 'mg',
      bodyWeightType: 'AdjBW',
    },
    {
      value: 'gentamicin',
      label: 'Gentamicin',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: 2.5}, // <7d, <1200g
        { ageMonth: 0.25, min: 0, max: null, coef: 2.5}, // <7d, >1200g
        { ageMonth: 1, min: 0, max: null, coef: 2.5}, // >7d
        { ageMonth: 60, min: 0, max: null, coef: 2.5} // >5yr
      ],
      unit: 'mg',
      bodyWeightType: 'AdjBW',
    },
    {
      value: 'kanamycin',
      label: 'Kanamycin',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: 7.5 },
        { ageMonth: 1, min: 0, max: null, coef: 10 },
      ],
      unit: 'mg',
      bodyWeightType: 'AdjBW'
    },
    {
      value: 'neomycin',
      label: 'Neomycin',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: 25 },
        { ageMonth: 1, min: 0, max: null, coef: 15 },
      ],
      unit: 'mg',
      bodyWeightType: 'AdjBW'
    },
    {
      value: 'netilmicin',
      label: 'Netilmicin',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: 2.5 },
        { ageMonth: 1, min: 0, max: null, coef: 2.5 },
      ],
      unit: 'mg',
      bodyWeightType: 'AdjBW'
    },
    {
      value: 'tobramycin',
      label: 'Tobramycin',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: 2.5 },
        { ageMonth: 1, min: 0, max: null, coef: 2.5 },
      ],
      unit: 'mg',
      bodyWeightType: 'AdjBW'
    },
    {
      value: 'streptomycin',
      label: 'Streptomycin',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: 30 },
        { ageMonth: 12, min: 0, max: null, coef: 40 },
      ],
      unit: 'mg',
      bodyWeightType: 'AdjBW'
    }
  ],
  "Antibiotics - Cephalosporins": [
    {
      value: 'cefaclor',
      label: 'Cefaclor',
      constraints: [ { ageMonth: 0, min: 0, max: null, coef: 13.3 } ],
      unit: 'mg',
      bodyWeightType: 'TBW',
    },
    {
      value: 'cefazolin',
      label: 'Cefazolin',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: 20 },
        { ageMonth: 0.25, min: 0, max: null, coef: 30 }
      ],
      unit: 'mg',
      bodyWeightType: 'TBW',
    },
    {
      value: 'cefdinir',
      label: 'Cefdinir',
      constraints: [
        { ageMonth: 6, min: 0, max: 600, coef: 14 }
      ],
      unit: 'mg',
      bodyWeightType: 'TBW'
    },
    {
      value: 'cefepime',
      label: 'Cefepime',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: 50 }
      ],
      unit: 'mg',
      bodyWeightType: 'TBW'
    },
    {
      value: 'cefixime',
      label: 'Cefixime',
      constraints: [ { ageMonth: 0, min: 0, max: null, coef: 4 } ],
      unit: 'mg',
      bodyWeightType: 'TBW',
    },
    {
      value: 'cefoperazone',
      label: 'Cefoperazone',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: 75 }
      ],
      unit: 'mg',
      bodyWeightType: 'TBW'
    },
    {
      value: 'cefotaxime',
      label: 'Cefotaxime',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: 50 },
        { ageMonth: 0.25, min: 0, max: null, coef: 75 },
        { ageMonth: 1, min: 0, max: null, coef: 50 }
      ],
      unit: 'mg',
      bodyWeightType: 'TBW',
    },
    {
      value: 'cefoxitin',
      label: 'Cefoxitin',
      constraints: [
        { ageMonth: 0, min: 0, max: 12000, coef: 40 }
      ],
      unit: 'mg',
      bodyWeightType: 'TBW'
    },
    {
      value: 'cefpodoxime',
      label: 'Cefpodoxime',
      constraints: [
        { ageMonth: 6, min: 0, max: 800, coef: 10 }
      ],
      unit: 'mg',
      bodyWeightType: 'TBW'
    },
    {
      value: 'cefpirome',
      label: 'Cefpirome',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: 75 }
      ],
      unit: 'mg',
      bodyWeightType: 'TBW'
    },
    {
      value: 'cefprozil',
      label: 'Cefprozil',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: 15 }
      ],
      unit: 'mg',
      bodyWeightType: 'TBW'
    },
    {
      value: 'ceftazidime',
      label: 'Ceftazidime',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: 50 },
        { ageMonth: 1, min: 0, max: null, coef: 50 }
      ],
      unit: 'mg',
      bodyWeightType: 'TBW',
    },
    {
      value: 'ceftibuten',
      label: 'Ceftibuten',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: 9 }
      ],
      unit: 'mg',
      bodyWeightType: 'TBW'
    },
    {
      value: 'ceftriaxone',
      label: 'Ceftriaxone',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: 50 },
        { ageMonth: 0.25, min: 0, max: null, coef: 75 }
      ],
      unit: 'mg',
      bodyWeightType: 'TBW',
    },
    {
      value: 'cefuroxime',
      label: 'Cefuroxime',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: 15 }
      ],
      unit: 'mg',
      bodyWeightType: 'TBW'
    },
    {
      value: 'cephalexin',
      label: 'Cephalexin',
      constraints: [ { ageMonth: 0, min: 0, max: null, coef: 25 } ],
      unit: 'mg',
      bodyWeightType: 'TBW',
    }
  ],
  "Antibiotics - Chloramphenicol": [
    {
      value: 'chloramphenicol',
      label: 'Chloramphenicol',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: 25 },
        { ageMonth: 1, min: 0, max: null, coef: 25 }
      ],
      unit: 'mg',
      bodyWeightType: 'IBW',
    }
  ],
  "Antibiotics - Macrolides": [
    {
      value: 'azithromycin',
      label: 'Azithromycin',
      constraints: [ { ageMonth: 0, min: 0, max: null, coef: 10 } ],
      unit: 'mg',
      bodyWeightType: 'TBW',
    },
    {
      value: 'clarithromycin',
      label: 'Clarithromycin',
      constraints: [ { ageMonth: 0, min: 0, max: null, coef: 7.5 } ],
      unit: 'mg',
      bodyWeightType: 'TBW',
    },
    {
      value: 'erythromycin',
      label: 'Erythromycin',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: 10 },
        { ageMonth: 0.25, min: 0, max: null, coef: 10 },
        { ageMonth: 1, min: 0, max: null, coef: 12.5 }
      ],
      unit: 'mg',
      bodyWeightType: 'TBW',
    },
    {
      value: 'midecamycin',
      label: 'Midecamycin',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: 10 }
      ],
      unit: 'mg',
      bodyWeightType: 'TBW'
    },
    {
      value: 'roxithromycin',
      label: 'Roxithromycin',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: 4 }
      ],
      unit: 'mg',
      bodyWeightType: 'TBW'
    },
    {
      value: 'spiramycin',
      label: 'Spiramycin',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: 50 }
      ],
      unit: 'mg',
      bodyWeightType: 'TBW'
    }
  ],
  "Antibiotics - Penicillins": [
    {
      value: 'amoxicillin',
      label: 'Amoxicillin',
      constraints: [{ ageMonth: 0, min: 0, max: null, coef: 17 }],
      unit: 'mg',
      bodyWeightType: 'TBW',
      notes: '80-90 mg/kg/day for drug resistant streptococcus pneumoniae.'
    },
    {
      value: 'amox_clav',
      label: 'Amoxicillin/Clavulanate',
      constraints: [{ ageMonth: 0, min: 0, max: null, coef: 13.3 }],
      unit: 'mg',
      bodyWeightType: 'TBW',
      notes: 'CrCl 15-30 q12-18hr; CrCl 5-15 q24-36hr; CrCl < 5 q48hr.'
    },
    {
      value: 'ampicillin',
      label: 'Ampicillin',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: 25 },
        { ageMonth: 1, min: 0, max: null, coef: 50 },
      ],
      unit: 'mg',
      bodyWeightType: 'TBW'
    },
    {
      value: 'benzathine_penicillin_g',
      label: 'Benzathine Penicillin G',
      constraints: [
        { ageMonth: 0, min: 0, max: 1200000, coef: 25000 }
      ],
      unit: 'U',
      bodyWeightType: 'TBW',
      notes: 'For upper respiratory tract infection or rheumatic fever prophylaxis.'
    },
    {
      value: 'cloxacillin',
      label: 'Cloxacillin',
      constraints: [ { ageMonth: 0, min: 0, max: null, coef: 25 } ],
      unit: 'mg',
      bodyWeightType: 'TBW',
    },
    {
      value: 'dicloxacillin',
      label: 'Dicloxacillin',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: 12.5 }
      ],
      unit: 'mg',
      bodyWeightType: 'TBW'
    },
    {
      value: 'penicillin_g_sodium',
      label: 'Penicillin G Sodium',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: 25000 },
        { ageMonth: 1, min: 0, max: null, coef: 50000 },
      ],
      unit: 'U',
      bodyWeightType: 'TBW'
    },
    {
      value: 'piperacillin',
      label: 'Piperacillin',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: 50 },
        { ageMonth: 1, min: 0, max: null, coef: 75 },
      ],
      unit: 'mg',
      bodyWeightType: 'TBW'
    },
    {
      value: 'procaine_penicillin',
      label: 'Procaine Penicillin',
      constraints: [
        { ageMonth: 0, min: 0, max: 4800000, coef: 50000 }
      ],
      unit: 'U',
      bodyWeightType: 'TBW'
    },
    {
      value: 'tazocin',
      label: 'Tazocin (Piperacillin/Tazobactam)',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: 80 }
      ],
      unit: 'mg',
      bodyWeightType: 'TBW'
    }
  ],
  "Antibiotics - Quinolones": [
    {
      value: 'ciprofloxacin',
      label: 'Ciprofloxacin',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: 10 }
      ],
      unit: 'mg',
      bodyWeightType: 'AdjBW'
    },
    {
      value: 'norfloxacin',
      label: 'Norfloxacin',
      constraints: [
        { ageMonth: 0, min: 0, max: 400, coef: 20 }
      ],
      unit: 'mg',
      bodyWeightType: 'AdjBW'
    },
    {
      value: 'ofloxacin',
      label: 'Ofloxacin',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: 7.5 }
      ],
      unit: 'mg',
      bodyWeightType: 'AdjBW'
    }
  ],
  "Antibiotics - Tetracyclines": [
    {
      value: 'doxycycline',
      label: 'Doxycycline',
      constraints: [ { ageMonth: 0, min: 0, max: null, coef: 2 } ],
      unit: 'mg',
      bodyWeightType: 'IBW',
    },
    {
      value: 'tetracycline',
      label: 'Tetracycline',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: 12.5 }
      ],
      unit: 'mg',
      bodyWeightType: 'IBW'
    }
  ],
  "Antibiotics - Antifungals": [
    {
      value: 'amphotericin_b',
      label: 'Amphotericin B',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: 1 }
      ],
      unit: 'mg',
      bodyWeightType: 'TBW'
    },
    {
      value: 'fluconazole',
      label: 'Fluconazole',
      constraints: [
        { ageMonth: 12, min: 0, max: null, coef: 6 },
        { ageMonth: 60, min: 0, max: null, coef: 12 },
      ],
      unit: 'mg',
      bodyWeightType: 'TBW',
    },
    {
      value: 'griseofulvin',
      label: 'Griseofulvin',
      constraints: [ { ageMonth: 0, min: 0, max: null, coef: 15 } ],
      unit: 'mg',
      bodyWeightType: 'AdjBW',
    },
    {
      value: 'ketoconazole',
      label: 'Ketoconazole',
      constraints: [ { ageMonth: 0, min: 0, max: null, coef: 10 } ],
      unit: 'mg',
      bodyWeightType: 'TBW',
    },
    {
      value: 'nystatin',
      label: 'Nystatin',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: 100000 },
        { ageMonth: 1, min: 0, max: null, coef: 200000 },
        { ageMonth: 12, min: 0, max: null, coef: 500000 },
      ],
      unit: 'U',
      bodyWeightType: null,
    }
  ],
  "Antibiotics - Combinations": [
    {
      value: 'sulfamethoxazole_trimethoprim',
      label: 'Sulfamethoxazole+Trimethoprim',
      constraints: [ { ageMonth: 0, min: 0, max: null, coef: 6 } ],
      unit: 'mg',
      bodyWeightType: 'AdjBW',
      notes: 'Dose based on Trimethoprim. Severe infection or PCP: 15-20 mg/kg/day divide q 6 hr.'
    }
  ],
  "Antibiotics - Other": [
    {
      value: 'aztreonam',
      label: 'Aztreonam',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: 30 },
        { ageMonth: 1, min: 0, max: null, coef: [22.5, 40] }
      ],
      unit: 'mg',
      bodyWeightType: 'IBW'
    },
    {
      value: 'clindamycin',
      label: 'Clindamycin',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: 5 },
        { ageMonth: 1, min: 0, max: null, coef: [2, 6.7] }
      ],
      unit: 'mg',
      bodyWeightType: 'TBW',
    },
    {
      value: 'colistin_methate',
      label: 'Colistin Methate',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: [16667, 33333] }
      ],
      unit: 'U',
      bodyWeightType: 'IBW'
    },
    {
      value: 'fosfomycin',
      label: 'Fosfomycin',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: [16.7, 33.3] }
      ],
      unit: 'ml',
      bodyWeightType: 'IBW'
    },
    {
      value: 'imipenem',
      label: 'Imipenem',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: [15, 25] }
      ],
      unit: 'mg',
      bodyWeightType: 'TBW'
    },
    {
      value: 'lincomycin',
      label: 'Lincomycin',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: [3.3, 7.5] }
      ],
      unit: 'mg',
      bodyWeightType: 'AdjBW'
    },
    {
      value: 'meropenem',
      label: 'Meropenem',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: 20 }
      ],
      unit: 'mg',
      bodyWeightType: 'TBW',
      notes: "40 mg/kg for meningitis"
    },
    {
      value: 'sulperazon',
      label: 'Sulperazon',
      constraints: [
        { ageMonth: 0, min: 0, max: 160, coef: 80 }
      ],
      unit: 'mg',
      bodyWeightType: 'AdjBW'
    },
    {
      value: 'vancomycin',
      label: 'Vancomycin',
      constraints: [{ ageMonth: 1, min: 0, max: null, coef: [6.7, 10] }],
      unit: 'mg',
      bodyWeightType: 'IBW',
      notes: 'CrCl > 90 q6hr; CrCl 70-89 q8hr; CrCl 46-69 q12hr; CrCl 30-45 q18hr; CrCl 15-29 q24hr.'
    }
  ],
  "Antidotes & Detoxifying Agents": [
    {
      value: 'calcium_edta',
      label: 'Calcium EDTA',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: 1000 }
      ],
      unit: 'mg',
      bodyWeightType: 'IBW',
      notes: 'Per m2/day.'
    },
    {
      value: 'calcium_folinate',
      label: 'Calcium Folinate',
      constraints: [{ ageMonth: 0, min: 0, max: null, coef: 15 }],
      unit: 'mg',
      bodyWeightType: 'IBW',
      notes: 'Use for 3 days; combine with methotrexate.'
    },
    {
      value: 'calcium_polystyrene_sulfonate',
      label: 'Calcium Polystyrene Sulfonate',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: [0.3, 0.6] }
      ],
      unit: 'g',
      bodyWeightType: 'IBW',
      notes: 'Diluted in sorbitol 70% 2ml/kg.'
    },
    {
      value: 'deferoxamine_im',
      label: 'Deferoxamine (IM)',
      constraints: [{ ageMonth: 0, min: 0, max: null, coef: 90 }],
      unit: 'mg',
      bodyWeightType: 'IBW',
    },
    {
      value: 'dimercaprol',
      label: 'Dimercaprol',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: [2.5, 4] }
      ],
      unit: 'mg',
      bodyWeightType: 'AdjBW',
      notes: 'For lead poisoning, combined with Calcium EDTA.'
    },
    {
      value: 'flumazenil',
      label: 'Flumazenil',
      constraints: [{ ageMonth: 0, min: 0, max: 1000, coef: [5, 10] }],
      unit: 'mcg',
      bodyWeightType: 'IBW',
      notes: 'Antidote for benzodiazepine.'
    },
    {
      value: 'glucagon_im',
      label: 'Glucagon (IM)',
      constraints: [
        { ageMonth: 0, min: 0, max: 1, coef: 0.3 }, // Infant
        { ageMonth: 1, min: 0, max: 1, coef: [0.025, 0.1] }  // Children
      ],
      unit: 'mg',
      bodyWeightType: 'IBW',
    },
    {
      value: 'penicillamine',
      label: 'Penicillamine',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: 250 },
        { ageMonth: 6, min: 0, max: null, coef: 250 },
      ],
      unit: 'mg',
      bodyWeightType: null,
    },
    {
      value: 'pralidoxime',
      label: 'Pralidoxime',
      constraints: [
        { ageMonth: 0, min: 0, max: null, coef: 50 }
      ],
      unit: 'mg',
      bodyWeightType: 'IBW',
      notes: 'q1-2hr if muscle weakness; q10-12hr for cholinergic syndrome.'
    },
    {
      value: 'protamine_sulfate',
      label: 'Protamine Sulfate',
      constraints: [
        { ageMonth: 0, min: 0, max: 50, coef: 1 }
      ],
      unit: 'mg',
      bodyWeightType: 'AdjBW',
      notes: '1 mg for neutralizing 100 units of heparin.'
    }
  ],
  "Hemostatics": [
    {
      value: 'estrogen',
      label: 'Estrogen',
      constraints: [ { ageMonth: 0, min: 0, max: null, coef: 50 } ],
      unit: 'mg',
      bodyWeightType: 'AdjBW',
      notes: "In menorrhagia, DHF."
    },
    {
      value: 'somatostatin_sc',
      label: 'Somatostatin (SC)',
      constraints: [ { ageMonth: 0, min: 0, max: null, coef: 10 } ],
      unit: 'mcg',
      bodyWeightType: 'AdjBW',
      notes: "In tumor secreting hormone. IV bolus 1-2 mcg/kg followed by continuous IV infusion 1-2 mcg/kg/hr."
    },
    {
      value: 'tranexamic_acid_iv',
      label: 'Tranexamic Acid (IV)',
      constraints: [ { ageMonth: 0, min: 0, max: null, coef: 10 } ],
      unit: 'mg',
      bodyWeightType: 'IBW',
    },
    {
      value: 'tranexamic_acid_po',
      label: 'Tranexamic Acid (PO)',
      constraints: [ { ageMonth: 0, min: 0, max: null, coef: [6.25, 8.33] } ],
      unit: 'mg',
      bodyWeightType: 'IBW',
      notes: "For 2-7 days."
    },
    {
      value: 'vitamin_k1',
      label: 'Vitamin K1',
      constraints: [ { ageMonth: 0, min: 0, max: null, coef: 1 } ],
      unit: 'mg',
      bodyWeightType: 'TBW',
      notes: "IM dose. For warfarin antidote (INR > 1.5): 0.5-2mg SC, or 2-5mg IV slowly."
    }
  ],
  "Anticoagulants": [
    {
      value: 'heparin_sodium',
      label: 'Heparin Sodium',
      constraints: [ { ageMonth: 0, min: 0, max: null, coef: 75 } ],
      unit: 'units',
      bodyWeightType: 'AdjBW',
      notes: "Loading dose in 10 mins. Continue IV infusion: <=1 years 28 unit/kg/hr; >1 year 20 units/kg/hr."
    },
    {
      value: 'enoxaparin',
      label: 'Enoxaparin (LMWH)',
      constraints: [ { ageMonth: 0, min: 0, max: null, coef: 1 } ],
      unit: 'mg',
      bodyWeightType: 'AdjBW',
    },
    {
      value: 'warfarin',
      label: 'Warfarin',
      constraints: [ { ageMonth: 0, min: 0, max: 10, coef: 0.2 } ],
      unit: 'mg',
      bodyWeightType: 'IBW',
      notes: "Dose for 1st day. Adjust for optimal INR."
    }
  ]
};
