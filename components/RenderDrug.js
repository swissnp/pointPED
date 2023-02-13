export default function RenderComponent(props) {
  const selectedDrug = props.selectedDrug;
  const calculatedWeight = props.calculatedWeight;
  //   let calculatedWeight = calculateWeight(weight, height, sex);
  let list = [];
  for (let i = 0; i < selectedDrug.length; i++) {
    let dose = 0;
    let drugSpecificWeight = 0;
    if (typeof calculatedWeight === "object") {
      if (selectedDrug[i].bodyWeightType === "TBW") {
        drugSpecificWeight = calculatedWeight[0];
      } else if (selectedDrug[i].bodyWeightType === "IBW") {
        drugSpecificWeight = calculatedWeight[1];
      } else if (selectedDrug[i].bodyWeightType === "ABW") {
        drugSpecificWeight = calculatedWeight[2];
      } else {
        throw "invalidBodyWeightType";
      }
    } else {
      drugSpecificWeight = calculatedWeight;
    }
    dose = selectedDrug[i].coef * drugSpecificWeight;
    let isMax = false;
    let isMin = false;
    if (dose >= selectedDrug[i].max) {
      dose = selectedDrug[i].max;
      isMax = true;
    } else if (dose <= selectedDrug[i].min) {
      dose = selectedDrug[i].min;
      isMin = true;
    }

    list.push(
      <tr key={selectedDrug[i].value}>
        <td>
          {selectedDrug[i].label}{" "}
          {isMax && <div className="badge-error badge-outline badge">max</div>}
          {isMin && <div className="badge-info badge-outline badge">min</div>}
        </td>
        <td className="flex flex-grow justify-end">
          <div className="">
          {+dose.toFixed(2)} {selectedDrug[i].unit}
          <div className="dropdown-end dropdown">
            <label
              tabIndex={0}
              className="btn-ghost btn-xs btn-circle btn text-info"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="h-4 w-4 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </label>
            <div
              tabIndex={0}
              className="card dropdown-content compact rounded-box w-fit bg-base-100 shadow"
            >
              <div className="card-body">
                
                <div className="whitespace-nowrap ">
                  {selectedDrug[i].coef} {selectedDrug[i].unit}/kg x{" "}
                  <span class="badge badge-sm">{typeof calculatedWeight === "object" &&
                    selectedDrug[i].bodyWeightType}{" "}
                  {drugSpecificWeight}{" "}
                  kg
                  </span> 
                  {' '} = {' '}
                  {+(selectedDrug[i].coef*drugSpecificWeight).toFixed(2)} {selectedDrug[i].unit} {' '}
                  {isMax && <div className="flex flex-grow justify-end pt-1"><br /><div className="badge-error badge-outline badge">max {selectedDrug[i].max} {selectedDrug[i].unit}</div></div>}
                  {isMin && <div className="flex flex-grow justify-end pt-1"><br /><div className="badge-info badge-outline badge">min {selectedDrug[i].min} {selectedDrug[i].unit}</div></div>}
                </div>
              </div>
            </div>
          </div>
          </div>
        </td>
      </tr>
    );
  }
  return <tbody>{list}</tbody>;
}
