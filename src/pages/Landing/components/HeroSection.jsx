import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const HeroSection = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' }, delay: 3.3 });

    // 1. Premium Image Reveal (Wipes down while scaling)
    tl.to('.hero-img-wrap', { clipPath: 'inset(0% 0% 0% 0%)', duration: 2, ease: 'expo.inOut' })
      .fromTo('.hero-bg-img', 
        { scale: 1.3 }, 
        { scale: 1, duration: 2.5, ease: 'expo.inOut' }, 
        '<' // Syncs with the clipPath
      )
      // Text slides up from hidden overflow
      .fromTo('.hero-text-line', 
        { y: '120%', rotate: 2 }, 
        { y: '0%', rotate: 0, duration: 1.5, stagger: 0.1 }, 
        '-=1.5'
      )
      .fromTo('.hero-fade', 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 1, stagger: 0.1 }, 
        '-=1'
      );

    // 2. High-Performance 3D Mouse Interaction
    // Using gsap.quickTo for hardware-accelerated, buttery smooth tracking
    const xTo = gsap.quickTo('.interactive-text-group', 'x', { duration: 1.2, ease: 'power3.out' });
    const yTo = gsap.quickTo('.interactive-text-group', 'y', { duration: 1.2, ease: 'power3.out' });
    const rotXTo = gsap.quickTo('.interactive-text-group', 'rotationX', { duration: 1.2, ease: 'power3.out' });
    const rotYTo = gsap.quickTo('.interactive-text-group', 'rotationY', { duration: 1.2, ease: 'power3.out' });

    const handleMouseMove = (e) => {
      // Get mouse position relative to the center of the screen
      const { innerWidth, innerHeight } = window;
      const xPos = (e.clientX / innerWidth - 0.5) * 2; // Ranges from -1 to 1
      const yPos = (e.clientY / innerHeight - 0.5) * 2; // Ranges from -1 to 1

      // Subtle Parallax Pan (moves slightly opposite to the mouse)
      xTo(xPos * -30);
      yTo(yPos * -15);

      // Subtle 3D Tilt (Creates depth)
      rotXTo(yPos * 10);
      rotYTo(xPos * -10);
    };

    // Attach event listener to the window
    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full h-screen min-h-[800px] flex flex-col pt-8 px-6 md:px-16 lg:px-24 border-b border-black/10 bg-[#0a0a0a] overflow-hidden">
      
      {/* The Wrapper controls the clip-path mask */}
      <div 
        className="hero-img-wrap absolute inset-0 z-0 overflow-hidden"
        style={{ clipPath: 'inset(100% 0% 0% 0%)' }} 
      >
        <img 
          src="/hero/cargo-ship-sailing-ocean.webp" 
          alt="Cargo Ship Aerial" 
          className="hero-bg-img w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent pointer-events-none" />
      </div>

      <div className="relative z-20 w-full max-w-7xl mx-auto flex flex-col justify-center h-full pb-32 mt-24">
        <span className="hero-fade text-cyan-400 uppercase tracking-[0.3em] text-[10px] md:text-xs font-bold mb-6 block">// Since 1978</span>
        
        {/* ADDED: CSS Perspective wrapper to allow 3D tilting */}
        <div style={{ perspective: '1000px' }}>
          {/* ADDED: .interactive-text-group acts as the 3D moving layer */}
          <h1 className="interactive-text-group text-[12vw] md:text-8xl lg:text-[9rem] font-black uppercase leading-[0.85] tracking-tighter m-0 flex flex-col origin-center transform-style-3d">
            
            <div className="overflow-hidden pb-2">
              <span className="hero-text-line block text-white origin-bottom-left">Redefining</span>
            </div>
            
            <div className="overflow-hidden pb-2">
              <div className="hero-text-line flex items-center gap-4 md:gap-8 origin-bottom-left">
                <span style={{ WebkitTextStroke: '2px rgba(255,255,255,0.8)', color: 'transparent' }}>The</span>
                <span className="text-white">Horizon</span>
              </div>
            </div>
            
          </h1>
        </div>

        <div className="hero-fade flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-12 mt-12 md:mt-16">
          <button className="bg-white text-black px-8 py-4 text-xs font-bold uppercase tracking-[0.15em] hover:bg-cyan-500 hover:text-white transition-colors duration-500">
            Explore Projects
          </button>
          <div className="flex items-center gap-4">
            <div className="w-12 h-[1px] bg-white/30"></div>
            <span className="text-white/60 text-xs tracking-widest uppercase">Specialized Marine Infrastructure</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;