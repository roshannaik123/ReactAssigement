import React from "react";

const StepIndicator = ({ totalSteps, currentStep }) => {
  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <span
          key={index}
          className={`transition-all duration-200 rounded-full ${
            index === currentStep
              ? "w-4 h-2 bg-gray-400" // active: elongated pill, gray
              : "w-2 h-2 bg-gray-200" // inactive: small circle, white/light
          }`}
        />
      ))}
    </div>
  );
};

export default StepIndicator;
