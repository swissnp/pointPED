export default function RenderComponent(props) {
  const selectedDrug = props.selectedDrug;
  const calculatedWeight = props.calculatedWeight;
//   let calculatedWeight = calculateWeight(weight, height, sex);
  let list = [];
    for (let i = 0; i < selectedDrug.length; i++) {
        let dose = 0;
        if (typeof calculatedWeight === "object"){
            let drugSpecificWeight=0;
            if (selectedDrug[i].bodyWeightType === "TBW") {
                drugSpecificWeight = calculatedWeight[0];
            } else if (selectedDrug[i].bodyWeightType === "IBW"){
                drugSpecificWeight = calculatedWeight[1];
            } else if (selectedDrug[i].bodyWeightType === "ABW"){
                drugSpecificWeight = calculatedWeight[2];
            } else {
                throw "invalidBodyWeightType";
            }
        dose = selectedDrug[i].coef * drugSpecificWeight;
        } else {
        dose = selectedDrug[i].coef * calculatedWeight;
        }
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
        <td>
          {dose} {selectedDrug[i].unit}
        </td>
      </tr>
    );
  } 
  return <tbody>{list}</tbody>;
}

// const calculate_drug = (weight, height, sex, selectedDrug) => {
//     console.log(selectedDrug);
//     let calculatedWeight = calculateWeight(weight, height, sex);
//     console.log(calculatedWeight);
//     if (typeof calculatedWeight === "object") {
//     } else {
//       for (let i = 0; i < selectedDrug.length; i++) {
//         let dose = selectedDrug[i].coef * calculatedWeight;
//         console.log(dose, selectedDrug[i].label);
//       }
//     }
//   };
