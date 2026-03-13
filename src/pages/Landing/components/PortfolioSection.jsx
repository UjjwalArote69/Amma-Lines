import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const PortfolioSection = () => {
  const containerRef = useRef(null);

  const projects = [
    { title: 'Karaikal Port', status: 'Completed 2009', img: '/hero/karaikal_port.webp', height: 'h-[400px]', offset: '' },
    { title: 'Ennore Port - Chennai', status: 'Completed 1999', img: '/hero/ennore_port.webp', height: 'h-[500px]', offset: 'md:-translate-y-12', isMiddle: true },
    { title: 'Coastal Armoring System', status: 'Delivered', img: '/hero/elephanta_jetty.webp', height: 'h-[400px]', offset: 'md:translate-y-12' },
  ];

  useGSAP(() => {
    // 1. Text Reveals
    gsap.fromTo('.portfolio-text-reveal', 
      { y: '100%' }, 
      { 
        y: '0%', 
        duration: 1.2, 
        stagger: 0.1, 
        ease: 'expo.out',
        scrollTrigger: { trigger: '.portfolio-header', start: 'top 80%' }
      }
    );

    // 2. High-End Image Reveals & Parallax
    const cards = gsap.utils.toArray('.portfolio-card');
    cards.forEach((card) => {
      const imgWrap = card.querySelector('.img-wrap');
      const img = card.querySelector('img');

      // The Mask Reveal
      gsap.fromTo(imgWrap,
        { clipPath: 'inset(100% 0% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.5,
          ease: 'expo.inOut',
          scrollTrigger: { trigger: card, start: 'top 85%' }
        }
      );

      // The Parallax Scroll (Image moves slightly up inside the wrapper as you scroll)
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
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="portfolio" className="w-full bg-white py-32 md:py-48 px-6 md:px-16 lg:px-24 border-t border-black/10">
      <div className="max-w-7xl mx-auto">
        
        <div className="portfolio-header flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-6">
          <div>
            <div className="overflow-hidden"><span className="portfolio-text-reveal text-cyan-600 uppercase tracking-[0.2em] text-[10px] font-bold mb-4 block">[ 02 ] Impactful Projects</span></div>
            <div className="overflow-hidden"><h2 className="portfolio-text-reveal text-5xl md:text-7xl font-black uppercase tracking-tighter text-black">The Portfolio</h2></div>
          </div>
          <button className="text-xs tracking-[0.2em] text-black/60 hover:text-black uppercase border-b border-black/30 pb-1 transition-colors">View All Works</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {projects.map((proj, i) => (
            <div key={i} className={`portfolio-card group cursor-pointer ${proj.offset}`}>
              {/* Outer wrapper manages dimensions, Inner handles clip-path mask */}
              <div className={`relative overflow-hidden mb-6 ${proj.height}`}>
                <div className="img-wrap absolute inset-0 w-full h-full origin-bottom">
                   <img 
                     src={proj.img} 
                     alt={proj.title} 
                     // Scale 110% ensures the parallax has room to move without showing empty space
                     className="w-full h-full object-cover scale-[1.15] grayscale group-hover:grayscale-0 transition-all duration-700" 
                   />
                </div>
              </div>
              
              {proj.isMiddle && <div className="w-8 h-[2px] bg-cyan-600 mb-4"></div>}
              <div className="overflow-hidden"><span className="text-cyan-600 uppercase tracking-[0.2em] text-[9px] font-bold mb-2 block">{proj.status}</span></div>
              <div className="overflow-hidden"><h3 className="text-xl font-bold uppercase tracking-tight text-black">{proj.title}</h3></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;