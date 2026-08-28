import { Check } from "lucide-react";

const STEPS = [
  { number: 1, label: "Your Profile" },
  { number: 2, label: "Business Information" },
  { number: 3, label: "Additional Users" },
];

export default function StepTabs({ currentStep }) {
  const pillWidthClass =
    currentStep === 1
      ? "w-[33.333%]"
      : currentStep === 2
        ? "w-[66.666%]"
        : "w-full rounded-r-none";

  return (
    <div className="relative w-full bg-[#f0f3fd] rounded-t-2xl overflow-hidden py-3.5 px-4 sm:px-8">
      <div
        className={`absolute left-0 top-0 bottom-0 bg-gradient-to-r from-[#a0e0ff] via-[#6cbcfd] to-[#4d99ff] rounded-r-full shadow-md transition-all duration-300 ease-in-out ${pillWidthClass}`}
      />

      {/* Tabs Content */}
      <div className="relative z-10 flex items-center justify-between w-full">
        {STEPS.map((step) => {
          const isActiveOrPast = step.number <= currentStep;
          const isComplete = step.number < currentStep;

          return (
            <div
              key={step.number}
              className="flex items-center justify-center gap-1.5 sm:gap-3 flex-1 py-1"
            >
              {/* Circle Indicator */}
              <span
                className={`flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full text-xs font-semibold flex-shrink-0 transition-colors ${
                  isActiveOrPast
                    ? "bg-white text-sky-500 shadow-sm"
                    : "bg-[#b8c6e2] text-white"
                }`}
              >
                {isComplete ? (
                  <Check size={14} className="stroke-[2.5]" />
                ) : (
                  step.number
                )}
              </span>

              {/* Text Label */}
              <span
                className={`text-xs sm:text-base font-normal truncate transition-colors ${
                  isActiveOrPast ? "text-white" : "text-[#94a5c5]"
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
