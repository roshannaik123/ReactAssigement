import StepTabs from "../pages/Task2/StepsTabs";

export default function AccountWizardLayout({ currentStep, footer, children }) {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden flex flex-col justify-between">
      {/* Top Header & Waves Area with Gradient Background */}
      <div className="absolute top-0 left-0 w-full h-[550px] bg-gradient-to-br from-[#6264D8] via-[#6B6CE2] to-[#5556CF] z-0 overflow-hidden">
        <svg
          className="absolute bottom-0 left-0 w-full h-[380px] pointer-events-none"
          viewBox="0 0 1440 380"
          fill="none"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Layer 1 Purple Wave */}
          <path
            d="
              M 0 140 
              C 250 240, 550 250, 850 140 
              C 1050 70, 1250 40, 1440 100 
              L 1440 380 
              L 0 380 Z
            "
            fill="#797CF4"
            fillOpacity="0.45"
          />

          {/* Layer 2: Light Blue Wave  */}
          <path
            d="
              M 0 210 
              C 220 290, 480 300, 780 200 
              C 1020 120, 1260 70, 1440 140 
              L 1440 380 
              L 0 380 Z
            "
            fill="#9BD1FF"
          />

          {/* Layer 3: Solid White Bottom Background Curve */}
          <path
            d="
              M 0 270 
              C 240 330, 460 330, 720 270 
              C 980 210, 1220 180, 1440 210 
              L 1440 380 
              L 0 380 Z
            "
            fill="#FFFFFF"
          />
        </svg>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full">
        {/* Top Header Bar */}
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 px-4 sm:px-6 py-4 sm:py-6 text-center sm:text-left">
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/25 backdrop-blur-sm border border-white/20 flex items-center justify-center shadow-sm"></div>
          <h1 className="text-2xl sm:text-3xl text-white font-normal tracking-wide">
            Create New Account
          </h1>
          <a
            href="#"
            className="text-white/90 text-base sm:text-lg hover:text-white transition-colors duration-200"
          >
            Contact Us
          </a>
        </div>

        {/* Main Wizard Card */}
        <div className="max-w-5xl mx-auto px-3 sm:px-6 mt-2">
          <StepTabs currentStep={currentStep} />
          <div className="bg-white rounded-b-2xl shadow-2xl px-4 sm:px-10 md:px-16 py-6 sm:py-12">
            {children}
          </div>

          {/* Footer Controls */}
          {footer && (
            <div className="flex items-center justify-between mt-6 sm:mt-8 mb-6 sm:mb-10">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
