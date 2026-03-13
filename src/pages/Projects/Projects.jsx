import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const pageRef = useRef(null);

  // Expanded dummy data to populate the masonry grid
  const projectList = [
    { title: 'Karaikal Port Expansion', category: 'Dredging', status: 'Completed', img: '/hero/karaikal_port.webp', height: 'h-[600px]' },
    { title: 'JNPT Floating Breakwater', category: 'Breakwaters', status: 'Delivered', img: 'https://images.unsplash.com/photo-1543881528-9e5309d4351a?q=80&w=800&auto=format&fit=crop', height: 'h-[400px]' },
    { title: 'Elephanta Island Jetty', category: 'Jetties', status: 'Ongoing', img: '/hero/elephanta_jetty.webp', height: 'h-[500px]' },
    { title: 'Ennore Port Navigation Channel', category: 'Dredging', status: 'Completed', img: '/hero/ennore_port.webp', height: 'h-[700px]' },
    { title: 'Vizhinjam Coastal Armoring', category: 'Breakwaters', status: 'Ongoing', img: 'https://images.unsplash.com/photo-1582215684347-2e1d70e61d85?q=80&w=800&auto=format&fit=crop', height: 'h-[450px]' },
    { title: 'Mumbai Offshore Logistics Base', category: 'Jetties', status: 'Delivered', img: 'https://images.unsplash.com/photo-1505705694340-019e1e335916?q=80&w=1000&auto=format&fit=crop', height: 'h-[550px]' },
  ];

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

    // 1. Initial Page Load Animations
    tl.fromTo('.page-title', 
      { y: '120%', rotate: 2 }, 
      { y: '0%', rotate: 0, duration: 1.5, stagger: 0.1, delay: 0.2 }
    )
    .fromTo('.page-fade', 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 1, stagger: 0.1 }, 
      '-=1'
    );

    // 2. High-End Masonry Grid Reveals & Parallax
    const cards = gsap.utils.toArray('.project-card');
    cards.forEach((card) => {
      const imgWrap = card.querySelector('.img-wrap');
      const img = card.querySelector('img');

      // Mask Reveal for each project as you scroll down
      gsap.fromTo(imgWrap,
        { clipPath: 'inset(100% 0% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.5,
          ease: 'expo.inOut',
          scrollTrigger: { 
            trigger: card, 
            start: 'top 85%' 
          }
        }
      );

      // Subtle Image Parallax Effect
      gsap.fromTo(img,
        { y: '-10%' },
        {
          y: '10%',
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        }
      );
    });
  }, { scope: pageRef });

  return (
    <main ref={pageRef} className="w-full bg-white text-black min-h-screen flex flex-col pt-32 overflow-hidden">
      
      {/* ================= HEADER SECTION ================= */}
      <section className="px-6 md:px-16 lg:px-24 pb-24 flex flex-col md:flex-row md:items-end justify-between gap-12">
        <div>
          <span className="page-fade text-cyan-600 uppercase tracking-[0.3em] text-[10px] font-bold mb-6 block">
            [ Our Work ]
          </span>
          
          {/* Hidden overflow masks for crisp text sliding */}
          <div className="overflow-hidden pb-2">
            <h1 className="page-title text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-none origin-bottom-left block">
              108+
            </h1>
          </div>
          <div className="overflow-hidden pb-2">
            <h1 className="page-title text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-none origin-bottom-left block">
              <span style={{ WebkitTextStroke: '2px rgba(0,0,0,0.8)', color: 'transparent' }}>
                Delivered.
              </span>
            </h1>
          </div>
        </div>
        
        {/* Filter Options */}
        <div className="page-fade flex flex-wrap gap-6 text-xs uppercase tracking-widest text-black/50 mb-4">
          <button className="text-cyan-600 border-b border-cyan-600 pb-1 font-bold">All Works</button>
          <button className="hover:text-black hover:border-b hover:border-black/30 pb-1 transition-all">Breakwaters</button>
          <button className="hover:text-black hover:border-b hover:border-black/30 pb-1 transition-all">Dredging</button>
          <button className="hover:text-black hover:border-b hover:border-black/30 pb-1 transition-all">Jetties</button>
        </div>
      </section>

      {/* ================= MASONRY GRID SECTION ================= */}
      <section className="px-6 md:px-16 lg:px-24 pb-32 border-t border-black/10 pt-24">
        
        {/* CSS Columns create the true Masonry layout automatically */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          
          {projectList.map((proj, i) => (
            <div key={i} className="project-card group cursor-pointer break-inside-avoid relative flex flex-col">
              
              {/* Outer Wrapper for Structure, Inner for Clip-Path Mask */}
              <div className={`relative overflow-hidden w-full ${proj.height} mb-4 bg-gray-50`}>
                <div className="img-wrap absolute inset-0 w-full h-full origin-bottom">
                   <img 
                     src={proj.img} 
                     alt={proj.title} 
                     // Scaled to 115% to allow room for the vertical parallax travel
                     className="w-full h-full object-cover scale-[1.15] grayscale group-hover:grayscale-0 transition-all duration-700" 
                   />
                </div>
                
                {/* Hover Overlay Detail (Optional high-end touch) */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <span className="text-white text-xs uppercase tracking-[0.2em] border border-white/50 px-6 py-3 rounded-full scale-90 group-hover:scale-100 transition-transform duration-500">
                    View Project
                  </span>
                </div>
              </div>
              
              {/* Project Meta Data */}
              <div className="flex justify-between items-start mt-2">
                <div>
                  <h3 className="text-lg md:text-xl font-bold uppercase tracking-tight text-black mb-1 group-hover:text-cyan-600 transition-colors">
                    {proj.title}
                  </h3>
                  <span className="text-black/50 uppercase tracking-[0.2em] text-[9px] font-bold">
                    {proj.category}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-cyan-600 uppercase tracking-[0.2em] text-[9px] font-bold">
                    {proj.status}
                  </span>
                </div>
              </div>
              
            </div>
          ))}
          
        </div>

        {/* Load More Button */}
        <div className="w-full flex justify-center mt-24">
          <button className="group flex items-center gap-4 text-xs font-bold uppercase tracking-[0.2em] text-black">
            <span className="border-b border-black pb-1 group-hover:text-cyan-600 group-hover:border-cyan-600 transition-colors">
              Load More Archives
            </span>
            <svg className="w-4 h-4 transform group-hover:translate-y-1 transition-transform group-hover:text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
          </button>
        </div>

      </section>

    </main>
  );
};

export default Projects;