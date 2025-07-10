import Select, { ActionMeta, SingleValue, SelectInstance } from "react-select";
import React from "react";
import { reactSelectStyles } from "@/styles/reactSelectStyles";

// Define the structure for the options used in the select
interface SexOption {
  value: string;
  label: string;
}

// Define the props for the SexSelectBox component
interface SexSelectBoxProps {
  value: string; // The selected sex string ("Male" or "Female" or "")
  onChange: (value: string) => void; // Callback function passing the string value
  classNames?: string; // Optional CSS class names
  // Add optional props needed by react-hook-form Controller
  name?: string; // react-select uses this
  onBlur?: () => void;
  ref?: React.Ref<any>; // Adjust type as needed for react-select instance
}

const sexOptions: SexOption[] = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
];

// Wrap component definition with React.forwardRef
const SexSelectBox = React.forwardRef<
  SelectInstance<SexOption>, // Use specific type for ref
  SexSelectBoxProps
>(
  ({
    value,
    onChange,
    classNames,
    name,
    onBlur,
  },
  ref // Receive the ref from forwardRef
) => {
  // Find the full option object corresponding to the current string value
  const selectedOption = sexOptions.find(option => option.value === value) || null;

  // Handle change from react-select, extract the string value
  const handleChange = (option: SingleValue<SexOption>) => {
    onChange(option ? option.value : ""); // Pass the string value or empty string
  };

  return (
    <Select<SexOption> // Specify the option type for Select
      placeholder="Select..."
      className="basic-single"
      classNamePrefix="select"
      name={name} // Pass name prop
      options={sexOptions} // Use the defined options array
      value={selectedOption} // Pass the full option object or null to react-select
      onChange={handleChange} // Use the wrapped handler
      onBlur={onBlur} // Pass onBlur prop
      ref={ref} // Pass the forwarded ref to the Select component
      // Apply dynamic styles based on props
      styles={reactSelectStyles}
      // Apply dynamic classNames if provided
      classNames={{
        control: () => (classNames ? classNames : ""),
      }}
    />
  );
});

// Add display name for better debugging
SexSelectBox.displayName = "SexSelectBox";

export default SexSelectBox;