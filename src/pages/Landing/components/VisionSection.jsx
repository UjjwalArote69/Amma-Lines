import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const VisionSection = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.from('.vision-content', { scrollTrigger: { trigger: containerRef.current, start: 'top 75%' }, y: 50, opacity: 0, duration: 1, ease: 'power3.out' });
    gsap.from('.vision-image', { scrollTrigger: { trigger: containerRef.current, start: 'top 75%' }, scale: 0.95, opacity: 0, duration: 1.2, ease: 'power3.out' });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="vision" className="w-full max-w-7xl mx-auto px-6 md:px-16 lg:px-24 py-32 md:py-48 flex flex-col md:flex-row gap-16 md:gap-24 items-center">
      <div className="vision-content flex-1">
        <span className="text-cyan-600 uppercase tracking-[0.2em] text-[10px] font-bold mb-8 block">01. Our Vision</span>
        
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-light text-black/80 leading-[1.1] tracking-tight">
          Redefining the future of marine infrastructure. We deliver <span className="font-bold text-black">world-class engineering solutions</span> that protect coastlines and empower industries.
        </h2>
        
        <p className="mt-8 text-sm md:text-base text-black/60 font-light max-w-lg leading-relaxed">
          As the flagship of the Meka Group, we are committed to building a legacy of innovation, reliability, and sustainable operations across all volatile marine environments.
        </p>
      </div>

      <div className="vision-image w-full md:w-[400px] lg:w-[450px] relative">
        <div className="relative z-10">
           <img src="/hero/vision_section.jpg" alt="Marine Infrastructure" className="w-full h-[80%] object-cover grayscale hover:grayscale-0 transition-all duration-700" />
        </div>
        <div className="absolute -bottom-6 -left-6 w-32 h-32 border-l-2 border-b-2 border-cyan-600 z-0"></div>
      </div>
    </section>
  );
};

export default VisionSection;