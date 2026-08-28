import React from "react";
import { ChevronLeft } from "lucide-react";

const Footer = ({ onBack, onNext, label = "Next", type = "submit" }) => {
  return (
    <div className="flex items-center justify-between mt-8">
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
      >
        <ChevronLeft size={16} /> Back
      </button>
      <button
        type={type}
        onClick={type === "button" ? onNext : undefined}
        className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md px-6 py-2 transition-colors"
      >
        {label}
      </button>
    </div>
  );
};

export default Footer;
