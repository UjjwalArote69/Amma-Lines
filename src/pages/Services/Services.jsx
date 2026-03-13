import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const pageRef = useRef(null);

  // Real comprehensive services data from Amma Lines
  const servicesData = [
    {
      title: 'Breakwater Construction',
      description: 'Specialized design and execution of durable breakwater structures that protect coastlines, commercial ports, and harbors from the devastating impact of strong waves, tidal surges, and erosion.',
      img: 'https://images.unsplash.com/photo-1582215684347-2e1d70e61d85?q=80&w=1000&auto=format&fit=crop'
    },
    {
      title: 'Marine Piling Systems',
      description: 'Delivering expert piling and sheet piling solutions that form the backbone of strong, sustainable marine and civil structures. Engineered for absolute earth retention and deep-sea stability.',
      img: 'https://images.unsplash.com/photo-1543881528-9e5309d4351a?q=80&w=1000&auto=format&fit=crop'
    },
    {
      title: 'Jetty Engineering',
      description: 'Constructing robust Block, Pile, and RO-RO jetties designed to withstand harsh coastal conditions while enabling the smooth, high-capacity transfer of wheeled cargo and heavy vehicles.',
      img: '/hero/elephanta_jetty.jpg' // Assuming this local asset exists based on previous pages
    },
    {
      title: 'Caisson & Cofferdams',
      description: 'Advanced sub-sea engineering providing safe, dry, and stable working conditions for underwater projects, utilizing massive caisson foundations built with highly durable materials.',
      img: 'https://images.unsplash.com/photo-1505705694340-019e1e335916?q=80&w=1000&auto=format&fit=crop'
    },
    {
      title: 'Deepwater Dredging',
      description: 'Vital processes for maintaining safe, navigable waterways and enhancing port efficiency. We deploy modern, high-capacity fleets capable of surgical precision on the ocean floor.',
      img: 'https://images.unsplash.com/photo-1621516762394-44b419401f80?q=80&w=1000&auto=format&fit=crop'
    },
    {
      title: 'Soil Improvement & Well Sinking',
      description: 'Crucial preparatory processes in marine and coastal construction, ensuring unshakeable foundations and long-lasting stability for exceptionally heavy infrastructure.',
      img: 'https://images.unsplash.com/photo-1577983696515-b6d85a153835?q=80&w=1000&auto=format&fit=crop'
    }
  ];

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

    // 1. Page Header Reveal
    tl.fromTo('.page-title', 
      { y: '120%', rotate: 2 }, 
      { y: '0%', rotate: 0, duration: 1.5, stagger: 0.1, delay: 0.2 }
    )
    .fromTo('.page-fade', 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 1, stagger: 0.1 }, 
      '-=1'
    );

    // 2. Service Rows Scroll Reveal
    const rows = gsap.utils.toArray('.service-row');
    rows.forEach((row) => {
      // Animate the text content of the row
      gsap.fromTo(row.querySelector('.service-content'),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: row,
            start: 'top 85%',
          }
        }
      );

      // Animate the image mask & parallax
      const imgWrap = row.querySelector('.img-wrap');
      const img = row.querySelector('img');

      if(imgWrap && img) {
        gsap.fromTo(imgWrap,
          { clipPath: 'inset(100% 0% 0% 0%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.5,
            ease: 'expo.inOut',
            scrollTrigger: { trigger: row, start: 'top 75%' }
          }
        );

        gsap.fromTo(img,
          { y: '-10%' },
          {
            y: '10%',
            ease: 'none',
            scrollTrigger: {
              trigger: row,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            }
          }
        );
      }
    });

  }, { scope: pageRef });

  return (
    <main ref={pageRef} className="w-full bg-white text-black min-h-screen flex flex-col pt-32 overflow-hidden">
      
      {/* ================= HEADER SECTION ================= */}
      <section className="px-6 md:px-16 lg:px-24 pb-24 border-b border-black/10 flex flex-col md:flex-row md:items-end justify-between gap-12">
        <div>
          <span className="page-fade text-cyan-600 uppercase tracking-[0.3em] text-[10px] font-bold mb-6 block">
            [ What We Do ]
          </span>
          <div className="overflow-hidden pb-2">
            <h1 className="page-title text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-none origin-bottom-left block">
              Engineering
            </h1>
          </div>
          <div className="overflow-hidden pb-2">
            <h1 className="page-title text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-none origin-bottom-left block">
              <span style={{ WebkitTextStroke: '2px rgba(0,0,0,0.8)', color: 'transparent' }}>
                The Deep.
              </span>
            </h1>
          </div>
        </div>
        
        <p className="page-fade max-w-sm text-sm text-black/60 leading-relaxed font-light pb-2">
          Providing a wide range of innovative, resilient, and sustainable solutions for the global marine infrastructure sector.
        </p>
      </section>

      {/* ================= SERVICES LIST ================= */}
      <section className="px-6 md:px-16 lg:px-24 py-24 md:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto flex flex-col">
          
          {servicesData.map((service, index) => (
            <div 
              key={index} 
              className="service-row group flex flex-col lg:flex-row items-start lg:items-center justify-between py-16 md:py-24 border-t border-black/10 first:border-t-0 gap-12 lg:gap-24"
            >
              
              {/* Text Content */}
              <div className="service-content flex-1 flex flex-col md:flex-row gap-8 md:gap-16 items-start">
                <span className="text-4xl md:text-6xl font-light text-black/10 group-hover:text-cyan-600 transition-colors duration-500 font-mono">
                  0{index + 1}
                </span>
                
                <div className="flex flex-col gap-6 max-w-xl">
                  <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-black group-hover:translate-x-4 transition-transform duration-500">
                    {service.title}
                  </h2>
                  <p className="text-sm md:text-base text-black/60 leading-relaxed font-light">
                    {service.description}
                  </p>
                  
                  {/* Subtle Action Link */}
                  <div className="mt-4">
                    <button className="flex items-center gap-4 text-xs font-bold uppercase tracking-[0.2em] text-black/40 group-hover:text-black transition-colors">
                      <span>Explore Capability</span>
                      <svg className="w-4 h-4 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Parallax Image Mask (Reveals beautifully on scroll) */}
              <div className="w-full lg:w-[400px] h-[300px] md:h-[400px] relative overflow-hidden flex-shrink-0 bg-black/5">
                <div className="img-wrap absolute inset-0 w-full h-full origin-bottom">
                  <img 
                    src={service.img} 
                    alt={service.title} 
                    className="w-full h-full object-cover scale-[1.15] grayscale group-hover:grayscale-0 transition-all duration-700" 
                  />
                </div>
              </div>

            </div>
          ))}

        </div>
      </section>

    </main>
  );
};

export default Services;