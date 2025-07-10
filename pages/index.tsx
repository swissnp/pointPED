import Head from "next/head";
import NavBar from "@/components/NavBar";
import { useState, useRef } from "react";
import { calculateWeight } from "@/components/calculation";
import { CookiesProvider } from "react-cookie";
import { handleCookies } from "@/utils/cookieHandler";
import { RecentCalculation } from "@/types/cookies";
import { FormData } from "@/types/schema";
import DosageForm, { DosageFormHandle } from "@/components/DosageForm";
import ResultsModal from "@/components/ResultsModal";

export default function Root() {
  return (
    <CookiesProvider>
      <Home />
    </CookiesProvider>
  );
}

export function Home() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [calculatedWeight, setCalculatedWeight] = useState<number | number[]>(0);
  const [isObese, setIsObese] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<FormData | null>(null);
  const formRef = useRef<DosageFormHandle>(null);
  const [changeFromRecents, setChangeFromRecents] = useState<boolean>(false);

  const onSubmit = (data: FormData) => {
    const weightResult = calculateWeight(data.weight, data.height, data.sex as "Male" | "Female");
    setCalculatedWeight(weightResult);
    setIsObese(Array.isArray(weightResult));
    setFormValues(data);

    handleCookies(
      Number(data.weight),
      Number(data.height),
      data.sex as "Male" | "Female",
      Number(data.age),
      data.ageUnit
    );

    setIsModalOpen(true);
    setChangeFromRecents(false);
  };

  const handleReset = () => {
    setIsModalOpen(false);
    setChangeFromRecents(false);
    setFormValues(null);
  };

  const loadFromRecents = (recent: RecentCalculation) => {
    if (formRef.current) {
      formRef.current.loadRecent(recent);
    }
    setChangeFromRecents(true);
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
      <ResultsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formValues={formValues}
        calculatedWeight={calculatedWeight}
        isObese={isObese}
      />
      <main className="bg-base-200 min-h-screen pb-20">
          <NavBar
            loadFromRecents={loadFromRecents}
            setChangeFromRecents={setChangeFromRecents}
          />
          <div className="mx-3">
            <DosageForm 
              ref={formRef}
              onFormSubmit={onSubmit}
              onReset={handleReset}
              changeFromRecents={changeFromRecents}
            />
          </div>
      </main>
    </>
  );
}
