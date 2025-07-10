import React from "react";
import { useState } from "react";
import Select, { components, GroupHeadingProps, SelectInstance } from "react-select";
import { DrugOption, groupedDrugOptions } from "./drugData";
import { reactSelectStyles } from "@/styles/reactSelectStyles";

// Define the type for body weight calculation
type BodyWeightType = "TBW" | "IBW" | "AdjBW";

// Define the structure for grouped options used by react-select
interface GroupedOption {
  label: string; // Standard string label for the group
  options: DrugOption[];
}

// Define the props for the MultiSelectSearchBox component
interface MultiSelectSearchBoxProps {
  value: DrugOption[]; // The array of selected drug options
  onChange: (selectedOptions: readonly DrugOption[]) => void; // Callback with the new array
}

// const animatedComponents = makeAnimated();

// --- Custom Group Heading Component ---
const CustomGroupHeading = (props: GroupHeadingProps<DrugOption, true, GroupedOption>) => {
  const { selectProps, data } = props;
  // Get current value and onChange from react-select props (passed down from Controller)
  const currentValues: readonly DrugOption[] = (selectProps.value as readonly DrugOption[]) || [];
  const onChange = selectProps.onChange as (newValue: readonly DrugOption[]) => void;
  const groupOptions = data.options;

  // Check if all options in this group are currently selected
  const allSelected = groupOptions.every(option => 
    currentValues.some(val => val.value === option.value)
  );

  const handleSelectAll = () => {
    const groupOptionValues = groupOptions.map(opt => opt.value);
    let newValue:
      | readonly DrugOption[] 
      | (readonly DrugOption[]) = [];

    if (allSelected) {
      // Deselect all from this group: filter them out
      newValue = currentValues.filter(val => !groupOptionValues.includes(val.value));
    } else {
      // Select all from this group: add missing ones
      const optionsToAdd = groupOptions.filter(option => 
        !currentValues.some(val => val.value === option.value)
      );
      newValue = [...currentValues, ...optionsToAdd];
    }
    onChange(newValue);
  };

  return (
    <div className="flex items-center justify-between border-b border-base-200 px-4 py-2">
      {/* Default GroupHeading rendering from react-select */}
      <components.GroupHeading {...props} />
      <button
        type="button"
        onClick={handleSelectAll}
        className="text-xs font-semibold text-primary hover:text-primary-focus focus:outline-none"
      >
        {allSelected ? 'Deselect All' : 'Select All'}
      </button>
    </div>
  );
};

// Wrap component with React.forwardRef
const MultiSelectSearchBox = React.forwardRef<
  SelectInstance<DrugOption, true, GroupedOption>, // Use specific type for ref
  MultiSelectSearchBoxProps
>(
  ({ value, onChange }, ref) => {
    const options: GroupedOption[] = Object.entries(groupedDrugOptions).map(([label, drugs]) => ({
      label,
      options: drugs,
    }));

    return (
      <Select<DrugOption, true, GroupedOption>
        isMulti
        name="drugs"
        placeholder="Select..."
        options={options}
        value={value}
        onChange={onChange}
        closeMenuOnSelect={false}
        blurInputOnSelect={false}
        components={{ GroupHeading: CustomGroupHeading }}
        styles={reactSelectStyles}
        ref={ref} // Pass the forwarded ref
      />
    );
  }
);

MultiSelectSearchBox.displayName = "MultiSelectSearchBox";

export default MultiSelectSearchBox;

// export function App() {
//   const [value, setValue] = useState([]);
//   let options = [
//     createGroup("resusitation", group1Options, setValue)
//   ];

//   return (
//     // <div className="App">
//     //   <h1>Hello CodeSandbox</h1>
//       <Select
//     isMulti
//     name="drugs"
//     options={options}
//     closeMenuOnSelect={false}
//     blurInputOnSelect={false}
//     // components={animatedComponents}
//     className="basic-multi-select"
//     classNames={{ 
//     option: () => "text-black",}}
//     onChange={props.onChange}
//     classNamePrefix="select"
//   />
//       {/* <Select
//         // components={{GroupHeading: () => <div onClick={() => console.log('i am a group and i am clickable .. yay!')}>My Group Heading</div>}}
//         onChange={option => {
//           console.log(option);
//           return setValue(option);
//         }}
//         closeMenuOnSelect={false}
//         isMulti
//         menuIsOpen={true}
//         options={options}
//         value={value}
//       /> */}
//     // </div>
//   );
// }
