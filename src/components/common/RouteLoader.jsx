/**
 * Lightweight Suspense fallback shown while a code-split route chunk loads.
 * Matches the site palette; no layout shift, no spinner jank.
 */
const RouteLoader = () => (
  <div
    className="fixed inset-0 z-[1] flex items-end justify-center pointer-events-none"
    aria-hidden
  >
    <div
      className="h-[2px] w-24 mb-8 overflow-hidden rounded-full"
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
