import Select from "react-select";

export default function SexSelectBox(props) {
    return (
      <Select
        className="basic-single"
        classNames={props.classNames}
        classNamePrefix="select"
        options={[{label:'Male'}, {label:'Female'}]}
        onChange={props.onChange}
        value={props.value}
      />
    );
  }