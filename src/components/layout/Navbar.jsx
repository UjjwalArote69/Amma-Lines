import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const containerRef = useRef(null);
  const tl = useRef(null); // Timeline for the menu overlay

  const navLinks = [
    { name: 'About', path: '/about', number: '01' },
    { name: 'Projects', path: '/projects', number: '02' },
    { name: 'Services', path: '/services', number: '03' },
    { name: 'Contact', path: '/contact', number: '04' },
  ];

  useGSAP(() => {
    // 1. Initial Load Animation (Navbar drops in from the top)
    gsap.from('.nav-header', {
      y: -100,
      opacity: 0,
      duration: 1.5,
      ease: 'expo.out',
      delay: 3.3, // Waits a split second so it syncs with your Hero text
    });

    // 2. High-End Menu Reveal Timeline
    tl.current = gsap.timeline({ paused: true })
      // Overlay unrolls like a blind
      .to('.menu-overlay', {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 1.2,
        ease: 'expo.inOut',
      })
      // Staggered text sliding up from hidden masks
      .fromTo('.nav-link-text', 
        { y: '120%', rotate: 2 }, 
        { y: '0%', rotate: 0, duration: 1, stagger: 0.1, ease: 'expo.out' }, 
        '-=0.6'
      )
      // Fade in the bottom footer info
      .fromTo('.nav-footer', 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 
        '-=0.6'
      );
  }, { scope: containerRef });

  useEffect(() => {
    if (isMenuOpen) {
      tl.current.play();
      document.body.style.overflow = 'hidden';
    } else {
      tl.current.reverse();
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div ref={containerRef}>
      
      {/* HEADER */}
      <header className="nav-header fixed top-0 left-0 w-full p-6 md:px-16 lg:px-24 z-50 flex justify-between items-center text-white mix-blend-difference">
        <div className="font-bold tracking-[0.2em] uppercase text-xs md:text-sm cursor-pointer z-50">
          <a href="/">Amma Lines</a>
        </div>
        
        {/* Hamburger Menu Button */}
        <button 
          onClick={toggleMenu}
          className="relative z-50 w-10 h-10 flex flex-col justify-center items-end gap-[5px] focus:outline-none group"
          aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
        >
          <span 
            className={`h-[1.5px] bg-white transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
              isMenuOpen ? 'w-8 rotate-45 translate-y-[6.5px]' : 'w-8 group-hover:w-6'
            }`} 
          />
          <span 
            className={`h-[1.5px] bg-white transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
              isMenuOpen ? 'w-8 -rotate-45 -translate-y-[6.5px]' : 'w-6 group-hover:w-8'
            }`} 
          />
        </button>
      </header>

      {/* FULLSCREEN OVERLAY */}
      {/* Starts hidden at the top using inset(0% 0% 100% 0%) */}
      <div 
        className="menu-overlay fixed inset-0 w-full h-screen bg-gray-50 z-40 flex flex-col justify-center px-6 md:px-16 lg:px-24"
        style={{ clipPath: 'inset(0% 0% 100% 0%)' }}
      >
        {/* Ambient background glow */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-cyan-600/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col h-full justify-center pt-24">
          <span className="text-cyan-600 uppercase tracking-[0.3em] text-[10px] md:text-xs font-bold mb-12 block">
            [ Navigation ]
          </span>

          {/* NAV LINKS */}
          <nav className="flex flex-col gap-2 md:gap-4">
            {navLinks.map((link) => (
              <div key={link.name} className="overflow-hidden">
                <a 
                  href={link.path}
                  onClick={toggleMenu}
                  className="nav-link group flex items-baseline gap-6 md:gap-12 w-fit"
                >
                  <span className="text-black/30 text-sm md:text-xl font-light font-mono">
                    {link.number}
                  </span>
                  
                  {/* Text Reveal Mask Wrapper */}
                  <div className="overflow-hidden">
                    <span className="nav-link-text block text-5xl md:text-7xl lg:text-[6rem] font-black uppercase tracking-tighter text-black group-hover:text-cyan-600 transition-colors duration-500 origin-bottom-left">
                      {link.name}
                    </span>
                  </div>
                </a>
              </div>
            ))}
          </nav>

          {/* NAV FOOTER */}
          <div className="nav-footer mt-auto pb-12 pt-12 border-t border-black/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="flex flex-col gap-2">
              <span className="text-cyan-600 uppercase tracking-[0.2em] text-[9px] font-bold">Inquiries</span>
              <a href="mailto:info@ammalines.com" className="text-black hover:text-cyan-600 text-sm md:text-base transition-colors">
                info@ammalines.com
              </a>
            </div>
            <div className="flex gap-8">
              {['LinkedIn', 'Twitter', 'Instagram'].map((social) => (
                <a key={social} href="#" className="text-black/50 hover:text-black uppercase tracking-widest text-[10px] transition-colors">
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Navbar;