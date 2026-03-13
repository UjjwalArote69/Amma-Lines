import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Contact = () => {
  const pageRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

    // 1. Massive Typography Reveal
    tl.fromTo('.page-title', 
      { y: '120%', rotate: 2 }, 
      { y: '0%', rotate: 0, duration: 1.5, stagger: 0.1, delay: 0.2 }
    )
    // 2. Info text fade in
    .fromTo('.page-fade', 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 1, stagger: 0.1 }, 
      '-=1'
    )
    // 3. Form Container Shutter Reveal
    .fromTo('.form-container',
      { clipPath: 'inset(100% 0% 0% 0%)' },
      { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, ease: 'expo.inOut' },
      '-=1.2'
    )
    // 4. Form Elements Staggered Entry
    .fromTo('.form-element',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.1 },
      '-=0.8'
    );
  }, { scope: pageRef });

  return (
    <main ref={pageRef} className="w-full bg-white text-black min-h-screen flex flex-col pt-32 overflow-hidden">
      
      <section className="px-6 md:px-16 lg:px-24 pb-32 flex flex-col lg:flex-row justify-between gap-16 lg:gap-24">
        
        {/* ================= LEFT: HEADER & INFO ================= */}
        <div className="lg:w-1/2 flex flex-col justify-between">
          <div>
            <span className="page-fade text-cyan-600 uppercase tracking-[0.3em] text-[10px] font-bold mb-6 block">
              [ Inquiries ]
            </span>
            
            {/* Masked Text Reveal */}
            <div className="overflow-hidden pb-2">
              <h1 className="page-title text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-none origin-bottom-left block">
                Let's
              </h1>
            </div>
            <div className="overflow-hidden pb-2 mb-12">
              <h1 className="page-title text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-none origin-bottom-left block">
                <span style={{ WebkitTextStroke: '2px rgba(0,0,0,0.8)', color: 'transparent' }}>
                  Talk.
                </span>
              </h1>
            </div>
          </div>
          
          {/* Contact Details */}
          <div className="page-fade flex flex-col sm:flex-row gap-12 mt-12 border-t border-black/10 pt-12">
            <div>
              <span className="text-cyan-600 uppercase tracking-[0.2em] text-[9px] font-bold mb-3 block">Headquarters</span>
              <p className="text-sm text-black/60 leading-relaxed font-light">
                Meka Tower, Suite 400<br/>
                Marine Drive, Mumbai<br/>
                Maharashtra 400001, India
              </p>
            </div>
            <div>
              <span className="text-cyan-600 uppercase tracking-[0.2em] text-[9px] font-bold mb-3 block">Direct Line</span>
              <p className="text-sm text-black/60 leading-relaxed font-light mb-4">
                +91 (022) 2285 3784<br/>
                +91 (022) 2285 3785
              </p>
              <a href="mailto:info@ammalines.com" className="text-sm text-black hover:text-cyan-600 transition-colors font-bold border-b border-black/20 hover:border-cyan-600 pb-1">
                info@ammalines.com
              </a>
            </div>
          </div>
        </div>

        {/* ================= RIGHT: ARCHITECTURAL FORM ================= */}
        <div className="form-container lg:w-1/2 bg-gray-50 p-8 md:p-16 border border-black/10 flex flex-col justify-center">
           
           <div className="form-element mb-12">
             <h3 className="text-2xl font-light tracking-tight mb-2">Project Initiation</h3>
             <p className="text-xs text-black/50 tracking-wide font-light">Fill out the form below and our engineering team will reach out within 24 hours.</p>
           </div>

           <form className="flex flex-col gap-10">
             
             <div className="form-element relative group">
               <input 
                 type="text" 
                 id="name"
                 placeholder=" " 
                 className="peer w-full bg-transparent border-b border-black/20 pb-3 text-sm focus:outline-none focus:border-cyan-600 text-black transition-colors" 
               />
               <label htmlFor="name" className="absolute left-0 top-0 text-xs tracking-widest uppercase text-black/40 transition-all peer-focus:-top-5 peer-focus:text-[9px] peer-focus:text-cyan-600 peer-focus:font-bold peer-placeholder-shown:top-0 peer-placeholder-shown:text-xs">
                 Your Name
               </label>
             </div>

             <div className="form-element relative group">
               <input 
                 type="email" 
                 id="email"
                 placeholder=" " 
                 className="peer w-full bg-transparent border-b border-black/20 pb-3 text-sm focus:outline-none focus:border-cyan-600 text-black transition-colors" 
               />
               <label htmlFor="email" className="absolute left-0 top-0 text-xs tracking-widest uppercase text-black/40 transition-all peer-focus:-top-5 peer-focus:text-[9px] peer-focus:text-cyan-600 peer-focus:font-bold peer-placeholder-shown:top-0 peer-placeholder-shown:text-xs">
                 Your Email
               </label>
             </div>

             <div className="form-element relative group mt-4">
               <textarea 
                 id="details"
                 placeholder=" " 
                 rows="4" 
                 className="peer w-full bg-transparent border-b border-black/20 pb-3 text-sm focus:outline-none focus:border-cyan-600 text-black transition-colors resize-none"
               ></textarea>
               <label htmlFor="details" className="absolute left-0 top-0 text-xs tracking-widest uppercase text-black/40 transition-all peer-focus:-top-5 peer-focus:text-[9px] peer-focus:text-cyan-600 peer-focus:font-bold peer-placeholder-shown:top-0 peer-placeholder-shown:text-xs">
                 Project Details
               </label>
             </div>

             <div className="form-element mt-4">
               <button 
                 type="button" 
                 className="group relative overflow-hidden border border-black/20 px-10 py-5 text-xs tracking-[0.2em] uppercase transition-all duration-500 hover:border-cyan-600"
               >
                 <span className="relative z-10 text-black group-hover:text-white transition-colors duration-500 font-bold">
                   Submit Inquiry
                 </span>
                 <div className="absolute inset-0 h-full w-full scale-x-0 origin-left bg-cyan-600 transition-transform duration-500 group-hover:scale-x-100 ease-out" />
               </button>
             </div>

           </form>
        </div>

      </section>
    </main>
  );
};

export default Contact;