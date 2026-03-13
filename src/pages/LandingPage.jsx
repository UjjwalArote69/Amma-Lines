import React from 'react';
import AboutSection from '../components/AboutSection';

const LandingPage = () => {
  return (
    // The main wrapper now allows natural scrolling and sets a base background
    <main className="w-full bg-black antialiased">
      
      {/* --- HERO SECTION (Locked to 1 screen height) --- */}
      <section className="relative w-full h-screen overflow-hidden">
        
        {/* 1. Background Video (Layer 0) */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          src="/video/amma_lines_hero.mp4" 
          autoPlay
          loop
          muted
          playsInline
        />

        {/* 2. The Dark Overlay (Layer 1) */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-black/20 to-black/70 pointer-events-none" />

        {/* 3. Glassmorphism Menu Button (Layer 2) */}
        <div className="absolute top-6 right-6 md:top-8 md:right-10 z-20">
          <button 
            className="flex items-center gap-2 px-5 py-2.5 border border-white/30 rounded-sm bg-black/20 backdrop-blur-md text-white font-medium text-sm hover:bg-white/20 hover:border-white transition-all duration-300 focus:outline-none"
            aria-label="Toggle Menu"
          >
            <span className="tracking-[0.1em] uppercase text-xs">Menu</span>
            <svg 
              className="w-4 h-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M4 6h16M4 12h16M4 18h16" 
              />
            </svg>
          </button>
        </div>

        {/* 4. Centered Brand Text (Layer 2) */}
        <div className="relative z-20 flex h-full w-full items-center justify-center pointer-events-none px-4">
          <h1 
            className="text-white uppercase leading-none tracking-tight"
            style={{ 
              fontFamily: 'Impact, "Arial Black", sans-serif',
              fontSize: 'clamp(4rem, 15vw, 15rem)',
              textShadow: '0 10px 40px rgba(0,0,0,0.5)'
            }}
          >
            Amma Lines
          </h1>
        </div>

      </section>

      {/* --- ABOUT SECTION (Flows naturally below the Hero) --- */}
      <AboutSection />

      {/* Future sections will go here! */}
      {/* <ServicesSection /> */}
      {/* <ProjectsSection /> */}
      {/* <Footer /> */}

    </main>
  );
};

export default LandingPage;