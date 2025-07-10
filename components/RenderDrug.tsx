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
import type { DrugOption, Constraint } from "./drugData";
import React from "react";
import { findConstraint } from "@/utils/constraintFinder";
import { FormData } from "@/types/schema";

interface RenderComponentProps {
  formValues: FormData;
  calculatedWeight: number | number[];
}

export default function RenderComponent({ formValues, calculatedWeight }: RenderComponentProps) {
  const list: React.ReactElement[] = [];
  const { selectedDrug, age, ageUnit } = formValues;
  const ageInMonths = ageUnit === "years" ? Number(age) * 12 : Number(age);

  for (let i = 0; i < selectedDrug.length; i++) {
    const constraint = findConstraint(ageInMonths, selectedDrug[i].constraints);

    if (!constraint) {
      // Handle case where no constraint is found for the given age
      list.push(
        <tr key={selectedDrug[i].value}>
          <td>{selectedDrug[i].label}</td>
          <td colSpan={2}>No dose for this age.</td>
        </tr>
      );
      continue;
    }

    let dose: number | [number, number];
    let drugSpecificWeight: number | null = 0;

    if (selectedDrug[i].bodyWeightType === null) {
      drugSpecificWeight = null;
      dose = constraint.coef;
    } else {
      if (Array.isArray(calculatedWeight)) {
        switch (selectedDrug[i].bodyWeightType) {
          case "TBW":
            drugSpecificWeight = calculatedWeight[0];
            break;
          case "IBW":
            drugSpecificWeight = calculatedWeight[1];
            break;
          case "AdjBW":
            drugSpecificWeight = calculatedWeight[2];
            break;
          default:
            console.error("Invalid bodyWeightType:", selectedDrug[i].bodyWeightType);
            drugSpecificWeight = calculatedWeight[0];
        }
      } else {
        drugSpecificWeight = calculatedWeight;
      }
      if (Array.isArray(constraint.coef)) {
        dose = [
          constraint.coef[0] * drugSpecificWeight,
          constraint.coef[1] * drugSpecificWeight,
        ];
      } else {
        dose = constraint.coef * drugSpecificWeight;
      }
    }

    let isMax: boolean = false;
    let isMin: boolean = false;
    let displayDose: string;
    let finalDose: number | [number, number];

    if (Array.isArray(dose)) {
      let lowerDose = dose[0];
      let upperDose = dose[1];

      if (lowerDose <= constraint.min) {
        lowerDose = constraint.min;
        isMin = true;
      }
      if (constraint.max !== null && upperDose >= constraint.max) {
        upperDose = constraint.max;
        isMax = true;
      }
      finalDose = [lowerDose, upperDose];
      displayDose = `${+lowerDose.toFixed(2)} - ${+upperDose.toFixed(2)}`;
    } else {
      let singleDose = dose;
      if (constraint.max !== null && singleDose >= constraint.max) {
        singleDose = constraint.max;
        isMax = true;
      } else if (singleDose <= constraint.min) {
        singleDose = constraint.min;
        isMin = true;
      }
      finalDose = singleDose;
      displayDose = `${+singleDose.toFixed(2)}`;
    }

    list.push(
      <tr key={selectedDrug[i].value}>
        <td>
          {selectedDrug[i].label}{" "}
          {isMax && (
            <div className="badge-error badge-outline badge">max</div>
          )}
          {isMin && <div className="badge-info badge-outline badge">min</div>}
        </td>
        <td className="z-5">
          <div className="flex flex-grow items-center justify-end whitespace-nowrap">
            {displayDose} {selectedDrug[i].unit}
            <MoreInfo
              selectedDrug={selectedDrug[i]}
              constraint={constraint}
              calculatedWeight={calculatedWeight}
              drugSpecificWeight={drugSpecificWeight}
              isMax={isMax}
              isMin={isMin}
              unclampedDose={dose}
              finalDose={finalDose}
            />
          </div>
        </td>
      </tr>
    );
  }
  return <tbody>{list}</tbody>;
}

function MoreInfo({
  selectedDrug,
  constraint,
  calculatedWeight,
  drugSpecificWeight,
  isMax,
  isMin,
  unclampedDose,
  finalDose,
}) {
  const [open, setOpen] = useState(false);

  const { x, y, refs, strategy, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: "bottom-end",
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(5),
      flip({
        fallbackAxisSideDirection: "start",
      }),
      shift(),
    ],
  });

  const hover = useHover(context, { move: false });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "tooltip" });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);

  const renderCalculation = () => {
    const isClamped = isMax || isMin;

    const unclampedDoseString = Array.isArray(unclampedDose)
      ? `${+unclampedDose[0].toFixed(2)} - ${+unclampedDose[1].toFixed(2)}`
      : `${+unclampedDose.toFixed(2)}`;

    const finalDoseString = Array.isArray(finalDose)
      ? `${+finalDose[0].toFixed(2)} - ${+finalDose[1].toFixed(2)}`
      : `${+finalDose.toFixed(2)}`;

    const showLineThrough = isClamped && unclampedDoseString !== finalDoseString;

    if (drugSpecificWeight === null) {
      return (
        <div className="inline">
          Fixed dose:
          <div
            className={`${
              showLineThrough && "line-through decoration-error decoration-2"
            } inline`}
          >
            {" "}{unclampedDoseString} {selectedDrug.unit}
          </div>
          {showLineThrough && (
            <span className="text-accent-focus"> -&gt; {finalDoseString} {selectedDrug.unit}</span>
          )}
        </div>
      );
    }

    const coefString = Array.isArray(constraint.coef)
      ? `${constraint.coef[0]}-${constraint.coef[1]}`
      : constraint.coef;

    return (
      <>
        {coefString} {selectedDrug.unit}/kg x{" "}
        <span className="badge badge-sm">
          {typeof calculatedWeight === "object" && selectedDrug.bodyWeightType}{" "}
          {+drugSpecificWeight.toFixed(2)} kg
        </span>{" "}
        ={" "}
        <div
          className={`${
            showLineThrough && "line-through decoration-error decoration-2"
          } inline`}
        >
          {unclampedDoseString} {selectedDrug.unit}
        </div>
        {showLineThrough && (
          <span className="text-accent-focus"> -&gt; {finalDoseString} {selectedDrug.unit}</span>
        )}
      </>
    );
  };

  return (
    <>
      <label
        tabIndex={0}
        ref={refs.setReference}
        {...getReferenceProps()}
        className="btn-ghost btn-xs btn-circle btn relative text-info"
      >
        {selectedDrug.notes && (
          <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-error" />
        )}
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
            className="Tooltip card compact rounded-box w-fit bg-base-100 shadow-lg max-w-[90%]"
            ref={refs.setFloating}
            style={{
              position: strategy,
              top: y ?? 0,
              left: x ?? 0,
            }}
            {...getFloatingProps()}
          >
            <div className="card-body text-right">
              <div className="whitespace-nowrap ">
                {isMax && (
                  <div className="flex flex-grow justify-end pb-1">
                    <br />
                    <div className="badge-error badge-outline badge">
                      max {constraint.max} {selectedDrug.unit}
                    </div>
                  </div>
                )}
                {isMin && (
                  <div className="flex flex-grow justify-end pb-1">
                    <br />
                    <div className="badge-info badge-outline badge">
                      min {constraint.min} {selectedDrug.unit}
                    </div>
                  </div>
                )}
                {renderCalculation()}
                {selectedDrug.notes && (
                  <div className="mt-2 whitespace-normal border-t pt-2 text-left text-sm text-base-content/70">
                    <p className="font-bold">Notes:</p>
                    <p>{selectedDrug.notes}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </FloatingPortal>
    </>
  );
}
