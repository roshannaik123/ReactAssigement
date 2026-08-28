import { useState, useEffect } from "react";
import { HelpCircle, Check, X, ChevronRight, Upload } from "lucide-react";

export default function BusinessInfoStep({
  formData,
  updateFormData,
  registerValidator,
}) {
  const [errors, setErrors] = useState({});
  const [showTooltip, setShowTooltip] = useState(false);

  const handleChange = (field) => (e) => {
    updateFormData({ [field]: e.target.value });
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }));
  };

  const toggleDocumentStatus = (docField) => {
    updateFormData({ [docField]: !formData[docField] });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.brandName?.trim())
      newErrors.brandName = "Brand name is required";
    if (!formData.brandType?.trim())
      newErrors.brandType = "Brand type is required";
    if (!formData.streetAddress?.trim())
      newErrors.streetAddress = "Street address is required";
    if (!formData.city?.trim()) newErrors.city = "City is required";
    if (!formData.zipCode?.trim()) newErrors.zipCode = "Zip code is required";
    if (!formData.taxId?.trim()) newErrors.taxId = "Tax ID is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    registerValidator?.(validate);
  }, [formData]);

  const inputClass = (field) =>
    `w-full border rounded-md px-4 py-3 text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-1 ${
      errors[field]
        ? "border-red-400 focus:ring-red-400 focus:border-red-400"
        : "border-gray-300 focus:ring-blue-400 focus:border-blue-400"
    }`;

  return (
    <div>
      <p className="text-sm text-sky-400 font-medium text-center">Step 2</p>
      <h2 className="text-3xl font-normal text-center text-slate-700 mt-1">
        Business Information
      </h2>
      <p className="text-center text-gray-400 mt-2 max-w-md mx-auto text-sm">
        Please, enter information about your company.
      </p>

      {/* GENERAL INFORMATION */}
      <div className="mt-8">
        <h3 className="text-s font-semibold text-sky-400 uppercase tracking-wider mb-4">
          General Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
          {/* Brand Name */}
          <div>
            <label className="block text-gray-700 mb-2">
              Brand Name<span className="text-blue-500">*</span>
            </label>
            <input
              type="text"
              value={formData.brandName || ""}
              onChange={handleChange("brandName")}
              placeholder="Input Your Brand Name"
              className={inputClass("brandName")}
            />
            {errors.brandName && (
              <p className="text-xs text-red-500 mt-1">{errors.brandName}</p>
            )}
          </div>

          {/* Brand Type */}
          <div className="relative">
            <div className="flex items-center gap-1.5 mb-2">
              <label className="block text-gray-700">
                Brand Type<span className="text-blue-500">*</span>
              </label>
              <div
                className="relative inline-block"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                <button
                  type="button"
                  onClick={() => setShowTooltip(!showTooltip)}
                  className="text-gray-400 hover:text-gray-600 focus:outline-none flex items-center"
                >
                  <HelpCircle size={15} />
                </button>

                {/* Tooltip */}
                {showTooltip && (
                  <div className="absolute z-30 left-6 top-1/2 -translate-y-1/2 w-80 p-3 bg-slate-700 text-white text-xs rounded-lg shadow-xl border border-slate-600 leading-relaxed pointer-events-none">
                    <p className="mb-2">
                      <strong className="text-sky-300 font-semibold">
                        Local:
                      </strong>{" "}
                      Brands with distribution in 3 divisions or less OR
                      multiple divisions but a total of 150 stores or less.
                    </p>
                    <p>
                      <strong className="text-sky-300 font-semibold">
                        National:
                      </strong>{" "}
                      Brands with distribution in 4 or more divisions or in more
                      than 150 stores.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <select
              value={formData.brandType || ""}
              onChange={handleChange("brandType")}
              className={`${inputClass("brandType")} bg-white appearance-none pr-8 cursor-pointer`}
            >
              <option value="" disabled hidden>
                Select Type of Your Brand
              </option>
              <option value="Local">Local</option>
              <option value="National">National</option>
            </select>
            <div className="pointer-events-none absolute right-3 top-[46px] text-gray-400">
              ▼
            </div>
            {errors.brandType && (
              <p className="text-xs text-red-500 mt-1">{errors.brandType}</p>
            )}
          </div>

          {/* Street Address */}
          <div>
            <label className="block text-gray-700 mb-2">
              Street Address<span className="text-blue-500">*</span>
            </label>
            <input
              type="text"
              value={formData.streetAddress || ""}
              onChange={handleChange("streetAddress")}
              placeholder="Input Your Street Address"
              className={inputClass("streetAddress")}
            />
            {errors.streetAddress && (
              <p className="text-xs text-red-500 mt-1">
                {errors.streetAddress}
              </p>
            )}
          </div>

          {/* City */}
          <div>
            <label className="block text-gray-700 mb-2">
              City<span className="text-blue-500">*</span>
            </label>
            <input
              type="text"
              value={formData.city || ""}
              onChange={handleChange("city")}
              placeholder="Input City"
              className={inputClass("city")}
            />
            {errors.city && (
              <p className="text-xs text-red-500 mt-1">{errors.city}</p>
            )}
          </div>

          {/* Zip Code */}
          <div>
            <label className="block text-gray-700 mb-2">
              Zip Code<span className="text-blue-500">*</span>
            </label>
            <input
              type="text"
              value={formData.zipCode || ""}
              onChange={handleChange("zipCode")}
              placeholder="Input Zip Code"
              className={inputClass("zipCode")}
            />
            {errors.zipCode && (
              <p className="text-xs text-red-500 mt-1">{errors.zipCode}</p>
            )}
          </div>

          {/* Tax ID Number */}
          <div>
            <label className="block text-gray-700 mb-2">
              Tax ID Number<span className="text-blue-500">*</span>
            </label>
            <input
              type="text"
              value={formData.taxId || ""}
              onChange={handleChange("taxId")}
              placeholder="Input Tax ID Number"
              className={inputClass("taxId")}
            />
            {errors.taxId && (
              <p className="text-xs text-red-500 mt-1">{errors.taxId}</p>
            )}
          </div>
        </div>
      </div>

      {/* DOCUMENTS */}
      <div className="mt-8">
        <h3 className="text-xs font-bold text-sky-400 uppercase tracking-wider">
          Documents
        </h3>
        <p className="text-xs text-gray-400 mt-1 mb-3">
          Once the following documents are signed, you'll be ready to get
          started
        </p>

        <div className="space-y-3">
          {/* Document 1 */}
          <div className="flex items-center justify-between border border-gray-300 rounded-md px-4 py-3 bg-white hover:border-gray-400 transition-colors">
            <span className="text-gray-500 text-sm sm:text-base">
              Electronically sign the agreement(s)
            </span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => toggleDocumentStatus("agreementSigned")}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                title="Toggle signed status"
              >
                {formData.agreementSigned ? (
                  <Check size={18} className="text-emerald-500 stroke-[3]" />
                ) : (
                  <X size={18} className="text-red-500 stroke-[3]" />
                )}
              </button>
              <button
                type="button"
                onClick={() => toggleDocumentStatus("agreementSigned")}
                className="bg-indigo-400 hover:bg-indigo-500 text-white rounded-md p-2 flex items-center justify-center transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Document 2 */}
          <div className="flex items-center justify-between border border-gray-300 rounded-md px-4 py-3 bg-white hover:border-gray-400 transition-colors">
            <span className="text-gray-500 text-sm sm:text-base">
              Non adult beverage Kroger market supplier waiver and release
            </span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => toggleDocumentStatus("kroggerWaiverSigned")}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                title="Toggle signed status"
              >
                {formData.kroggerWaiverSigned ? (
                  <Check size={18} className="text-emerald-500 stroke-[3]" />
                ) : (
                  <X size={18} className="text-red-500 stroke-[3]" />
                )}
              </button>
              <button
                type="button"
                onClick={() => toggleDocumentStatus("kroggerWaiverSigned")}
                className="bg-indigo-400 hover:bg-indigo-500 text-white rounded-md p-2 flex items-center justify-center transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* COI PDF UPLOAD */}
      <div className="mt-8">
        <h3 className="text-xs font-bold text-sky-400 uppercase tracking-wider">
          COI PDF Upload
        </h3>
        <p className="text-xs text-gray-400 mt-1 mb-3">
          Once the following documents are signed, you'll be ready to get
          started
        </p>

        <div className="flex items-center justify-between border border-gray-300 rounded-md px-4 py-3 bg-white hover:border-gray-400 transition-colors">
          <span className="text-gray-500 text-sm sm:text-base">
            Electronically sign the agreement(s)
          </span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => toggleDocumentStatus("coiUploaded")}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              title="Toggle uploaded status"
            >
              {formData.coiUploaded ? (
                <Check size={18} className="text-emerald-500 stroke-[3]" />
              ) : (
                <X size={18} className="text-red-500 stroke-[3]" />
              )}
            </button>
            <button
              type="button"
              onClick={() => toggleDocumentStatus("coiUploaded")}
              className="bg-indigo-400 hover:bg-indigo-500 text-white rounded-md p-2 flex items-center justify-center transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
