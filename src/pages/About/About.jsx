import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const pageRef = useRef(null);

  useGSAP(() => {
    gsap.from('.page-title', { y: 100, opacity: 0, duration: 1.2, stagger: 0.1, ease: 'power4.out', delay: 0.2 });
    gsap.from('.page-fade', { opacity: 0, y: 20, duration: 1, ease: 'power2.out', delay: 0.5 });
    gsap.from('.timeline-item', { scrollTrigger: { trigger: '.timeline-section', start: 'top 75%' }, y: 50, opacity: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out' });
    gsap.from('.team-card', { scrollTrigger: { trigger: '.team-section', start: 'top 75%' }, y: 40, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out' });
  }, { scope: pageRef });

  return (
    <main ref={pageRef} className="w-full bg-white text-black min-h-screen flex flex-col pt-32 pb-32 overflow-hidden">
      
      <section className="px-6 md:px-16 lg:px-24 pb-24 border-b border-black/10">
        <span className="page-fade text-cyan-600 uppercase tracking-[0.3em] text-[10px] font-bold mb-6 block">Our History</span>
        <div className="overflow-hidden pb-2">
          <h1 className="page-title text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-none">
            The Flagship <br/>
            <span style={{ WebkitTextStroke: '2px rgba(0,0,0,0.8)', color: 'transparent' }}>Legacy.</span>
          </h1>
        </div>
        <div className="page-fade flex flex-col md:flex-row gap-12 mt-12 items-start md:items-end justify-between">
          <p className="max-w-2xl text-black/60 text-lg font-light leading-relaxed">
            Incorporated on December 13, 1978, Amma Lines has grown from a pioneering marine construction company into the cornerstone of the Meka Group, shaping India's ports and jetties with uncompromising safety and sustainability.
          </p>
          <div className="text-right">
            <span className="text-cyan-600 uppercase tracking-[0.2em] text-[9px] font-bold block mb-2">Company Status</span>
            <span className="text-xl font-bold uppercase tracking-widest text-black">Active</span>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-16 lg:px-24 py-24 md:py-32 border-b border-black/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div>
            <span className="text-cyan-600 uppercase tracking-[0.2em] text-[10px] font-bold mb-6 block">Vision & Mission</span>
            <h2 className="text-4xl md:text-5xl font-light leading-tight mb-8">
              Building the <span className="font-bold text-black">Future of Marine</span> & Coastal Infrastructure.
            </h2>
            <p className="text-black/60 font-light leading-relaxed mb-12">
              At Amma Lines, our vision is to redefine marine and port infrastructure with innovation, reliability, and sustainability. We are committed to delivering world-class engineering solutions that protect coastlines, empower industries, and connect communities.
            </p>
            <div className="flex gap-12 border-t border-black/10 pt-8">
              <div>
                <span className="text-4xl font-black block mb-2">81%</span>
                <span className="text-cyan-600 uppercase tracking-[0.2em] text-[9px] font-bold">Client Trust</span>
              </div>
              <div>
                <span className="text-4xl font-black block mb-2">60%</span>
                <span className="text-cyan-600 uppercase tracking-[0.2em] text-[9px] font-bold">Engineering Excellence</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {[
              { title: 'Quality Construction', desc: 'Ensuring every project meets the highest global standards in safety, durability, and performance.' },
              { title: 'Mutual Partnership', desc: 'Long-term collaborations with clients and stakeholders built on absolute trust and transparency.' },
              { title: 'Proactive Safety', desc: 'ISO-certified QHSE system guaranteeing safe and sustainable operations across all environments.' },
              { title: 'Encourage Teamwork', desc: 'Fostering innovation and excellence through skilled teams, modern tech, and hands-on leadership.' }
            ].map((value, i) => (
              <div key={i} className="bg-black/5 border border-black/10 p-8 flex flex-col justify-between hover:bg-black/10 transition-colors">
                <span className="text-cyan-600 font-mono text-sm mb-4 block">0{i + 1}</span>
                <h3 className="font-bold uppercase tracking-widest text-sm mb-4">{value.title}</h3>
                <p className="text-xs text-black/60 leading-relaxed font-light">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="timeline-section px-6 md:px-16 lg:px-24 py-24 md:py-32 border-b border-black/10 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <span className="text-cyan-600 uppercase tracking-[0.2em] text-[10px] font-bold mb-16 block text-center">Company Timeline</span>
          
          <div className="relative border-l border-black/20 ml-4 md:ml-1/2 flex flex-col gap-16 pb-8">
            
            <div className="timeline-item relative pl-12 md:pl-24">
              <div className="absolute top-0 -left-[5px] w-[9px] h-[9px] bg-cyan-600 rounded-full shadow-[0_0_15px_rgba(0,180,216,0.5)]"></div>
              <span className="text-5xl md:text-7xl font-black text-gray-200 block mb-4 leading-none">1978</span>
              <h3 className="text-xl font-bold uppercase tracking-widest text-black mb-4">Foundation of Meka Group</h3>
              <p className="text-sm text-black/60 leading-relaxed max-w-lg">
                The journey begins with the vision of Dr. Meka Papa Rao, establishing a strong foundation in marine infrastructure and uncompromising engineering excellence.
              </p>
            </div>

            <div className="timeline-item relative pl-12 md:pl-24">
              <div className="absolute top-0 -left-[5px] w-[9px] h-[9px] bg-cyan-600 rounded-full"></div>
              <span className="text-5xl md:text-7xl font-black text-gray-200 block mb-4 leading-none">1988</span>
              <h3 className="text-xl font-bold uppercase tracking-widest text-black mb-4">Early Breakthrough Projects</h3>
              <p className="text-sm text-black/60 leading-relaxed max-w-lg">
                Completed landmark works like the Floating Breakwater at JNPT, Navi Mumbai, officially marking our entry into massive, large-scale marine construction.
              </p>
            </div>

            <div className="timeline-item relative pl-12 md:pl-24">
              <div className="absolute top-0 -left-[5px] w-[9px] h-[9px] bg-cyan-600 rounded-full"></div>
              <span className="text-5xl md:text-7xl font-black text-gray-200 block mb-4 leading-none">2009</span>
              <h3 className="text-xl font-bold uppercase tracking-widest text-black mb-4">Port & Dredging Expansion</h3>
              <p className="text-sm text-black/60 leading-relaxed max-w-lg">
                Successfully executed complex breakwaters and dredging at Karaikal Port, cementing Amma Lines' position as elite specialists in marine works.
              </p>
            </div>

          </div>
        </div>
      </section>

      <section className="team-section px-6 md:px-16 lg:px-24 py-24 md:py-32">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <span className="text-cyan-600 uppercase tracking-[0.2em] text-[10px] font-bold mb-4 block">Our Crew</span>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-black">The Leadership</h2>
            </div>
            <p className="max-w-sm text-xs text-black/60 leading-relaxed">
              Driving marine infrastructure forward with innovation, hands-on experience, and decades of specialized knowledge.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="team-card group cursor-pointer">
              <div className="h-[400px] bg-black/5 mb-6 overflow-hidden relative border border-black/10">
                <img src="/about/hmr.webp" alt="Mr. Hemanth Meka Rao" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 mix-blend-luminosity" />
                {/* <div className="absolute inset-0 bg-gradient-to-t from-white/90 to-transparent"></div> */}
              </div>
              <span className="text-cyan-600 uppercase tracking-[0.2em] text-[9px] font-bold mb-2 block">Director</span>
              <h3 className="text-xl font-bold uppercase tracking-tight text-black mb-3">Mr. Hemanth Meka Rao</h3>
              <p className="text-xs text-black/60 leading-relaxed pr-4">
                Mechanical Engineer from Georgia Tech, USA. Elevates the company legacy through innovative approaches and focus on cost-effective marine solutions.
              </p>
            </div>

            <div className="team-card group cursor-pointer">
              <div className="h-[400px] bg-black/5 mb-6 overflow-hidden relative border border-black/10">
                <img src="/about/basusir.webp" alt="Mr. Arindam Basu" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 mix-blend-luminosity" />
                {/* <div className="absolute inset-0 bg-gradient-to-t from-white/90 to-transparent"></div> */}
              </div>
              <span className="text-cyan-600 uppercase tracking-[0.2em] text-[9px] font-bold mb-2 block">Vice President</span>
              <h3 className="text-xl font-bold uppercase tracking-tight text-black mb-3">Mr. Arindam Basu</h3>
              <p className="text-xs text-black/60 leading-relaxed pr-4">
                Engineering Manager with over 35 years of expertise in HDPE pipeline installation, heavy marine infrastructure, and EPC project execution.
              </p>
            </div>

            <div className="team-card group cursor-pointer">
              <div className="h-[400px] bg-black/5 mb-6 overflow-hidden relative border border-black/10">
                <img src="/about/rayudusir.webp" alt="Capt. M. K. Rayudu" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 mix-blend-luminosity" />
                {/* <div className="absolute inset-0 bg-gradient-to-t from-white/90 to-transparent"></div> */}
              </div>
              <span className="text-cyan-600 uppercase tracking-[0.2em] text-[9px] font-bold mb-2 block">Dredging Head</span>
              <h3 className="text-xl font-bold uppercase tracking-tight text-black mb-3">Capt. M. K. Rayudu</h3>
              <p className="text-xs text-black/60 leading-relaxed pr-4">
                Head of Dredging at MEKA Group, bringing over 40 years of highly specialized experience in large-scale dredging operations and marine infrastructure.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;