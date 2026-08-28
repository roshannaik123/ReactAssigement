import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProfileStep from "./ProfileStep";
import BusinessInfoStep from "./BusinessInfoStep";
import AdditionalUsersStep from "./AdditionalUsersStep";
import AccountWizardLayout from "../../layout/AccountWizardLayout";

const DRAFT_KEY = "accountDraft";
const ACCOUNTS_KEY = "accounts";

const TOTAL_STEPS = 3;

const initialAccountData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  brandName: "",
  brandType: "",
  streetAddress: "",
  city: "",
  zipCode: "",
  taxId: "",
  agreementSigned: true,
  kroggerWaiverSigned: false,
  coiUploaded: true,
  additionalUsers: [],
};

export default function AccountForm({ onClose }) {
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState(() => {
    try {
      const saved = localStorage.getItem(DRAFT_KEY);
      return saved
        ? { ...initialAccountData, ...JSON.parse(saved) }
        : initialAccountData;
    } catch {
      return initialAccountData;
    }
  });

  useEffect(() => {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(formData));
  }, [formData]);

  const updateFormData = (fields) => {
    setFormData((prev) => ({ ...prev, ...fields }));
  };

  const validatorRef = useRef(() => true);
  const registerValidator = (fn) => {
    validatorRef.current = fn;
  };

  const goNext = () => {
    const isValid = validatorRef.current();
    if (isValid) {
      setCurrentStep((s) => Math.min(s + 1, TOTAL_STEPS));
    }
  };

  const goBack = () => setCurrentStep((s) => Math.max(s - 1, 1));

  const handleSubmitAccount = () => {
    const isValid = validatorRef.current();
    if (!isValid) return;

    try {
      const existing = JSON.parse(localStorage.getItem(ACCOUNTS_KEY)) || [];
      const newAccount = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString(),
      };

      localStorage.setItem(
        ACCOUNTS_KEY,
        JSON.stringify([...existing, newAccount]),
      );
      localStorage.removeItem(DRAFT_KEY);

      setFormData(initialAccountData);
      setCurrentStep(1);
      onClose?.(newAccount);
    } catch (err) {
      console.error("Failed to save account to localStorage:", err);
    }
  };

  const stepProps = { formData, updateFormData, registerValidator };

  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === TOTAL_STEPS;

  const footer = (
    <div className="flex items-center justify-between w-full">
      <button
        type="button"
        onClick={onClose}
        className="flex items-center gap-1.5 text-blue-500 hover:text-blue-600 font-medium text-sm transition-colors"
      >
        <ChevronLeft size={16} /> Back to Login
      </button>

      <div className="flex items-center gap-3">
        {!isFirstStep && (
          <button
            type="button"
            onClick={goBack}
            className="flex items-center gap-1 px-5 py-2.5 rounded-lg border border-blue-400 text-blue-500 hover:bg-blue-50 font-medium text-sm transition-colors"
          >
            <ChevronLeft size={16} /> Previous Step
          </button>
        )}

        <button
          type="button"
          onClick={isLastStep ? handleSubmitAccount : goNext}
          className="flex items-center gap-1 bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white font-medium rounded-lg px-6 py-2.5 text-sm shadow-md transition-all"
        >
          {isLastStep ? "Create Account" : "Next Step"} <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );

  return (
    <AccountWizardLayout currentStep={currentStep} footer={footer}>
      {currentStep === 1 && <ProfileStep {...stepProps} />}
      {currentStep === 2 && <BusinessInfoStep {...stepProps} />}
      {currentStep === 3 && <AdditionalUsersStep {...stepProps} />}
    </AccountWizardLayout>
  );
}

