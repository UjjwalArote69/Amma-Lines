import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  PRELOADER_SESSION_KEY,
  hasSeenPreloaderThisSession,
} from "../../utils/preloader";

const markPreloaderSeen = () => {
  try {
    window.sessionStorage.setItem(PRELOADER_SESSION_KEY, "1");
  } catch {
    // ignore — private mode, quota, etc.
  }
};

const Preloader = () => {
  const containerRef = useRef(null);
  // Decide once on mount — do not re-evaluate on re-renders.
  const [show] = useState(() => !hasSeenPreloaderThisSession());

  useGSAP(
    () => {
      if (!show) return;

      document.body.style.overflow = "hidden";

      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = "unset";
          markPreloaderSeen();
          if (containerRef.current) {
            gsap.set(containerRef.current, { display: "none" });
          }
        },
      });

      tl.set(containerRef.current, { autoAlpha: 1 })
        // Logo in
        .fromTo(
          ".pl-logo",
          { autoAlpha: 0, scale: 0.94, y: 8 },
          {
            autoAlpha: 1,
            scale: 1,
            y: 0,
            duration: 0.9,
            ease: "power2.out",
          }
        )
        // Wordmark caption in
        .fromTo(
          ".pl-caption",
          { autoAlpha: 0, y: 6 },
          { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.5"
        )
        // Progress bar fills
        .fromTo(
          ".pl-bar",
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.05,
            ease: "power2.inOut",
            transformOrigin: "left center",
          },
          "-=0.6"
        )
        // Hold briefly at full
        .to({}, { duration: 0.2 })
        // Fade everything
        .to(
          [".pl-logo", ".pl-caption", ".pl-bar-wrap"],
          {
            autoAlpha: 0,
            y: -8,
            duration: 0.5,
            stagger: 0.04,
            ease: "power2.in",
          }
        )
        // Whole overlay fades out
        .to(
          containerRef.current,
          {
            autoAlpha: 0,
            duration: 0.55,
            ease: "power2.inOut",
          },
          "-=0.15"
        );
    },
    { scope: containerRef, dependencies: [show] }
  );

  if (!show) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[999999] flex flex-col items-center justify-center px-6"
      style={{
        backgroundColor: "var(--color-bone)",
        color: "var(--color-ink)",
        opacity: 1,
      }}
    >
      <div className="flex flex-col items-center gap-8">
        {/* Logo */}
        <div
          className="pl-logo h-24 w-24 md:h-28 md:w-28 flex items-center justify-center rounded-full p-2"
          style={{ backgroundColor: "#FFFFFF" }}
        >
          <img loading="lazy" decoding="async"
            src="/logo/meka_amma_lines-removebg-preview.webp"
            alt="Amma Lines"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Progress bar */}
        <div
          className="pl-bar-wrap relative w-48 md:w-56 h-[1px] overflow-hidden"
          style={{ backgroundColor: "var(--color-ink-12)" }}
        >
          <div
            className="pl-bar absolute inset-0 origin-left"
            style={{
              backgroundColor: "var(--color-marine)",
              transform: "scaleX(0)",
            }}
          />
        </div>

        {/* Caption */}
        <div className="pl-caption flex items-center gap-3">
          <span className="caption text-[var(--color-ink-70)]">
            Amma Lines
          </span>
          <span
            className="h-[1px] w-5"
            style={{ backgroundColor: "var(--color-ink-20)" }}
          />
          <span className="caption text-[var(--color-ink-40)] tabular">
            Est. 1978
          </span>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
