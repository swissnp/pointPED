import RenderComponent from "@/components/RenderDrug";
import InformationBox from "@/components/InformationBox";
import { FormData } from "@/types/schema";

interface ResultsModalProps {
  isOpen: boolean;
  onClose: () => void;
  formValues: FormData | null;
  calculatedWeight: number | number[];
  isObese: boolean;
}

export default function ResultsModal({ isOpen, onClose, formValues, calculatedWeight, isObese }: ResultsModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <>
      <input
        type="checkbox"
        id="my-modal-3"
        className={"modal-toggle"}
        checked={isOpen}
        onChange={() => {}}
        readOnly
      />

      <div className="modal text-base-content">
        <div className="modal-box w-11/12 max-w-lg" id="modal">
          <label
            htmlFor="my-modal-3"
            className="btn-sm btn-circle btn absolute right-2 top-2"
            onClick={onClose}
          >
            ✕
          </label>
          <div className="flex max-h-screen items-center justify-center gap-x-6 pb-1">
            {formValues && (
              <InformationBox 
                weight={formValues.weight} 
                height={formValues.height} 
                sex={formValues.sex} 
                age={formValues.age}
                ageUnit={formValues.ageUnit}
              />
            )}
          </div>
          <div className="max-h-full overflow-x-scroll pt-2">
            <table className="table-zebra table-compact w-full table-auto">
              <thead>
                <tr>
                  <th>
                    Drugs{" "}
                    {isObese ? (
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
              {formValues && (
                <RenderComponent
                  formValues={formValues}
                  calculatedWeight={calculatedWeight}
                />
              )}
            </table>
          </div>
        </div>
      </div>
    </>
  );
} 