export default function InformationBox(props){
    const weight = props.weight;
    const height = props.height;
    const sex = props.sex;
    return(
        <div className="stats max-w-full shadow">
          <div className="stat place-items-center">
            <div className="stat-title">Weight</div>
            {weight === "" || weight === 0 ? (
              <div className="stat-value text-error">{"-"}</div>
            ) : (
              <div className="stat-value">{weight}</div>
            )}
          </div>

          <div className="stat place-items-center">
            <div className="stat-title">Height</div>
            {height === "" || height === 0 ? (
              <div className="stat-value text-error">{"-"}</div>
            ) : (
              <div className="stat-value">{height}</div>
            )}
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
    )
}