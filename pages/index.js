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
    /^\d*\.?\d*$/.test(height) & (height >= 45 && height <= 120) ||
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
  const [isFormError, setIsFormError] = useState(false);
  const [cookies, setCookies, removeCookies] = useCookies(["recents"]);
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
        <link rel="manifest" href="/manifest.webmanifest" crossorigin="use-credentials"/>
        <link rel="apple-touch-icon" href="icons/apple-icon-180.png" />
        <meta name="theme-color" content="#ffffff" />

        <meta name="apple-mobile-web-app-capable" content="yes" />

        <link
          rel="apple-touch-startup-image"
          href="icons/apple-splash-2048-2732.jpg"
          media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
        />
        <link
          rel="apple-touch-startup-image"
          href="icons/apple-splash-2732-2048.jpg"
          media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
        />
        <link
          rel="apple-touch-startup-image"
          href="icons/apple-splash-1668-2388.jpg"
          media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
        />
        <link
          rel="apple-touch-startup-image"
          href="icons/apple-splash-2388-1668.jpg"
          media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
        />
        <link
          rel="apple-touch-startup-image"
          href="icons/apple-splash-1536-2048.jpg"
          media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
        />
        <link
          rel="apple-touch-startup-image"
          href="icons/apple-splash-2048-1536.jpg"
          media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
        />
        <link
          rel="apple-touch-startup-image"
          href="icons/apple-splash-1668-2224.jpg"
          media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
        />
        <link
          rel="apple-touch-startup-image"
          href="icons/apple-splash-2224-1668.jpg"
          media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
        />
        <link
          rel="apple-touch-startup-image"
          href="icons/apple-splash-1620-2160.jpg"
          media="(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
        />
        <link
          rel="apple-touch-startup-image"
          href="icons/apple-splash-2160-1620.jpg"
          media="(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
        />
        <link
          rel="apple-touch-startup-image"
          href="icons/apple-splash-1290-2796.jpg"
          media="(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
        />
        <link
          rel="apple-touch-startup-image"
          href="icons/apple-splash-2796-1290.jpg"
          media="(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
        />
        <link
          rel="apple-touch-startup-image"
          href="icons/apple-splash-1179-2556.jpg"
          media="(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
        />
        <link
          rel="apple-touch-startup-image"
          href="icons/apple-splash-2556-1179.jpg"
          media="(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
        />
        <link
          rel="apple-touch-startup-image"
          href="icons/apple-splash-1284-2778.jpg"
          media="(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
        />
        <link
          rel="apple-touch-startup-image"
          href="icons/apple-splash-2778-1284.jpg"
          media="(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
        />
        <link
          rel="apple-touch-startup-image"
          href="icons/apple-splash-1170-2532.jpg"
          media="(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
        />
        <link
          rel="apple-touch-startup-image"
          href="icons/apple-splash-2532-1170.jpg"
          media="(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
        />
        <link
          rel="apple-touch-startup-image"
          href="icons/apple-splash-1125-2436.jpg"
          media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
        />
        <link
          rel="apple-touch-startup-image"
          href="icons/apple-splash-2436-1125.jpg"
          media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
        />
        <link
          rel="apple-touch-startup-image"
          href="icons/apple-splash-1242-2688.jpg"
          media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
        />
        <link
          rel="apple-touch-startup-image"
          href="icons/apple-splash-2688-1242.jpg"
          media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
        />
        <link
          rel="apple-touch-startup-image"
          href="icons/apple-splash-828-1792.jpg"
          media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
        />
        <link
          rel="apple-touch-startup-image"
          href="icons/apple-splash-1792-828.jpg"
          media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
        />
        <link
          rel="apple-touch-startup-image"
          href="icons/apple-splash-1242-2208.jpg"
          media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
        />
        <link
          rel="apple-touch-startup-image"
          href="icons/apple-splash-2208-1242.jpg"
          media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
        />
        <link
          rel="apple-touch-startup-image"
          href="icons/apple-splash-750-1334.jpg"
          media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
        />
        <link
          rel="apple-touch-startup-image"
          href="icons/apple-splash-1334-750.jpg"
          media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
        />
        <link
          rel="apple-touch-startup-image"
          href="icons/apple-splash-640-1136.jpg"
          media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
        />
        <link
          rel="apple-touch-startup-image"
          href="icons/apple-splash-1136-640.jpg"
          media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
        />
      </Head>
      <input
        type="checkbox"
        id="my-modal-3"
        className={"modal-toggle"}
        checked={isModalOpen}
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
            ✕
          </label>
          <div className="flex max-h-screen items-center justify-center gap-x-6 pb-1">
            <InformationBox weight={weight} height={height} sex={sex} />
          </div>
          <div className="max-h-full overflow-x-scroll pt-2">
            <table className="table-zebra table-compact w-full ">
              <thead>
                <tr>
                  <th>
                    Drugs{" "}
                    {isObese.current ? (
                      <div className="badge badge-error ml-1 gap-1">Obese</div>
                    ) : (
                      <div className="badge badge-success ml-1 gap-1">
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
      <main>
        <div className="min-h-screen overflow-auto bg-base-200">
          <NavBar
            cookies={cookies}
            setWeight={setWeight}
            setHeight={setHeight}
            setSex={setSex}
            setChangeFromRecents={setChangeFromRecents}
          />
          <div className="mx-3 my-5">
            <div className="container mx-auto max-w-screen-md rounded-2xl bg-base-100 px-6 py-5 text-base-content drop-shadow-md">
              <div className="prose-lg p-3 text-center font-bold text-base-content lg:prose-xl">
                <h1>PointPED</h1>
              </div>
              <p className="text-center text-error">
                demo version don't use in real setting
              </p>
              {isFormError && (
                <div className="alert alert-error shadow-lg">
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
                  type="number"
                  step=".01" // allow decimal
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
                  type="number"
                  placeholder="range 45-120"
                  step=".01" // allow decimal
                  value={height}
                  className={`input-bordered input w-full 
                  ${!isHeightValid.current && "input-error"} ${
                    changeFromRecents && "input-info"
                  }`}
                  // pattern="/\d+\.?\d*$/"
                  inputMode="decimal"
                  onChange={(e) => {
                    setHeight((height) =>
                      e.target.validity.valid ? e.target.value : height
                    );
                    setChangeFromRecents(false);
                  }}
                />
              </div>
              <label className="label">
                <span className="label-text">
                  Select Sex<span className="text-error"> *</span>
                </span>
              </label>
              <SexSelectBox
                onChange={(e) => setSex(e)}
                value={sex}
                classNames={`${changeFromRecents && "outline-blue"}`}
              />
              <div
                className={`flex items-center justify-center gap-x-6 py-2 pt-3 `}
              >
                <label
                  onClick={(event) => {
                    setIsFormError(false);
                    setFormError("");
                    try {
                      setIsModalOpen(
                        validateForm(weight, height, sex, selectedDrug)
                      );
                      handleCookies(weight, height, sex, setCookies, cookies);
                    } catch (e) {
                      console.error(e);
                      setIsFormError(true);
                      setFormError(e);
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
        </div>
      </main>
    </>
  );
}
