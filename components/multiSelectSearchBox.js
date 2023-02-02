import React from "react";

import Select from "react-select";
import { drug } from "./data";

const MultiSelectSearchBox = () => (
  <Select
    defaultValue={[drug[2], drug[3]]}
    isMulti
    name="colors"
    options={drug}
    className="basic-multi-select"
    classNames={{ 
    // menuList: () => "text-neutral-content" ,
    // menu: () => "text-neutral-content" ,
    option: () => "text-black" ,}}
    classNamePrefix="select"
  />
);
export default MultiSelectSearchBox;
