import { StylesConfig } from "react-select";

export const reactSelectStyles: StylesConfig<any, any, any> = {
  control: (base, { isFocused }) => ({
    ...base,
    minHeight: "3rem",
    borderWidth: "1px",
    borderRadius: "var(--rounded-btn, 0.5rem)",
    borderColor: isFocused ? "hsl(var(--p))" : "hsl(var(--b2))",
    boxShadow: isFocused ? "0 0 0 1px hsl(var(--p))" : "none",
    "&:hover": {
      borderColor: isFocused ? "hsl(var(--p))" : "hsl(var(--b2))",
    },
    backgroundColor: "hsl(var(--b1))",
    color: "hsl(var(--bc))",
  }),
  input: (base) => ({
    ...base,
    color: "hsl(var(--bc))",
  }),
  singleValue: (base) => ({
    ...base,
    color: "hsl(var(--bc))",
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "hsl(var(--b1))",
    borderRadius: "var(--rounded-box, 1rem)",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  }),
  option: (base, { isSelected, isFocused }) => ({
    ...base,
    backgroundColor: isSelected
      ? "hsl(var(--p))"
      : isFocused
      ? "hsl(var(--p) / 0.1)"
      : "transparent",
    color: isSelected ? "hsl(var(--pc))" : "hsl(var(--bc))",
    "&:active": {
      backgroundColor: "hsl(var(--p))",
      color: "hsl(var(--pc))",
    },
  }),
  groupHeading: (base) => ({
    ...base,
    color: "hsl(var(--bc) / 0.5)",
    fontWeight: "bold",
    fontSize: "0.75rem",
    textTransform: "uppercase",
    padding: "0.25rem 0.5rem",
    margin: 0,
  }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: "hsl(var(--n))",
    color: "hsl(var(--nc))",
    borderRadius: "var(--rounded-badge, 1.9rem)",
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: "hsl(var(--nc))",
  }),
  multiValueRemove: (base) => ({
    ...base,
    color: "hsl(var(--nc))",
    "&:hover": {
      backgroundColor: "hsl(var(--n-focus))",
      color: "hsl(var(--nc))",
    },
  }),
}; 