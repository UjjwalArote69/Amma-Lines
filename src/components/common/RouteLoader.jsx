/**
 * Suspense fallback shown while a code-split route chunk loads.
 *
 * Renders a full-viewport bone-colored panel — not just a small bar — so
 * that the dark-navy <Footer/>, which sits outside the Suspense boundary
 * in <App/>, doesn't slide up under the navbar and flash a "blue screen"
 * at the user while the chunk downloads.
 */
const RouteLoader = () => (
  <div
    className="w-full flex items-end justify-center"
    style={{
      minHeight: "100dvh",
      backgroundColor: "var(--color-bone)",
    }}
    aria-hidden
  >
    <div
      className="h-[2px] w-24 mb-16 overflow-hidden rounded-full"
      style={{ backgroundColor: "var(--color-ink-12)" }}
    >
      <span
        className="block h-full w-1/2 rounded-full"
        style={{
          backgroundColor: "var(--color-marine)",
          animation: "route-loader-slide 1.1s ease-in-out infinite",
        }}
      />
    </div>
    <style>{`
      @keyframes route-loader-slide {
        0%   { transform: translateX(-100%); }
        50%  { transform: translateX(100%); }
        100% { transform: translateX(300%); }
      }
    `}</style>
  </div>
);

export default RouteLoader;
