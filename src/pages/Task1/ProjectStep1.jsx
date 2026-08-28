import { useState } from "react";
import { X, ChevronLeft, Plus, Calendar } from "lucide-react";
import StepIndicator from "../../components/StepIndicator";
import Footer from "../../components/Footer";

export default function ProjectStep1({
  formData,
  updateFormData,
  onNext,
  onBack,
  onClose,
  currentStep = 0,
  totalSteps = 4,
}) {
  const [errors, setErrors] = useState({});
  const [addingNewClient, setAddingNewClient] = useState(false);

  const clients = ["Acme Corp", "Globex Inc", "Initech", "Umbrella Co"];

  const handleChange = (field, e) => {
    updateFormData({ [field]: e.target.value });
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }));
  };
  // validition
  const validate = () => {
    const newErrors = {};
    if (!formData.projectName?.trim()) {
      newErrors.projectName = "Project name is required";
    }
    if (!formData.client?.trim()) {
      newErrors.client = "Please select or add a client";
    }
    if (!formData.startDate) {
      newErrors.dates = "Start date is required";
    }
    if (!formData.endDate) {
      newErrors.dates = "End date is required";
    }
    if (
      formData.startDate &&
      formData.endDate &&
      formData.startDate > formData.endDate
    ) {
      newErrors.dates = "End date must be after start date";
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
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        aria-label="Close"
      >
        <X size={20} />
      </button>

      <h2 className="text-xl font-semibold text-center text-gray-900">
        Create a project
      </h2>

      <div className="mt-6 space-y-4 sm:space-y-5">
        {/* Project name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Project name
          </label>
          <input
            type="text"
            value={formData.projectName || ""}
            onChange={(e) => handleChange("projectName", e)}
            placeholder="Enter project name here"
            className={`w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 ${
              errors.projectName
                ? "border-red-400 focus:ring-red-400 focus:border-red-400"
                : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            }`}
          />
          {errors.projectName && (
            <p className="text-xs text-red-500 mt-1">{errors.projectName}</p>
          )}
        </div>

        {/* Client */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Client
          </label>
          <div className="flex items-center gap-2 sm:gap-3">
            <select
              value={addingNewClient ? "" : formData.client || ""}
              onChange={(e) => {
                setAddingNewClient(false);
                handleChange("client", e);
              }}
              disabled={addingNewClient}
              className="flex-1 min-w-0 border border-gray-300 rounded-md px-2.5 sm:px-3 py-2 text-xs sm:text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-400 truncate"
            >
              <option value="">Select a client</option>
              {clients.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <span className="text-xs sm:text-sm text-gray-400 flex-shrink-0">Or</span>

            <button
              type="button"
              onClick={() => {
                setAddingNewClient((prev) => !prev);
                updateFormData({ client: "" });
              }}
              className={`flex items-center gap-1 border rounded-md px-2.5 sm:px-3 py-2 text-xs sm:text-sm whitespace-nowrap flex-shrink-0 ${
                addingNewClient
                  ? "border-blue-500 text-blue-600 bg-blue-50"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Plus size={16} /> New Client
            </button>
          </div>

          {addingNewClient && (
            <input
              type="text"
              autoFocus
              value={formData.client || ""}
              onChange={(e) => handleChange("client", e)}
              placeholder="Enter new client name"
              className="mt-2 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          )}

          {errors.client && (
            <p className="text-xs text-red-500 mt-1">{errors.client}</p>
          )}
        </div>

        {/* Dates */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Dates
          </label>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div className="relative flex-1">
              <Calendar
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
              <input
                type="date"
                value={formData.startDate || ""}
                onChange={(e) => handleChange("startDate", e)}
                className="w-full border border-gray-300 rounded-md pl-9 pr-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <span className="hidden sm:inline text-gray-400 text-center">-</span>
            <div className="relative flex-1">
              <Calendar
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
              <input
                type="date"
                value={formData.endDate || ""}
                onChange={(e) => handleChange("endDate", e)}
                className="w-full border border-gray-300 rounded-md pl-9 pr-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          {errors.dates && (
            <p className="text-xs text-red-500 mt-1">{errors.dates}</p>
          )}
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Notes
          </label>
          <textarea
            rows={4}
            value={formData.notes || ""}
            onChange={(e) => handleChange("notes", e)}
            placeholder="Optional"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Footer nav */}
      <Footer onBack={onBack} onNext={handleNext} />

      <StepIndicator totalSteps={totalSteps} currentStep={currentStep} />
    </form>
  );
}
