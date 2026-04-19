import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./i18n";
import App from "./App.jsx";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* ============================================================
   GSAP global defaults — smooth, calm cadence site-wide.
   ============================================================ */
gsap.registerPlugin(ScrollTrigger);
gsap.defaults({
  ease: "power2.out",
  duration: 1.2,
});

/* ============================================================
   Lenis smooth scroll — driven through GSAP's ticker so that
   ScrollTrigger stays in sync with Lenis-driven scroll.
   ============================================================ */
const lenis = new Lenis({
  duration: 1.4,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  smoothTouch: false,
  wheelMultiplier: 0.9,
});

// Every time Lenis moves the page, tell ScrollTrigger to re-evaluate.
lenis.on("scroll", ScrollTrigger.update);

// Hand Lenis' animation frame to GSAP's ticker. One loop, perfectly in phase.
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
