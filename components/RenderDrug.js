import { useState } from "react";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  FloatingPortal,
} from "@floating-ui/react";

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
        <td className="z-5 flex flex-grow justify-end">
          <div className="">
            {+dose.toFixed(2)} {selectedDrug[i].unit}
            <MoreInfo
              selectedDrug={selectedDrug[i]}
              calculatedWeight={calculatedWeight}
              drugSpecificWeight={drugSpecificWeight}
              isMax={isMax}
              isMin={isMin}
            />
          </div>
        </td>
      </tr>
    );
  }
  return <tbody>{list}</tbody>;
}




function MoreInfo(props) {
  const [open, setOpen] = useState(false);
  const selectedDrug = props.selectedDrug;
  const calculatedWeight = props.calculatedWeight;
  const drugSpecificWeight = props.drugSpecificWeight;
  const isMax = props.isMax;
  const isMin = props.isMin;

  const { x, y, refs, strategy, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: "bottom-end",
    // Make sure the MoreInfo stays on the screen
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(5),
      flip({
        fallbackAxisSideDirection: "start",
      }),
      shift(),
    ],
  });

  // Event listeners to change the open state
  const hover = useHover(context, { move: false });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  // Role props for screen readers
  const role = useRole(context, { role: "tooltip" });

  // Merge all the interactions into prop getters
  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);

  return (
    <>
      <label
        tabIndex={0}
        ref={refs.setReference}
        {...getReferenceProps()}
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
      <FloatingPortal id="modal">
        {open && (
          <div
            tabIndex={0}
            className="Tooltip card compact rounded-box w-fit bg-base-100 shadow-lg"
            ref={refs.setFloating}
            style={{
              // Positioning styles
              position: strategy,
              top: y ?? 0,
              left: x ?? 0,
            }}
            {...getFloatingProps()}
          >
            <div className="card-body">
              <div className="whitespace-nowrap ">
                {isMax && (
                  <div className="flex flex-grow justify-end pb-1">
                    <br />
                    <div className="badge-error badge-outline badge">
                      max {selectedDrug.max} {selectedDrug.unit}
                    </div>
                  </div>
                )}
                {isMin && (
                  <div className="flex flex-grow justify-end pb-1">
                    <br />
                    <div className="badge-info badge-outline badge">
                      min {selectedDrug.min} {selectedDrug.unit}
                    </div>
                  </div>
                )}
                {selectedDrug.coef} {selectedDrug.unit}/kg x{" "}
                <span class="badge badge-sm">
                  {typeof calculatedWeight === "object" &&
                    selectedDrug.bodyWeightType}{" "}
                  {+drugSpecificWeight.toFixed(2)} kg
                </span>{" "}
                = <div className={`${(isMax || isMin) && 'line-through decoration-error decoration-2'} inline`}>{+(selectedDrug.coef * drugSpecificWeight).toFixed(2)}{" "}
                {selectedDrug.unit}{" "}</div>
              </div>
            </div>
          </div>
        )}
      </FloatingPortal>
    </>
  );
}
