import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const ExpertiseSection = () => {
  const containerRef = useRef(null);
  
  const expertiseData = [
    { title: 'Breakwater Construction', description: 'Designing and executing durable breakwater structures that protect coastlines, ports, and harbors from the impact of strong waves and erosion.' },
    { title: 'Jetty Engineering', description: 'Building reliable, sustainable pile and block jetties designed to withstand harsh coastal and offshore conditions.' },
    { title: 'Advanced Dredging', description: 'Maintaining safe and navigable waterways while enhancing port efficiency using modern, high-capacity dredging equipment.' },
    { title: 'Caisson & Cofferdam', description: 'Constructing strong, stable marine foundations and providing safe, dry working conditions using advanced sub-sea engineering practices.' }
  ];

  useGSAP(() => {
    gsap.from('.expertise-item', { scrollTrigger: { trigger: containerRef.current, start: 'top 75%' }, y: 40, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out' });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="expertise" className="w-full max-w-7xl mx-auto px-6 md:px-16 lg:px-24 py-32 md:py-48">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 border-t border-black/10 pt-16">
        
        <div className="expertise-item lg:col-span-4">
          <span className="text-cyan-600 uppercase tracking-[0.2em] text-[10px] font-bold mb-6 block">03. Expertise</span>
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-black leading-none mb-8">Core<br/>Fields</h2>
          <p className="text-sm text-black/60 leading-relaxed font-light pr-8">
            Backed by modern equipment, skilled diving teams, and elite engineering expertise, we provide innovative solutions for the most demanding marine infrastructure sectors.
          </p>
        </div>

        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {expertiseData.map((item, i) => (
            <div key={i} className="expertise-item border-t border-black/10 pt-6">
              <span className="text-5xl font-light text-gray-200 block mb-4">0{i + 1}</span>
              <h3 className="text-sm font-bold uppercase tracking-widest text-black mb-4">{item.title}</h3>
              <p className="text-xs text-black/60 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default ExpertiseSection;