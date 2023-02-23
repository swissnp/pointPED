import Select from "react-select";

export default function SexSelectBox(props) {
    return (
      <Select
        className="basic-single"
        classNamePrefix="select"
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            borderColor: props.changeFromRecents ? 'hsl(var(--in))' : '',
          }),
        }}
        name="sex"
        options={[{value: "male",label:'Male'}, {value: "male",label:'Female'}]}
        onChange={props.onChange}
        value={props.value}
      />
    );
  }