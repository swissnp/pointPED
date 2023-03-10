export default function InformationBox(props) {
  const weight = +parseFloat(props.weight).toFixed(2);
  const height = +parseFloat(props.height).toFixed(2);
  const sex = props.sex;
  const max = Math.max(weight.toString().length, height.toString().length)
  return (
    <div className="stats max-w-full shadow">
      <div className="stat place-items-center">
        <div className="stat-title">Weight</div>
        <div className="overflow-hidden mx-1">
          {weight === "" || weight === 0 ? (
            <div className="stat-value text-error">{"-"}</div>
          ) : (
            <div className={`stat-value text-ellipsis whitespace-nowrap ${max <= 4 ? 'text-3xl' : 'text-2xl'} `}>
              {weight} 
            </div>
          )}
        </div>
      </div>

      <div className="stat place-items-center">
        <div className="stat-title">Height</div>
        <div className="overflow-hidden mx-1">
          {height === "" || height === 0 ? (
            <div className="stat-value text-error">{"-"}</div>
          ) : (
            <div className={`stat-value text-ellipsis whitespace-nowrap ${max <= 4 ? 'text-3xl' : 'text-2xl'}`}>
              {height}
            </div>
          )}
        </div>
      </div>

      <div className="stat place-items-center">
        <div className="stat-title">Sex</div>
        {sex.label === "Female" && (
          <img className="h-11 w-11" src="./female.svg"></img>
        )}
        {sex.label === "Male" && (
          <img className="h-11 w-11" src="./male.svg"></img>
        )}
      </div>
    </div>
  );
}
