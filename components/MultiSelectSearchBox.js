import React from "react";

import Select from "react-select";
import { drug } from "./data";
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

const MultiSelectSearchBox = (props) => (
  <Select
    isMulti
    name="drugs"
    options={drug}
    closeMenuOnSelect={false}
    components={animatedComponents}
    className="basic-multi-select"
    classNames={{ 
    option: () => "text-black",}}
    onChange={props.onChange}
    classNamePrefix="select"
  />
);
export default MultiSelectSearchBox;
