import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.from('.footer-content', { 
      scrollTrigger: { 
        trigger: containerRef.current, 
        start: 'top 85%' 
      }, 
      y: 30, 
      opacity: 0, 
      duration: 1, 
      ease: 'power3.out' 
    });
  }, { scope: containerRef });

  return (
    <footer ref={containerRef} id="contact" className="w-full bg-white py-24 px-6 md:px-16 lg:px-24 border-t border-black/10">
      <div className="footer-content max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-16">
        
        <div>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-black leading-none mb-12">
            Let's Build<br/>The Future.
          </h2>
          <div className="flex gap-4">
            <button className="w-12 h-12 border border-black/20 flex items-center justify-center text-black hover:bg-cyan-600 hover:text-white hover:border-cyan-600 transition-all">
              →
            </button>
          </div>
        </div>

        <div className="flex gap-16 md:gap-32">
          <div className="flex flex-col gap-4">
            <span className="text-cyan-600 uppercase tracking-[0.2em] text-[9px] font-bold mb-2 block">Menu</span>
            {['About', 'Projects', 'Services', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`${item.toLowerCase()}`} 
                className="text-xs text-black/60 hover:text-black uppercase tracking-widest transition-colors"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-cyan-600 uppercase tracking-[0.2em] text-[9px] font-bold mb-2 block">Contact</span>
            <p className="text-xs text-black/60 leading-relaxed font-light">
              Meka Tower, Suite 400<br/>
              Marine Drive, Mumbai 400001<br/>
              +91 (022) 2285 3784<br/>
              info@ammalines.com
            </p>
          </div>
        </div>
      </div>
      
      {/* Copyright Bar */}
      <div className="max-w-7xl mx-auto mt-24 flex justify-between items-center text-[9px] text-black/40 uppercase tracking-[0.2em]">
        <span>© 2026 Amma Lines</span>
        <span>Designed for the Future</span>
      </div>
    </footer>
  );
};

export default Footer;