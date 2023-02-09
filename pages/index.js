import Head from "next/head";
import NavBar from "@/components/NavBar";
import { useState, useRef, use } from "react";
import { calculateWeight } from "@/components/calculation";
import MultiSelectSearchBox from "@/components/MultiSelectSearchBox";
import SexSelectBox from "@/components/SexSelectBox";
import RenderComponent from "@/components/RenderDrug";

const validateWeight = (weight) => {
  if (
    (weight >= 0 || weight === "" || /^\d*\.?\d*$/.test(e.target.value)) &
    (weight <= 500)
  ) {
    return true;
  }
  return false;
};

const validateHeight = (weight) => {
  if (
    (weight >= 0 || weight === "" || /^\d*\.?\d*$/.test(e.target.value)) &
    (weight <= 300)
  ) {
    return true;
  }
  return false;
};

export default function Home() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [selectedDrug, setSelectedDrug] = useState([]);
  const [sex, setSex] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isWeightValid = useRef(true);
  const isHeightValid = useRef(true);
  const calculatedWeight = useRef(0);
  const isObese = useRef(false);

  isWeightValid.current = validateWeight(weight);
  isHeightValid.current = validateHeight(height);

  if (isModalOpen) {
    calculatedWeight.current = calculateWeight(weight, height, sex);
    if (typeof calculatedWeight.current === "object") {
      isObese.current = true;
    } else {
      isObese.current = false;
    }
  }

  let handleChange = (selectedOption) => {
    setSelectedDrug(selectedOption);
  };
  return (
    <>
      <Head>
        <title>PointPED</title>
        <meta name="description" content="PointPed" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.webmanifest"></link>
      </Head>
      <input type="checkbox" id="my-modal-3" className={'modal-toggle'} checked={isModalOpen}/>
      <div className="modal text-base-content">
        <div className="modal-box w-11/12 max-w-5xl">
          <label
            htmlFor="my-modal-3"
            className="btn-sm btn-circle btn absolute right-2 top-2"
            onClick={() => {
              setIsModalOpen(false);
            }}
          >
            ✕
          </label>
          <div className=" flex max-h-screen items-center justify-center gap-x-6 pb-1"></div>
          <div className="overflow-x-auto pt-4 shadow-sm">
            <table className="table-zebra table-compact w-full">
              <thead>
                <tr>
                  <th>
                    Drugs{" "}
                    {isObese.current ? (
                      <div className="badge-error badge ml-1 gap-1">Obese</div>
                    ) : (
                      <div className="badge-success badge ml-1 gap-1">
                        Not Obese
                      </div>
                    )}
                  </th>
                  <th>Dose</th>
                </tr>
              </thead>
              {isModalOpen && (
                <RenderComponent
                  selectedDrug={selectedDrug}
                  calculatedWeight={calculatedWeight.current}
                />
              )}
            </table>
          </div>
        </div>
      </div>
      <main>
        <div className="min-h-screen overflow-auto bg-base-200">
          <NavBar />
          <div className="mx-3 my-5">
            <div className="container mx-auto max-w-screen-md rounded-lg bg-base-100 px-6 py-3 text-base-content drop-shadow-md">
              <div className="prose-lg p-3 text-center font-bold text-base-content lg:prose-xl">
                <h1>PointPED</h1>
              </div>
              <p className="text-center text-error">
                demo version don't use in real setting
              </p>
              <label className="label">
                <span className="label-text">Drugs</span>
              </label>
              <MultiSelectSearchBox onChange={(e) => handleChange(e)} />
              <div className="form-control w-auto ">
                <label className="label">
                  <span className="label-text">Weight (kg)</span>
                  {isWeightValid.current ? (
                    <span className="label-text-alt"></span>
                  ) : (
                    <span className="label-text-alt text-error">
                      Weight is invalid
                    </span>
                  )}
                </label>
                <input
                  type="number"
                  placeholder="Type here"
                  className={` input-bordered input w-full ${
                    !isWeightValid.current && "input-error"
                  } `}
                  pattern="/^\d*\.?\d*$/"
                  inputMode="decimal"
                  onChange={(e) =>
                    setWeight((weight) =>
                      e.target.validity.valid ? e.target.value : weight
                    )
                  }
                />
              </div>
              <div className="form-control w-auto ">
                <label className="label">
                  <span className="label-text">Height (cm)</span>
                  {isHeightValid.current ? (
                    <span className="label-text-alt"></span>
                  ) : (
                    <span className="label-text-alt text-error">
                      Height is invalid
                    </span>
                  )}
                </label>
                <input
                  type="number"
                  placeholder="Type here"
                  className={` input-bordered input w-full ${
                    !isHeightValid.current && "input-error"
                  } `}
                  pattern="/\d+\.?\d*/"
                  inputMode="decimal"
                  onChange={(e) =>
                    setHeight((height) =>
                      e.target.validity.valid ? e.target.value : height
                    )
                  }
                />
              </div>
              <label className="label">
                <span className="label-text">Select Sex</span>
              </label>
              <SexSelectBox onChange={(e) => setSex(e.label)} />
              <div className=" flex items-center justify-center gap-x-6 pt-3 py-2">
                <label
                  onClick={(e) => {
                    setIsModalOpen(true);
                    console.log(weight, height);
                  }}
                  // htmlFor="my-modal-3"
                  className="btn btn-primary"
                >
                  Calculate
                </label>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
