import React from 'react';

const AboutSection = () => {
  return (
    <section className="relative w-full bg-black text-white py-32 md:py-48 px-6 md:px-12 lg:px-24">
      
      {/* Micro-Header */}
      <div className="flex items-center gap-6 mb-16 md:mb-24">
        <div className="w-16 md:w-24 h-[1px] bg-white/30"></div>
        <span className="uppercase tracking-[0.2em] md:tracking-[0.3em] text-[10px] md:text-xs text-white/60 font-medium">
          The Meka Group Flagship
        </span>
      </div>

      {/* Massive Editorial Statement */}
      <h2 
        className="text-5xl md:text-7xl lg:text-[7rem] uppercase leading-[0.85] tracking-tight mb-24 md:mb-40"
        style={{ fontFamily: 'Impact, "Arial Black", sans-serif' }}
      >
        Forged in Water.<br />
        <span className="text-white/30">Built for the future.</span>
      </h2>

      {/* Structural Grid Layout for Content & Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 border-t border-white/20 pt-16 md:pt-24">
        
        {/* Left Column: Narrative */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <p className="text-2xl md:text-3xl font-light text-white/90 leading-snug mb-8">
              For over three decades, Amma Lines has been the pioneering force in civil and marine construction, shaping India's coastal infrastructure.
            </p>
            <p className="text-sm md:text-base font-light text-white/50 leading-relaxed max-w-lg">
              Trusted by leading industries and government organizations. Armed with modern equipment, skilled diving teams, and elite engineering expertise, we deliver breakwaters, jetties, dredging, and port infrastructure that stand the test of time and tide.
            </p>
          </div>
          
          <div className="mt-12 lg:mt-0">
             <button className="group flex items-center gap-4 text-sm uppercase tracking-[0.1em] text-white hover:text-gray-300 transition-colors">
               <span className="border-b border-white pb-1 group-hover:border-gray-300 transition-colors">Read Full History</span>
               <svg className="w-4 h-4 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
             </button>
          </div>
        </div>

        {/* Right Column: Brutalist Stats */}
        <div className="lg:col-span-6 lg:col-start-7 grid grid-cols-2 gap-y-16 gap-x-8">
          
          {/* Stat 1 */}
          <div className="flex flex-col border-l border-white/20 pl-6 md:pl-8">
            <span 
              className="text-6xl md:text-8xl text-white mb-2 leading-none" 
              style={{ fontFamily: 'Impact, "Arial Black", sans-serif' }}
            >
              30+
            </span>
            <span className="uppercase tracking-[0.2em] text-[10px] md:text-xs text-white/50 font-medium">
              Years Legacy
            </span>
          </div>

          {/* Stat 2 */}
          <div className="flex flex-col border-l border-white/20 pl-6 md:pl-8">
            <span 
              className="text-6xl md:text-8xl text-white mb-2 leading-none" 
              style={{ fontFamily: 'Impact, "Arial Black", sans-serif' }}
            >
              108
            </span>
            <span className="uppercase tracking-[0.2em] text-[10px] md:text-xs text-white/50 font-medium">
              Projects Delivered
            </span>
          </div>

          {/* Stat 3 */}
          <div className="flex flex-col border-l border-white/20 pl-6 md:pl-8">
            <span 
              className="text-6xl md:text-8xl text-white mb-2 leading-none" 
              style={{ fontFamily: 'Impact, "Arial Black", sans-serif' }}
            >
              ISO
            </span>
            <span className="uppercase tracking-[0.2em] text-[10px] md:text-xs text-white/50 font-medium">
              Certified QHSE
            </span>
          </div>

          {/* Stat 4 */}
          <div className="flex flex-col border-l border-white/20 pl-6 md:pl-8">
            <span 
              className="text-6xl md:text-8xl text-white mb-2 leading-none" 
              style={{ fontFamily: 'Impact, "Arial Black", sans-serif' }}
            >
              '78
            </span>
            <span className="uppercase tracking-[0.2em] text-[10px] md:text-xs text-white/50 font-medium">
              Year Established
            </span>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;