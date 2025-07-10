import re
try:
    from json_repair import loads as json_repair_loads
except ImportError:
    print("Error: `json_repair` library not found.")
    print("Please install it by running: pip install json_repair")
    exit()

def normalize_drug_name(name):
    """Normalizes drug names for a more reliable comparison."""
    norm = name.lower()
    norm = re.sub(r"\(.*\)", "", norm)
    norm = re.sub(r"\s*\+\s*", "/", norm)
    norm = norm.replace("amoxycillin", "amoxicillin")
    norm = norm.replace("dextrometrophan", "dextromethorphan")
    norm = norm.replace("meropenam", "meropenem")
    norm = norm.replace("tranxenemic", "tranexamic")
    norm = norm.replace("ipratopium", "ipratropium")
    norm = norm.replace("sulphate", "sulfate")
    norm = norm.replace("magnesemia", "magnesia")
    norm = norm.replace("ephredrine", "ephedrine")
    
    suffixes = [
        "besylate", "hcl", "dihydrochloride", "diHCl", "acetate", "dihydrate", 
        "sodium", "citrate", "tartrate", "bromide", "methate", "sulfonate", "g"
    ]
    for suffix in suffixes:
        norm = re.sub(r'\s+' + suffix + r'$', '', norm, flags=re.IGNORECASE)

    norm = re.sub(r"[^a-z0-9/]", "", norm)
    return norm.strip()

def parse_body_weight_type(bwt_string):
    """Parses the body weight type string from the CSV."""
    bwt_lower = bwt_string.lower()
    if "ideal" in bwt_lower:
        return "IBW"
    if "actual" in bwt_lower or "body surface area" in bwt_lower:
        return "TBW"
    if "adjusted" in bwt_lower:
        return "AdjBW"
    if "non-weight dependent" in bwt_lower:
        return None
    return "UNKNOWN"

def parse_unit(dose_string):
    """Parses the unit from a dose string in the CSV."""
    dose_lower = dose_string.lower()
    if "mg/kg" in dose_lower or "mg/day" in dose_lower or "mg/dose" in dose_lower: return "mg"
    if "mcg/kg" in dose_lower or "mcg/day" in dose_lower or "mcg/dose" in dose_lower: return "mcg"
    if "g/kg" in dose_lower or "gm/day" in dose_lower: return "g"
    if "ml/kg" in dose_lower or "ml/day" in dose_lower: return "ml"
    if "unit" in dose_lower: return "units" # Normalize to plural
    if "tab" in dose_lower: return "tab"
    if "capsule" in dose_lower: return "capsules" # Normalize to plural
    if "suppository" in dose_lower: return "suppository"
    if "puff" in dose_lower: return "puff"
    return None

# --- Load drugData.ts ---
try:
    with open("components/drugData.ts", "r") as f:
        content = f.read()
except FileNotFoundError:
    print("Error: components/drugData.ts not found.")
    exit()
match = re.search(r"export const groupedDrugOptions: GroupedDrugOptions = (\{.*?\});", content, re.DOTALL)
if not match:
    print("Could not find groupedDrugOptions in drugData.ts")
    exit()
ts_data_str = match.group(1)
try:
    ts_data = json_repair_loads(ts_data_str)
except Exception as e:
    print(f"Failed to parse drugData.ts content. Error: {e}")
    exit()
ts_drugs = {normalize_drug_name(drug["label"]): drug for category in ts_data.values() for drug in category}

# --- Load drug_info.csv ---
try:
    with open("drug_info.csv", "r") as f:
        lines = f.readlines()
except FileNotFoundError:
    print("Error: drug_info.csv not found.")
    exit()

csv_drugs = {}
for line in lines:
    parts = [p.strip() for p in line.split(',')]
    if len(parts) < 4: continue
    
    drug_name = parts[0]
    bwt_string = parts[1]
    dose_string = parts[3]

    if not drug_name or not bwt_string or not dose_string: continue
    if any("off" in p.lower() for p in parts): continue

    is_primary_entry = (
        "weight" in bwt_string.lower() or
        "dependent" in bwt_string.lower() or
        "body surface area" in bwt_string.lower()
    )
    if not is_primary_entry: continue
    
    norm_name = normalize_drug_name(drug_name)
    if norm_name and norm_name not in csv_drugs:
        csv_drugs[norm_name] = {
            "original_name": drug_name,
            "bodyWeightType": parse_body_weight_type(bwt_string),
            "unit": parse_unit(dose_string)
        }

# --- Verification ---
mismatches = []
for norm_name, ts_drug in ts_drugs.items():
    if norm_name in csv_drugs:
        csv_drug = csv_drugs[norm_name]
        
        # Normalize units for comparison (e.g., "U" vs "units")
        ts_unit = ts_drug.get("unit")
        if ts_unit and "unit" in ts_unit.lower(): ts_unit = "units"
        if ts_unit and "capsule" in ts_unit.lower(): ts_unit = "capsules"

        csv_unit = csv_drug.get("unit")
        ts_bwt = ts_drug.get("bodyWeightType")
        csv_bwt = csv_drug.get("bodyWeightType")
        
        unit_mismatch = ts_unit and csv_unit and ts_unit != csv_unit
        bwt_mismatch = ts_bwt is not None and csv_bwt != "UNKNOWN" and ts_bwt != csv_bwt
        
        if unit_mismatch or bwt_mismatch:
            mismatches.append({
                "name": ts_drug["label"],
                "unit_ts": ts_unit, "unit_csv": csv_unit, "unit_mismatch": unit_mismatch,
                "bwt_ts": ts_bwt, "bwt_csv": csv_bwt, "bwt_mismatch": bwt_mismatch
            })

# --- Reporting ---
print("--- Verification of Units and Body Weight Types ---")
if not mismatches:
    print("\n[SUCCESS] No discrepancies found for units or body weight types.")
else:
    print(f"\n[INFO] Found {len(mismatches)} drugs with potential discrepancies:\n")
    for item in sorted(mismatches, key=lambda x: x["name"]):
        print(f"Drug: {item['name']}")
        if item['unit_mismatch']:
            print(f"  - Unit Mismatch: TS file is '{item['unit_ts']}', but CSV suggests '{item['unit_csv']}'.")
        if item['bwt_mismatch']:
            print(f"  - Body Weight Mismatch: TS file is '{item['bwt_ts']}', but CSV suggests '{item['bwt_csv']}'.")
        print("-" * 20)

print("\n--- End of Verification ---") 