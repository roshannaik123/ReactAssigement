import { useState, useEffect } from "react";
import ProjectStep1 from "./ProjectStep1";
import toast from "react-hot-toast";

import ProjectStep2 from "./ProjectStep2";
import ProjectStep3 from "./ProjectStep3";
import ProjectStep4 from "./ProjectStep4";

const STORAGE_KEY = "projects"; // where the list of created projects lives
const DRAFT_KEY = "projectDraft"; // where in-progress wizard data lives

const TOTAL_STEPS = 4;

const initialFormData = {
  projectName: "",
  client: "",
  startDate: "",
  endDate: "",
  notes: "",
  projectType: "time-and-materials",
  hourlyRate: "",
  budgetBasis: "",
  budgetResetsMonthly: false,
  emailAlerts: true,
  alertThreshold: 80,
  view: "board",
  permission: "admins",
  tasks: [],
  team: [],
};

export default function ProjectForm({ onClose }) {
  const [currentStep, setCurrentStep] = useState(0);

  //formData
  const [formData, setFormData] = useState(() => {
    try {
      const saved = localStorage.getItem(DRAFT_KEY);
      return saved
        ? { ...initialFormData, ...JSON.parse(saved) }
        : initialFormData;
    } catch {
      return initialFormData;
    }
  });

  //persiting data fetching using Draft Key.
  useEffect(() => {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(formData));
  }, [formData]);

  const updateFormData = (fields) => {
    setFormData((prev) => ({ ...prev, ...fields }));
  };

  const goNext = () => setCurrentStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
  const goBack = () => setCurrentStep((s) => Math.max(s - 1, 0));

  //handelCreateProject passed as prop for lastStep .previosuly created data get stored in StorgeKey
  const handleCreateProject = () => {
    try {
      const existing = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

      const newProject = {
        id: Date.now().toString(), // simple unique id
        ...formData,
        createdAt: new Date().toISOString(),
      };

      const updated = [...existing, newProject];
      //
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

      localStorage.removeItem(DRAFT_KEY);

      // Show success toast before resetting/closing
      toast.success("Project created successfully!");

      setFormData(initialFormData);
      setCurrentStep(0);
      onClose?.(newProject);
    } catch (err) {
      console.error("Failed to save project to localStorage:", err);
    }
  };

  const stepProps = {
    formData,
    updateFormData,
    onNext: goNext,
    onBack: goBack,
    onClose,
    currentStep,
    totalSteps: TOTAL_STEPS,
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {currentStep === 0 && <ProjectStep1 {...stepProps} />}
        {currentStep === 1 && <ProjectStep2 {...stepProps} />}
        {currentStep === 2 && <ProjectStep3 {...stepProps} />}
        {currentStep === 3 && (
          <ProjectStep4 {...stepProps} onCreate={handleCreateProject} />
        )}
      </div>
    </div>
  );
}
