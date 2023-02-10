import Head from "next/head";
import NavBar from "@/components/NavBar";
import { useState, useRef} from "react";
import { calculateWeight } from "@/components/calculation";
import MultiSelectSearchBox from "@/components/MultiSelectSearchBox";
import SexSelectBox from "@/components/SexSelectBox";
import RenderComponent from "@/components/RenderDrug";

const validateWeight = (weight) => {
  if (
    (/^\d*\.?\d*$/.test(weight)) & (weight >= 0 && weight <= 400) || weight === ""
  ) {
    return true;
  }
  return false;
};

const validateHeight = (height) => {
  if (
    (/^\d*\.?\d*$/.test(height)) & (height >= 45 && height <= 120) || height === ""
  ) {
    return true;
  }
  return false;
};

const validateForm = (weight, height, sex, selectedDrug) => {
  console.log(selectedDrug.length, sex, weight, height);
  if (selectedDrug.length > 0) {
    if (sex != "") {
      if (weight > 0 || height > 0) {
        return true;
      } else {
        throw "Please enter either weight or height";
      }
    } else {
      throw "Please select a sex";
    }
  } else {
    throw "Please select at least 1 drug";
  }
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
  const [formError,setFormError] = useState('');
  const [isFormError,setIsFormError] = useState(false);

  isWeightValid.current = validateWeight(weight);
  isHeightValid.current = validateHeight(height);

  if (isModalOpen) {
    calculatedWeight.current = calculateWeight(weight, height, sex.label);
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
      <input
        type="checkbox"
        id="my-modal-3"
        className={"modal-toggle"}
        checked={isModalOpen}
      />
      <div className="modal text-base-content">
        <div className="modal-box w-11/12 max-w-2xl">
          <label
            htmlFor="my-modal-3"
            className="btn-sm btn-circle btn absolute right-2 top-2"
            onClick={() => {
              setIsModalOpen(false);
            }}
          >
            ✕
          </label>
          <div className="flex max-h-screen items-center justify-center gap-x-6 pb-1">
            <div className="stats max-w-full shadow">
              <div className="stat place-items-center">
                <div className="stat-title">Weight</div>
                {weight === "" || weight === 0 ? (
                  <div className="stat-value text-error">{"-"}</div>
                ) : (
                  <div className="stat-value">{weight}</div>
                )}
                {/* <div className="stat-desc">From January 1st to February 1st</div> */}
              </div>

              <div className="stat place-items-center">
                <div className="stat-title">Height</div>
                {height === "" || height === 0 ? (
                  <div className="stat-value text-error">{"-"}</div>
                ) : (
                  <div className="stat-value">{height}</div>
                )}
                {/* <div className="stat-desc text-secondary">↗︎ 40 (2%)</div> */}
              </div>

              <div className="stat place-items-center">
                <div className="stat-title">Sex</div>
                {sex.label === "Female" && (
                  <img className="h-11 w-11" src="./female.svg"></img>
                )}
                {sex.label === "Male" && (
                  <img className="h-11 w-11" src="./male.svg"></img>
                )}
                {/* <div className="stat-desc"></div> */}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto pt-2 shadow-sm">
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
              {isFormError && (
                <div className="alert alert-error shadow-lg">
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span >{formError}</span>
                </div>
              </div>)
              }
              <label className="label">
                <span className="label-text">
                  Drugs<span className="text-error"> *</span>
                </span>
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
                  step="any" // allow decimal
                  value={weight}
                  placeholder="range 0-400"
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
                  placeholder="range 45-120"
                  step="any" // allow decimal
                  value={height}
                  className={` input-bordered input w-full ${
                    !isHeightValid.current && "input-error"
                  } `}
                  pattern="/\d+\.?\d*$/"
                  inputMode="decimal"
                  onChange={(e) =>
                    setHeight((height) =>
                      e.target.validity.valid ? e.target.value : height
                    )
                  }
                />
              </div>
              <label className="label">
                <span className="label-text">
                  Select Sex<span className="text-error"> *</span>
                </span>
              </label>
              <SexSelectBox onChange={(e) => setSex(e)} />
              <div className={`flex items-center justify-center gap-x-6 py-2 pt-3 `}>
                <label
                  onClick={(event) => {
                    setIsFormError(false);
                    setFormError("");
                    try {
                      setIsModalOpen(
                        validateForm(weight, height, sex, selectedDrug)
                      )
                    } catch (e) {
                      console.log(e)
                      setIsFormError(true)
                      setFormError(e)
                    }
                    
                    console.log(weight, height, sex);
                  }}
                  // htmlFor="my-modal-3"
                  className={`btn-primary btn ${!(isWeightValid.current &isHeightValid.current) && "btn-disabled"}`}
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
