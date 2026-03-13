import React, { useRef } from "react";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import HeroSection from "./components/HeroSection";
import VisionSection from "./components/VisionSection";
import PortfolioSection from "./components/PortfolioSection";
import ExpertiseSection from "./components/ExpertiseSection";

const LandingPage = () => {
  const mainRef = useRef(null);

  useGSAP(() => {
    gsap.to(mainRef.current, {
      backgroundColor: '#ffffff',
      color: '#000000',
      ease: "none",
      scrollTrigger: {
        trigger: '#vision',
        start: 'top bottom',
        end: 'top 25%',
        // PERFORMANCE FIX: Change from true to 1. This smooths out the calculation.
        scrub: 1, 
      }
    });
  }, { scope: mainRef });

  return (
   
      <main 
        ref={mainRef} 
        // PERFORMANCE FIX: Added 'will-change-background' to tell the browser to prepare for this animation
        className="w-full bg-[#0a0a0a] text-white font-sans antialiased overflow-x-hidden style={{ willChange: 'background-color, color' }}"
      >
        <HeroSection />
        <VisionSection />
        <PortfolioSection />
        <ExpertiseSection />
      </main>
  );
};

export default LandingPage;