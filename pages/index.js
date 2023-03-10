import Head from "next/head";
import NavBar from "@/components/NavBar";
import { useState, useRef } from "react";
import { calculateWeight } from "@/components/calculation";
import MultiSelectSearchBox from "@/components/MultiSelectSearchBox";
import SexSelectBox from "@/components/SexSelectBox";
import RenderComponent from "@/components/RenderDrug";
import InformationBox from "@/components/Modal";
import { useCookies } from "react-cookie";
import { CookiesProvider } from "react-cookie";
import { TrashIcon } from "@heroicons/react/24/outline";

export default function Root() {
  return (
    <CookiesProvider>
      <Home />
    </CookiesProvider>
  );
}

const validateWeight = (weight) => {
  if (
    /^\d*\.?\d*$/.test(weight) & (weight >= 0 && weight <= 400) ||
    weight === ""
  ) {
    return true;
  }
  return false;
};

const validateHeight = (height) => {
  if (
    /^\d*\.?\d*$/.test(height) & (height >= 45 && height <= 170) ||
    height === ""
  ) {
    return true;
  }
  return false;
};

const validateForm = (weight, height, sex, selectedDrug) => {
  console.log(selectedDrug.length, sex, weight, height);
  if (selectedDrug.length > 0) {
    if (sex != "") {
      if (validateWeight(weight) && validateHeight(height)) {
        if (weight > 0 || height > 0) {
          return true;
        } else {
          throw "Please enter either weight or height";
        }
      } else {
        throw "Please enter a valid weight and height";
      }
    } else {
      throw "Please select a sex";
    }
  } else {
    throw "Please select at least 1 drug";
  }
};

const handleCookies = (weight, height, sex, setCookies, cookies) => {
  let expireDate = Date.now() + 60 * 60 * 24 * 365 * 1000;
  try {
    let oldCookies = cookies.recents.data;
    var filtered = oldCookies.filter(function (value, index, arr) {
      if (JSON.stringify(value) !== JSON.stringify({ weight, height, sex })) {
        return value;
      }
    });
    if (filtered.length >= 6) {
      filtered.shift();
    }
    filtered.push({ weight, height, sex });
    setCookies("recents", JSON.stringify({ data: filtered }), {
      path: "/",
      expires: new Date(expireDate),
    });
  } catch (e) {
    try {
      setCookies(
        "recents",
        JSON.stringify({ data: [{ weight, height, sex }] }),
        { path: "/" },
        { expires: new Date(expireDate) }
      );
    } catch (e2) {
      console.error(e);
      console.error(e2);
    }
  }
};

export function Home() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [selectedDrug, setSelectedDrug] = useState([]);
  const [sex, setSex] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isWeightValid = useRef(true);
  const isHeightValid = useRef(true);
  const calculatedWeight = useRef(0);
  const isObese = useRef(false);
  const [formError, setFormError] = useState("");
  const [cookies, setCookies] = useCookies(["recents"]);
  const [changeFromRecents, setChangeFromRecents] = useState(false);

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
        <link
          rel="manifest"
          href="/manifest.webmanifest"
          crossOrigin="use-credentials"
        />
        <link rel="apple-touch-icon" href="icons/apple-icon-180.png" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <input
        type="checkbox"
        id="my-modal-3"
        className={"modal-toggle"}
        checked={isModalOpen}
        onChange={() => {}} // This is to prevent error
      />

      <div className="modal text-base-content">
        <div className="modal-box w-11/12 max-w-lg" id="modal">
          <label
            htmlFor="my-modal-3"
            className="btn-sm btn-circle  btn absolute right-2 top-2"
            onClick={() => {
              setIsModalOpen(false);
            }}
          >
            ???
          </label>
          <div className="flex max-h-screen items-center justify-center gap-x-6 pb-1">
            <InformationBox weight={weight} height={height} sex={sex} />
          </div>
          <div className="max-h-full overflow-x-scroll pt-2">
            <table className="table-zebra table-compact w-full table-auto">
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
              <RenderComponent
                selectedDrug={selectedDrug}
                calculatedWeight={calculatedWeight.current}
              />
            </table>
          </div>
        </div>
      </div>
      <main className="bg-base-200 min-h-screen pb-20">
          <NavBar
            cookies={cookies}
            setWeight={setWeight}
            setHeight={setHeight}
            setSex={setSex}
            setChangeFromRecents={setChangeFromRecents}
          />
          <div className="mx-3">
            <div className="z-0 my-5 container relative top-16 mx-auto max-w-screen-sm rounded-2xl bg-base-100 px-6 py-5 text-base-content drop-shadow-md">
              <div className="prose-lg whitespace-nowrap p-3 text-center font-bold text-base-content ">
                <h1 className="inline text-primary">.</h1>
                <h1 className="inline">PED</h1>
              </div>
              <p className="text-center text-error">
                demo version don't use in real setting.
              </p>
              {formError && (
                <div className="alert alert-error my-2 py-4">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 flex-shrink-0 stroke-current"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>{formError}</span>
                  </div>
                </div>
              )}
              {changeFromRecents && (
                <div className="alert my-2 py-4">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="h-6 w-6 flex-shrink-0 stroke-info"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    <span>
                      Weight, Height and Sex are filled with recents.{" "}
                    </span>
                  </div>
                </div>
              )}
              <label className="label">
                <span className="label-text">
                  Drugs<span className="text-error"> *</span>
                </span>
              </label>
              <MultiSelectSearchBox
                onChange={(e) => handleChange(e)}
                value={selectedDrug}
              />
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
                  type="text"
                  // step=".01" // allow decimal
                  value={weight}
                  placeholder="range 0-400"
                  className={` input-bordered input w-full ${
                    !isWeightValid.current && "input-error"
                  } ${changeFromRecents && "input-info"}`}
                  pattern="^\d*(\.\d{0,2})?$"
                  inputMode="decimal"
                  onChange={(e) => {
                    setWeight((weight) =>
                      e.target.validity.valid ? e.target.value : weight
                    );
                    setChangeFromRecents(false);
                  }}
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
                  type="text"
                  placeholder="range 45-170"
                  // step=".01" // allow decimal
                  value={height}
                  className={`input-bordered input w-full 
                  ${!isHeightValid.current && "input-error"} ${
                    changeFromRecents && "input-info"
                  }`}
                  pattern="^\d*(\.\d{0,2})?$"
                  inputMode="decimal"
                  onChange={(e) => {
                    setHeight((height) => {
                      if (e.target.validity.valid) {
                        return e.target.value;
                      } else {
                        console.log("invalid");
                        return height;
                      }
                    });
                    setChangeFromRecents(false);
                  }}
                />
              </div>
              <label className="label">
                <span className="label-text">
                  Sex<span className="text-error"> *</span>
                </span>
              </label>
              <SexSelectBox
                onChange={(e) => setSex(e)}
                value={sex}
                classNames={`${changeFromRecents && "outline-blue"}`}
                changeFromRecents={changeFromRecents}
              />
              <div className={`flex items-center justify-center gap-x-6 pt-5 `}>
                <label
                  onClick={(event) => {
                    setFormError("");
                    setWeight("");
                    setHeight("");
                    setSex("");
                    setSelectedDrug([]);
                    setChangeFromRecents(false);
                  }}
                  className={`btn-outline btn-error btn  absolute left-6 `}
                >
                  <TrashIcon className="h-6 w-6" />
                </label>
                <label
                  onClick={(event) => {
                    setFormError("");
                    setChangeFromRecents(false);
                    try {
                      setIsModalOpen(
                        validateForm(weight, height, sex, selectedDrug)
                      );
                      handleCookies(weight, height, sex, setCookies, cookies);
                    } catch (e) {
                      console.error(e);
                      setFormError(e);
                      setChangeFromRecents(false);
                    }

                    console.log(weight, height, sex);
                  }}
                  className={`btn-primary btn ${
                    !(isWeightValid.current & isHeightValid.current) &&
                    "btn-disabled"
                  }`}
                >
                  Calculate
                </label>
              </div>
            </div>
          </div>
      </main>
    </>
  );
}
