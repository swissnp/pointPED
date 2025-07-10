import React from "react";

interface InformationBoxProps {
  weight: string;
  height: string;
  sex: string;
  age: string;
  ageUnit: 'years' | 'months';
}

export default function InformationBox({ weight: weightProp, height: heightProp, sex, age, ageUnit }: InformationBoxProps) {
  const weightNum = weightProp !== "" ? parseFloat(weightProp) : null;
  const heightNum = heightProp !== "" ? parseFloat(heightProp) : null;
  const ageNum = age !== "" ? parseFloat(age) : null;

  const displayWeight = weightNum !== null && !isNaN(weightNum) ? weightNum.toFixed(1) : "-";
  const displayHeight = heightNum !== null && !isNaN(heightNum) ? heightNum.toFixed(1) : "-";

  const maxLen = Math.max(displayWeight.length, displayHeight.length);
  const valueClass = `stat-value text-ellipsis whitespace-nowrap ${maxLen <= 4 ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl'}`;

  return (
    <div className="stats max-w-full shadow">
      <div className="stat place-items-center px-2 py-4 sm:px-4">
        <div className="stat-title">Weight</div>
        <div className="overflow-hidden mx-1">
          <div className={valueClass + (displayWeight === "-" ? " text-gray-400" : "")}>
            {displayWeight}
          </div>
        </div>
      </div>

      <div className="stat place-items-center px-2 py-4 sm:px-4">
        <div className="stat-title">Height</div>
        <div className="overflow-hidden mx-1">
          <div className={valueClass + (displayHeight === "-" ? " text-gray-400" : "")}>
            {displayHeight}
          </div>
        </div>
      </div>

      <div className="stat place-items-center px-2 py-4 sm:px-4">
        <div className="stat-title">Age</div>
        {ageNum !== null && !isNaN(ageNum) ? (
          <>
            <div className="stat-value text-xl sm:text-2xl">{ageNum}</div>
            <div className="text-base sm:text-lg -mt-1 capitalize">{ageUnit}</div>
          </>
        ) : (
          <div className="stat-value text-xl sm:text-2xl text-gray-400">-</div>
        )}
      </div>

      <div className="stat place-items-center px-2 py-4 sm:px-4">
        <div className="stat-title">Sex</div>
        <div className="h-7 w-7 sm:h-9 sm:w-9 flex items-center justify-center">
          {sex === "Female" && (
            <img className="h-7 w-7 sm:h-9 sm:w-9" src="./female.svg" alt="Female" />
          )}
          {sex === "Male" && (
            <img className="h-7 w-7 sm:h-9 sm:w-9" src="./male.svg" alt="Male" />
          )}
          {sex === "" && (
            <div className="text-xl sm:text-2xl text-gray-400">?</div>
          )}
        </div>
      </div>
    </div>
  );
}
