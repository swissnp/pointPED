import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, FormData } from "@/types/schema";
import MultiSelectSearchBox from "@/components/multiSelectSearchBox";
import SexSelectBox from "@/components/sexSelectBox";
import { RecentCalculation } from "@/types/cookies";
import { TrashIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import React, { useImperativeHandle, forwardRef } from "react";

interface DosageFormProps {
  onFormSubmit: (data: FormData) => void;
  onReset: () => void;
  changeFromRecents: boolean;
}

export interface DosageFormHandle {
  loadRecent: (recent: RecentCalculation) => void;
}

const DosageForm = forwardRef<DosageFormHandle, DosageFormProps>(({ onFormSubmit, onReset, changeFromRecents }, ref) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      weight: "",
      height: "",
      sex: "",
      age: "",
      ageUnit: "months",
      selectedDrug: [],
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  useImperativeHandle(ref, () => ({
    loadRecent(recent: RecentCalculation) {
      setValue("weight", String(recent.weight));
      setValue("height", String(recent.height));
      setValue("sex", recent.sex);
      setValue("age", String(recent.age));
      setValue("ageUnit", recent.ageUnit);
    }
  }));

  const handleReset = () => {
    reset();
    onReset();
  };

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className="z-0 my-8 container relative top-12 mx-auto max-w-2xl rounded-2xl bg-base-100 p-8 text-base-content shadow-xl"
    >
      <div className="mb-6 text-center">
        <h1 className="text-5xl font-bold">
          <span className="text-primary">Point</span>
          <span>PED</span>
        </h1>
        <p className="text-base-content/70 mt-1">
          Pediatric Emergency Drug Doses
        </p>
      </div>

      <div className="alert bg-amber-300/50 text-amber-900 shadow-sm mb-8 rounded-lg">
        <div className="flex-1 items-center">
            <ExclamationTriangleIcon className="h-6 w-6 mr-2" />
            <span className="font-semibold">Demo version. Do not use in a real clinical setting.</span>
        </div>
      </div>

      {changeFromRecents && (
        <div className="alert alert-info my-2 py-4">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="h-6 w-6 flex-shrink-0 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span>Loaded data from recents.</span>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Weight</span>
          </label>
          <div className="relative">
            <input
              {...register("weight")}
              type="number"
              placeholder="e.g., 10"
              className="input-bordered input w-full pr-12"
            />
            <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-base-content/50">
              kg
            </span>
          </div>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Height</span>
          </label>
          <div className="relative">
            <input
              {...register("height")}
              type="number"
              placeholder="e.g., 75"
              className="input-bordered input w-full pr-12"
            />
            <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-base-content/50">
              cm
            </span>
          </div>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Sex</span>
          </label>
          <Controller
            name="sex"
            control={control}
            render={({ field }) => (
              <SexSelectBox
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Age</span>
          </label>
          <div className="relative">
            <input
              {...register("age")}
              type="number"
              placeholder="e.g., 2"
              className="input-bordered input w-full"
            />
            <Controller
              name="ageUnit"
              control={control}
              render={({ field: { onChange, value } }) => (
                <div className="absolute inset-y-0 right-0 flex items-center p-1">
                  <button type="button" onClick={() => onChange('years')} className={`btn btn-sm ${value === 'years' ? 'btn-primary' : 'btn-ghost'}`}>Years</button>
                  <button type="button" onClick={() => onChange('months')} className={`btn btn-sm ${value === 'months' ? 'btn-primary' : 'btn-ghost'}`}>Months</button>
                </div>
              )}
            />
          </div>
        </div>
        <div className="form-control col-span-1 md:col-span-2">
          <label className="label">
            <span className="label-text">Drugs</span>
          </label>
          <Controller
            name="selectedDrug"
            control={control}
            render={({ field }) => (
              <MultiSelectSearchBox
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </div>
      </div>

      <div className="pt-4 text-center text-sm text-error">
        {errors.weight?.message && <p>{errors.weight.message}</p>}
        {errors.height?.message && <p>{errors.height.message}</p>}
        {errors.sex?.message && <p>{errors.sex.message}</p>}
        {errors.age?.message && <p>{errors.age.message}</p>}
        {errors.selectedDrug?.message && <p>{errors.selectedDrug.message}</p>}
      </div>

      <div className="flex justify-between items-center pt-8">
        <button
          type="button"
          className="btn-ghost btn"
          onClick={handleReset}
        >
          <TrashIcon className="h-5 w-5" />
          <span className="ml-2 uppercase">Reset</span>
        </button>
        <button type="submit" className="btn-primary btn">
          Calculate
        </button>
      </div>
    </form>
  );
});

DosageForm.displayName = "DosageForm";

export default DosageForm; 