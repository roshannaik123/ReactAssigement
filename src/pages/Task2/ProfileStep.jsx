import { useState, useEffect } from "react";

export default function ProfileStep({
  formData,
  updateFormData,
  registerValidator,
}) {
  const [errors, setErrors] = useState({});

  const handleChange = (field) => (e) => {
    updateFormData({ [field]: e.target.value });
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: null }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName?.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName?.trim())
      newErrors.lastName = "Last name is required";

    if (!formData.email?.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.phone?.trim()) newErrors.phone = "Phone number is required";

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

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
      <p className="text-sm text-gray-400 text-center">Step 1</p>
      <h2 className="text-3xl font-semibold text-center text-gray-800 mt-1">
        Your Profile
      </h2>
      <p className="text-center text-gray-500 mt-3 max-w-md mx-auto">
        Enter the login information for your account. You will be able to create
        additional users after registering.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 sm:gap-x-10 gap-y-5 sm:gap-y-6 mt-6 sm:mt-10">
        <div>
          <label className="block text-gray-700 mb-2">
            First Name<span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={formData.firstName || ""}
            onChange={handleChange("firstName")}
            className={inputClass("firstName")}
          />
          {errors.firstName && (
            <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 mb-2">
            Last Name<span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={formData.lastName || ""}
            onChange={handleChange("lastName")}
            placeholder="Input Your Last Name"
            className={inputClass("lastName")}
          />
          {errors.lastName && (
            <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 mb-2">
            Email<span className="text-red-400">*</span>
          </label>
          <input
            type="email"
            value={formData.email || ""}
            onChange={handleChange("email")}
            placeholder="Input Your Email"
            className={inputClass("email")}
          />
          {errors.email && (
            <p className="text-xs text-red-500 mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 mb-2">
            Phone Number<span className="text-red-400">*</span>
          </label>
          <input
            type="tel"
            value={formData.phone || ""}
            onChange={handleChange("phone")}
            placeholder="Input Your Phone Number"
            className={inputClass("phone")}
          />
          {errors.phone && (
            <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 mb-2">
            Password<span className="text-red-400">*</span>
          </label>
          <input
            type="password"
            value={formData.password || ""}
            onChange={handleChange("password")}
            placeholder="Create Password"
            className={inputClass("password")}
          />
          {errors.password && (
            <p className="text-xs text-red-500 mt-1">{errors.password}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 mb-2">
            Confirm Password<span className="text-red-400">*</span>
          </label>
          <input
            type="password"
            value={formData.confirmPassword || ""}
            onChange={handleChange("confirmPassword")}
            placeholder="Confirm Your Password"
            className={inputClass("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-xs text-red-500 mt-1">
              {errors.confirmPassword}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
