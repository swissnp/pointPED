import Select from "react-select";

export default function SexSelectBox() {
    return (
      <Select
        className="basic-single"
        classNamePrefix="select"
        options={[{label:'Male'}, {label:'Female'}]}
      />
    );
  }