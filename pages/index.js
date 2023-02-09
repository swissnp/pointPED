import Head from "next/head";
import NavBar from "@/components/NavBar";
import { useState, useRef, use } from "react";
import { getP50weight, adjustedWeight } from "@/components/calculation";
import MultiSelectSearchBox from "@/components/MultiSelectSearchBox";
import SexSelectBox from "@/components/SexSelectBox";
import drug from "@/components/data";
import RenderComponent from "@/components/RenderDrug";
// const calculateWeight = (w, h, s) => {
//   if (w > 0) {
//     if (w > 1.2 * getP50weight(h, s)) {
//       console.log("overweight");
//       let TBW = w;
//       let IBW = getP50weight(h, s);
//       let ABW = adjustedWeight(w, h);
//       console.log(TBW, IBW, ABW);
//       return [TBW, IBW, ABW];
//     } else {
//       console.log("normal weight");
//       return w;
//     }
//   } else {
//     return getP50weight(h, s);
//   }
// };

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
  let isWeightValid = useRef(true);
  let isHeightValid = useRef(true);
  const [isModelOpen, setIsModelOpen] = useState(false);

  isWeightValid = validateWeight(weight);
  isHeightValid = validateHeight(height);

  let handleChange = (selectedOption) => {
    setSelectedDrug(selectedOption);
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.webmanifest"></link>
      </Head>
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal text-base-content">
        <div className="modal-box w-11/12 max-w-5xl">
          <label
            htmlFor="my-modal-3"
            className="btn-sm btn-circle btn absolute right-2 top-2"
            onClick={() => {
              setIsModelOpen(false);
            }}
          >
            ✕
          </label>
          <div className="overflow-x-auto">
            <table className="table-zebra table w-full">
              <thead>
                <tr>
                  <th>Drugs</th>
                  <th>Dose</th>
                </tr>
              </thead>
              {isModelOpen && (
                <RenderComponent
                  selectedDrug={selectedDrug}
                  weight={weight}
                  height={height}
                  sex={sex}
                />
              )}
            </table>
          </div>
        </div>
      </div>
      <main>
        <div className="min-h-screen bg-base-200 overflow-auto">
          <NavBar />
          <div className="mx-3 my-5">
            <div className="container mx-auto max-w-screen-md rounded-lg bg-base-100 px-6 py-2 text-base-content drop-shadow-md">
              <div className="prose-lg p-3 text-center font-bold lg:prose-xl">
                <h1>Select Drug</h1>
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
                  {isWeightValid ? (
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
                    !isWeightValid && "input-error"
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
                  {isHeightValid ? (
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
                    !isHeightValid && "input-error"
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
              <div className=" flex items-center justify-center gap-x-6 pt-3">
                <label
                  onClick={(e) => {
                    setIsModelOpen(true);
                    console.log(weight,height)
                  }}
                  htmlFor="my-modal-3"
                  className="btn"
                >
                  open modal
                </label>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
