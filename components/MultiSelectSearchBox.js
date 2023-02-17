import {React,useState} from "react";

import Select from "react-select";

// const animatedComponents = makeAnimated();

const MultiSelectSearchBox = (props) => {
  let options = [createGroup("resusitation", group1Options, props.onChange)];
  return(
  <Select
    isMulti
    name="drugs"
    options={options}
    closeMenuOnSelect={false}
    blurInputOnSelect={false}
    // components={animatedComponents}
    className="basic-multi-select"
    classNames={{ 
    option: () => "text-black",}}
    onChange={props.onChange}
    classNamePrefix="select"
    value={props.value}
    // menuIsOpen={true}
  />
)};
export default MultiSelectSearchBox;



const group1Options = [
  {
    value: "adenosine",
    label: "Adenosine",
    min: 0,
    max: 12,
    coef: 6,
    unit: "ml",
    bodyWeightType: "IBW",
  },
  {
    value: "adrenaline",
    label: "Adrenaline",
    min: 0,
    max: 1,
    coef: 0.1,
    unit: "ml",
    bodyWeightType: "ABW",
  },
  {
    value: "atropineSulfate",
    label: "Atropine Sulfate",
    min: 0.1,
    max: 3,
    coef: 0.5,
    unit: "ml",
    bodyWeightType: "ABW",
  },
  {
    value: "calciumGluconate",
    label: "10 % Calcium Gluconate",
    min: 0,
    max: 10,
    coef: 1,
    unit: "ml",
    bodyWeightType: "ABW",
  },
  {
    value: "amiodarone",
    label: "Cordarone (Amiodarone)",
    min: 0,
    max: 150,
    coef: 15,
    unit: "ml",
    bodyWeightType: "IBW",
  },
  {
    value: "glucose",
    label: "Magnesium Sulfate",
    min: 0,
    max: 50,
    coef: 5,
    unit: "ml",
    bodyWeightType: "TBW",
  },
  {
    value: "nahco3",
    label: "NaHCO3",
    min: 0,
    max: 50,
    coef: 5,
    unit: "ml",
    bodyWeightType: "TBW",
  },
  {
    value: "naloxone",
    label: "Narcan (Naloxone)",
    min: 0,
    max: 2,
    coef: 0.2,
    unit: "ml",
    bodyWeightType: "TBW",
  },
  {
    value: "lidocane",
    label: "Xylocard (Lidocane)",
    min: 0,
    max: 300,
    coef: 30,
    unit: "ml",
    bodyWeightType: "TBW",
  },
];

const createGroup = (groupName, options, setValue) => {
  return {
    label: (() => {
      return (
        <div
          className={`!text_black select__option !text-black select__option css-10wo9uf-option `}
          onClick={() =>
            setValue(value =>
              value.concat(options.filter(grpOpt => !value.includes(grpOpt)))
            )
          }
        >
          {groupName}
        </div>
      );
    })(),
    options: options
  };
};

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
