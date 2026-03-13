import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Preloader = () => {
  const containerRef = useRef(null);
  const counterRef = useRef(null);
  const barRef = useRef(null);

  useGSAP(() => {
    // 1. Lock the scrollbar while loading
    document.body.style.overflow = 'hidden';
    
    const tl = gsap.timeline({
      onComplete: () => {
        // Unlock scrollbar when done
        document.body.style.overflow = 'unset';
        // Remove preloader from DOM flow to avoid ghost-clicks
        gsap.set(containerRef.current, { display: 'none' });
      }
    });

    // 2. Animate the Counter (0 to 100)
    tl.to(counterRef.current, {
      innerHTML: 100,
      duration: 2.5,
      snap: { innerHTML: 1 }, // Snaps to whole numbers only
      ease: 'power3.inOut',
    }, 0)
    
    // 3. Fill the Progress Bar
    .to(barRef.current, {
      scaleX: 1,
      duration: 2.5,
      ease: 'power3.inOut',
      transformOrigin: 'left center'
    }, 0)
    
    // 4. Fade out the text elements slightly before the shutter lifts
    .to('.fade-out-item', {
      y: -30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.in'
    }, "+=0.2") // Small pause at 100%
    
    // 5. The Grand Reveal (Lifts the heavy dark curtain upwards)
    .to(containerRef.current, {
      clipPath: 'inset(0% 0% 100% 0%)',
      duration: 1.2,
      ease: 'expo.inOut'
    });

  }, { scope: containerRef });

  return (
    <div 
      ref={containerRef} 
      // Z-index 999999 ensures it covers absolutely everything (even the ShipCursor if needed)
      className="fixed inset-0 z-[999999] bg-[#050505] text-white flex flex-col justify-between p-6 md:p-16 lg:p-24"
      style={{ clipPath: 'inset(0% 0% 0% 0%)' }}
    >
      
      {/* Top Header */}
      <div className="fade-out-item flex justify-between uppercase tracking-[0.3em] text-[10px] md:text-xs font-bold text-cyan-600">
        <span>Amma Lines</span>
        <span>Est. 1978</span>
      </div>

      {/* Massive Center Counter */}
      <div className="flex flex-col items-center justify-center flex-grow">
         <div className="fade-out-item overflow-hidden relative flex items-baseline">
            <span ref={counterRef} className="text-[25vw] md:text-[15rem] font-black leading-none tracking-tighter">
              0
            </span>
            <span className="text-4xl md:text-6xl font-light text-cyan-600 ml-2">%</span>
         </div>
         
         {/* Sleek Structural Loading Bar */}
         <div className="fade-out-item w-full max-w-sm h-[2px] bg-white/10 mt-8 relative overflow-hidden">
            <div 
              ref={barRef}
              className="absolute top-0 left-0 w-full h-full bg-cyan-600 scale-x-0" 
            />
         </div>
      </div>

      {/* Bottom Footer */}
      <div className="fade-out-item flex justify-between uppercase tracking-[0.2em] text-[9px] text-white/40">
        <span>Initializing Core Assets</span>
        <span>System Ready</span>
      </div>
      
    </div>
  );
};

export default Preloader;