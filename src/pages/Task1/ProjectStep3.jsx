import { X } from "lucide-react";
import Footer from "../../components/Footer";
import StepIndicator from "../../components/StepIndicator";

function ListIcon({ active }) {
  const stroke = active ? "#475569" : "#94a3b8";
  return (
    <svg width="68" height="68" viewBox="0 0 68 68" fill="none">
      <rect
        x="12"
        y="14"
        width="44"
        height="40"
        rx="6"
        stroke={stroke}
        strokeWidth="2"
      />
      {/* Checkbox 1 */}
      <rect
        x="18"
        y="22"
        width="8"
        height="8"
        rx="1.5"
        stroke={stroke}
        strokeWidth="1.8"
      />
      <line
        x1="30"
        y1="24"
        x2="48"
        y2="24"
        stroke={stroke}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <line
        x1="30"
        y1="28"
        x2="42"
        y2="28"
        stroke={stroke}
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      {/* Checkbox 2 */}
      <rect
        x="18"
        y="36"
        width="8"
        height="8"
        rx="1.5"
        stroke={stroke}
        strokeWidth="1.8"
      />
      <line
        x1="30"
        y1="38"
        x2="48"
        y2="38"
        stroke={stroke}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <line
        x1="30"
        y1="42"
        x2="42"
        y2="42"
        stroke={stroke}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BoardIcon({ active }) {
  const stroke = active ? "#475569" : "#94a3b8";
  return (
    <svg width="68" height="68" viewBox="0 0 68 68" fill="none">
      {/* Column 1 */}
      <rect
        x="12"
        y="14"
        width="12"
        height="8"
        rx="2"
        stroke={stroke}
        strokeWidth="1.8"
      />
      <rect
        x="12"
        y="24"
        width="12"
        height="18"
        rx="2"
        stroke={stroke}
        strokeWidth="1.8"
      />
      <line
        x1="15"
        y1="29"
        x2="21"
        y2="29"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="15"
        y1="34"
        x2="19"
        y2="34"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Column 2 (Center tall) */}
      <rect
        x="28"
        y="14"
        width="12"
        height="8"
        rx="2"
        stroke={stroke}
        strokeWidth="1.8"
      />
      <rect
        x="28"
        y="24"
        width="12"
        height="28"
        rx="2"
        stroke={stroke}
        strokeWidth="1.8"
      />
      <line
        x1="31"
        y1="29"
        x2="37"
        y2="29"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="31"
        y1="34"
        x2="35"
        y2="34"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Column 3 */}
      <rect
        x="44"
        y="14"
        width="12"
        height="8"
        rx="2"
        stroke={stroke}
        strokeWidth="1.8"
      />
      <rect
        x="44"
        y="24"
        width="12"
        height="22"
        rx="2"
        stroke={stroke}
        strokeWidth="1.8"
      />
      <line
        x1="47"
        y1="29"
        x2="53"
        y2="29"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="47"
        y1="34"
        x2="51"
        y2="34"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

const VIEW_OPTIONS = [
  { id: "list", label: "List", Icon: ListIcon },
  { id: "board", label: "Board", Icon: BoardIcon },
];

export default function ProjectStep3({
  formData,
  updateFormData,
  onNext,
  onBack,
  onClose,
  currentStep = 2,
  totalSteps = 4,
}) {
  const selectedView = formData.view || "board";

  const handleNext = () => {
    onNext();
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleNext();
      }}
      className="w-full bg-white rounded-lg shadow-lg p-5 sm:p-8 relative min-h-[520px] sm:min-h-[580px] flex flex-col justify-between"
    >
      <div>
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Heading */}
        <h2 className="text-xl font-semibold text-center text-gray-900">
          Select a view
        </h2>
        <p className="text-sm text-gray-500 text-center mt-1">
          You can also customize this views in settings
        </p>

        {/* View Options Cards */}
        <div className="grid grid-cols-2 gap-4 mt-8">
          {VIEW_OPTIONS.map(({ id, label, Icon }) => {
            const isActive = selectedView === id;
            return (
              <div key={id} className="flex flex-col items-center">
                <button
                  type="button"
                  onClick={() => updateFormData({ view: id })}
                  className={`w-full h-36 rounded-xl border-2 flex items-center justify-center transition-all bg-white ${
                    isActive
                      ? "border-blue-500 shadow-sm"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <Icon active={isActive} />
                </button>
                <span
                  className={`mt-2.5 text-sm transition-colors ${
                    isActive
                      ? "text-gray-900 font-medium"
                      : "text-gray-400 font-normal"
                  }`}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer controls & Step indicator pinned at bottom */}
      <div>
        <Footer onBack={onBack} onNext={handleNext} />
        <StepIndicator totalSteps={totalSteps} currentStep={currentStep} />
      </div>
    </form>
  );
}
