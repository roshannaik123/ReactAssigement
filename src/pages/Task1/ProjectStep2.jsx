import { useState } from "react";
import { X, ChevronLeft, ChevronDown } from "lucide-react";
import StepIndicator from "../../components/StepIndicator";
import Footer from "../../components/Footer";

const TABS = [
  { id: "time-and-materials", label: "Time & Materials" },
  { id: "fixed-fee", label: "Fixed Fee" },
  { id: "non-billable", label: "Non-Billable" },
];

const RATE_OPTIONS = [
  "Project Hourly Rate",
  "Rate by Team Member",
  "Rate by Task",
];
const BUDGET_OPTIONS = ["Hours per Person", "Total Hours", "Total Fees"];

export default function ProjectStep2({
  formData,
  updateFormData,
  onNext,
  onBack,
  onClose,
  currentStep = 1,
  totalSteps = 4,
}) {
  const [errors, setErrors] = useState({});

  const activeTab = formData.projectType || "time-and-materials";

  const handleTabChange = (tabId) => {
    updateFormData({ projectType: tabId });
    setErrors({});
  };

  const validate = () => {
    const newErrors = {};
    if (activeTab === "time-and-materials") {
      if (!formData.hourlyRate) newErrors.hourlyRate = "Enter an hourly rate";
      if (
        formData.emailAlerts &&
        (formData.alertThreshold === "" || formData.alertThreshold === null)
      ) {
        newErrors.alertThreshold = "Enter a threshold percentage";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) onNext();
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
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold text-center text-gray-900">
          Project type
        </h2>
        <p className="text-sm text-gray-500 text-center mt-1">
          Don&apos;t panic — You can also customize this types in settings
        </p>

        {/* Tabs */}
        <div className="flex mt-6 border border-gray-200 rounded-md overflow-hidden text-xs sm:text-sm">
          {TABS.map((tab, i) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleTabChange(tab.id)}
              className={`flex-1 py-2 px-1 sm:px-2 transition-colors ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white font-medium"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              } ${i !== TABS.length - 1 ? "border-r border-gray-200" : ""}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Time & Materials content */}
        {activeTab === "time-and-materials" && (
          <div className="mt-6 space-y-5">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Hourly</h3>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                We need hourly rates to track your project&apos;s billable amount.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mt-3">
                <div className="relative flex-1">
                  <select
                    value={formData.rateBasis || RATE_OPTIONS[0]}
                    onChange={(e) =>
                      updateFormData({ rateBasis: e.target.value })
                    }
                    className="w-full appearance-none border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {RATE_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  />
                </div>

                <div
                  className={`flex items-center border rounded-md px-3 py-2 w-full sm:w-40 ${
                    errors.hourlyRate
                      ? "border-red-400"
                      : "border-gray-300 focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500"
                  }`}
                >
                  <span className="text-gray-400 text-sm mr-1">₹</span>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.hourlyRate}
                    onChange={(e) =>
                      updateFormData({ hourlyRate: e.target.value })
                    }
                    placeholder="0.00"
                    className="w-full text-sm outline-none"
                  />
                </div>
              </div>
              {errors.hourlyRate && (
                <p className="text-xs text-red-500 mt-1">{errors.hourlyRate}</p>
              )}
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900">Budget</h3>
              <p className="text-sm text-gray-500 mt-0.5">
                We need hourly rates to track your project&apos;s billable amount.
              </p>

              <div className="relative mt-3">
                <select
                  value={formData.budgetBasis || BUDGET_OPTIONS[0]}
                  onChange={(e) =>
                    updateFormData({ budgetBasis: e.target.value })
                  }
                  className="w-full appearance-none border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                >
                  {BUDGET_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={16}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.budgetResetsMonthly}
                  onChange={(e) =>
                    updateFormData({ budgetResetsMonthly: e.target.checked })
                  }
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                Budget resets every month
              </label>

              <div className="flex items-center gap-2 text-sm text-gray-700">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.emailAlerts}
                    onChange={(e) =>
                      updateFormData({ emailAlerts: e.target.checked })
                    }
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  Send email alerts if project exceeds
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.alertThreshold}
                  onChange={(e) =>
                    updateFormData({ alertThreshold: e.target.value })
                  }
                  disabled={!formData.emailAlerts}
                  className={`w-16 border rounded-md px-2 py-1 text-sm text-center outline-none ${
                    errors.alertThreshold
                      ? "border-red-400"
                      : "border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  } disabled:bg-gray-50 disabled:text-gray-400`}
                />
                <span className="text-gray-500">% of budget</span>
              </div>
              {errors.alertThreshold && (
                <p className="text-xs text-red-500">{errors.alertThreshold}</p>
              )}
            </div>
          </div>
        )}

        {/* Fixed Fee content */}
        {activeTab === "fixed-fee" && (
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-gray-900">Fixed Fee</h3>
            <p className="text-sm text-gray-500 mt-1">
              Set a total project fee instead of billing by the hour.
            </p>
            <div className="mt-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Total project fee
              </label>
              <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 w-full focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500">
                <span className="text-gray-400 text-sm mr-1">₹</span>
                <input
                  type="number"
                  min="0"
                  value={formData.fixedFee || ""}
                  onChange={(e) => updateFormData({ fixedFee: e.target.value })}
                  placeholder="0.00"
                  className="w-full text-sm outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* Non-Billable content */}
        {activeTab === "non-billable" && (
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-gray-900">Non-Billable</h3>
            <p className="text-sm text-gray-500 mt-1">
              This project won&apos;t be billed to a client. No rate or budget
              tracking needed.
            </p>
          </div>
        )}
      </div>

      {/* Footer nav */}
      <div>
        <Footer onBack={onBack} onNext={handleNext} />
        <StepIndicator totalSteps={totalSteps} currentStep={currentStep} />
      </div>
    </form>
  );
}
