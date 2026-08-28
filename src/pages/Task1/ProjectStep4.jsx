import { useState, useRef, useEffect } from "react";
import { X, ChevronLeft, Check } from "lucide-react";
import StepIndicator from "../../components/StepIndicator";
import Footer from "../../components/Footer";

const ALL_PEOPLE = [
  "Steve Mathew",
  "Robert Pattinson",
  "Steve Waugh",
  "Fanny Russell",
  "Rodney Meyer",
  "Ellen Simmons",
  "Virgie Kim",
  "Emma Castro",
];

export default function ProjectStep4({
  formData,
  updateFormData,
  onBack,
  onClose,
  onCreate,
  currentStep = 3,
  totalSteps = 4,
}) {
  const [inputValue, setInputValue] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const wrapperRef = useRef(null);

  // team members that have been added as tags (invited)
  const invited = formData.team || [];

  // people shown in the checklist below (everyone, checked if invited)
  const checkedList = ALL_PEOPLE;

  const filteredSuggestions = ALL_PEOPLE.filter(
    (name) =>
      name.toLowerCase().includes(inputValue.toLowerCase()) &&
      !invited.includes(name),
  );

  const addPerson = (name) => {
    if (!invited.includes(name)) {
      updateFormData({ team: [...invited, name] });
    }
    setInputValue("");
  };

  const removePerson = (name) => {
    updateFormData({ team: invited.filter((n) => n !== name) });
  };

  const togglePerson = (name) => {
    if (invited.includes(name)) {
      removePerson(name);
    } else {
      addPerson(name);
    }
  };

  // close dropdown when clicking outside the input area
  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onCreate();
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

      <h2 className="text-xl font-semibold text-center text-gray-900">Team</h2>

      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Invite or Add a person
        </label>

        <div className="flex items-center gap-2" ref={wrapperRef}>
          <div className="relative flex-1">
            <div className="flex flex-wrap items-center gap-1 border border-gray-300 rounded-md px-2 py-1.5 focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500">
              {invited.map((name) => (
                <span
                  key={name}
                  className="flex items-center gap-1 bg-gray-800 text-white text-xs rounded px-2 py-1"
                >
                  {name}
                  <button
                    type="button"
                    onClick={() => removePerson(name)}
                    className="hover:text-gray-300"
                    aria-label={`Remove ${name}`}
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onFocus={() => setDropdownOpen(true)}
                placeholder={invited.length === 0 ? "Search people" : ""}
                className="flex-1 min-w-[80px] text-sm outline-none py-1"
              />
            </div>

            {dropdownOpen && filteredSuggestions.length > 0 && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-40 overflow-y-auto">
                {filteredSuggestions.map((name) => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => {
                      addPerson(name);
                      setDropdownOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 text-sm text-left text-gray-700 hover:bg-gray-50"
                  >
                    {name}
                    {invited.includes(name) && (
                      <Check size={14} className="text-blue-600" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => {
              if (inputValue.trim()) addPerson(inputValue.trim());
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md px-4 py-2 whitespace-nowrap"
          >
            Add
          </button>
        </div>

        {/* Full checklist of everyone, scrollable */}
        <div className="mt-4 max-h-56 overflow-y-auto space-y-1 pr-1">
          {checkedList.map((name) => (
            <label
              key={name}
              className="flex items-center justify-between py-1.5 text-sm text-gray-700 cursor-pointer group"
            >
              <span className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={invited.includes(name)}
                  onChange={() => togglePerson(name)}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                {name}
              </span>
              <button
                type="button"
                onClick={() => removePerson(name)}
                className="text-gray-300 hover:text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label={`Remove ${name}`}
              >
                <X size={14} />
              </button>
            </label>
          ))}
        </div>
      </div>

      {/* Footer nav */}
      <Footer onBack={onBack} onNext={onCreate} label="Create Project" />

      <StepIndicator totalSteps={totalSteps} currentStep={currentStep} />
    </form>
  );
}
