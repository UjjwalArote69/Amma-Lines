import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
const Contact = () => {
  const pageRef = useRef(null);

  useGSAP(() => {
    gsap.from('.page-title', { y: 100, opacity: 0, duration: 1.2, stagger: 0.1, ease: 'power4.out', delay: 0.2 });
    gsap.from('.page-fade', { opacity: 0, y: 20, duration: 1, ease: 'power2.out', delay: 0.5 });
  }, { scope: pageRef });

  return (
    <main ref={pageRef} className="w-full bg-[#0a0a0a] text-white min-h-screen flex flex-col pt-32">
      
      
      <section className="px-6 md:px-16 lg:px-24 pb-24 border-b border-white/10 flex flex-col lg:flex-row justify-between gap-16">
        
        {/* Header & Info */}
        <div className="lg:w-1/2">
          <span className="page-fade text-cyan-400 uppercase tracking-[0.3em] text-[10px] font-bold mb-6 block">Inquiries</span>
          <div className="overflow-hidden pb-2">
            <h1 className="page-title text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-none mb-12">
              Let's <br/>
              <span style={{ WebkitTextStroke: '2px rgba(255,255,255,0.8)', color: 'transparent' }}>Talk.</span>
            </h1>
          </div>
          
          <div className="page-fade flex flex-col gap-8 mt-12 border-t border-white/10 pt-8">
            <div>
              <span className="text-cyan-400 uppercase tracking-[0.2em] text-[9px] font-bold mb-2 block">Headquarters</span>
              <p className="text-sm text-white/70 leading-relaxed font-light">
                20 Madhuli Dr.<br/>A B Road, Worli<br/>Mumbai (400 018), India
              </p>
            </div>
            <div>
              <span className="text-cyan-400 uppercase tracking-[0.2em] text-[9px] font-bold mb-2 block">Direct Line</span>
              <p className="text-sm text-white/70 leading-relaxed font-light">+91 22 4089 0000</p>
            </div>
          </div>
        </div>

        {/* Brutalist Contact Form Placeholder */}
        <div className="page-fade lg:w-1/2 bg-white/5 p-8 md:p-12 border border-white/10">
           <form className="flex flex-col gap-8">
             <input type="text" placeholder="YOUR NAME" className="w-full bg-transparent border-b border-white/20 pb-4 text-sm focus:outline-none focus:border-cyan-400 uppercase tracking-widest placeholder:text-white/30 transition-colors" />
             <input type="email" placeholder="YOUR EMAIL" className="w-full bg-transparent border-b border-white/20 pb-4 text-sm focus:outline-none focus:border-cyan-400 uppercase tracking-widest placeholder:text-white/30 transition-colors" />
             <textarea placeholder="PROJECT DETAILS" rows="4" className="w-full bg-transparent border-b border-white/20 pb-4 text-sm focus:outline-none focus:border-cyan-400 uppercase tracking-widest placeholder:text-white/30 transition-colors resize-none"></textarea>
             <button type="button" className="self-start mt-4 border border-white/20 px-8 py-4 text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all">Submit Inquiry</button>
           </form>
        </div>

      </section>

    </main>
  );
};

export default Contact;