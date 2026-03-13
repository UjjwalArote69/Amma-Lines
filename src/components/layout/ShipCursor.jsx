import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const ShipCursor = () => {
  const cursorRef = useRef(null);
  const canvasRef = useRef(null);
  
  // Track positions & data
  const mouse = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const pos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const angle = useRef(0);
  const particles = useRef([]); // For the V-wake streamlines
  const history = useRef([]);   // For the center tracking line

  useEffect(() => {
    // 1. Hide default cursor globally
    document.body.style.cursor = 'none';
    const style = document.createElement('style');
    style.innerHTML = `* { cursor: none !important; }`;
    document.head.appendChild(style);

    // 2. Track Mouse Movement
    const onMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    window.addEventListener('mousemove', onMouseMove);

    // 3. Handle Canvas Resizing & High-DPI (Retina) Display Fix
    const resizeCanvas = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        ctx.scale(dpr, dpr);
      }
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // GSAP QuickSetters for maximum performance
    const xSet = gsap.quickSetter(cursorRef.current, "x", "px");
    const ySet = gsap.quickSetter(cursorRef.current, "y", "px");
    const rSet = gsap.quickSetter(cursorRef.current, "rotation", "deg");

    // 4. Main Animation Loop
    const renderLoop = () => {
      const dx = mouse.current.x - pos.current.x;
      const dy = mouse.current.y - pos.current.y;
      
      // Elite Lerp (Stiffer, more mechanical follow)
      pos.current.x += dx * 0.15;
      pos.current.y += dy * 0.15;

      const speed = Math.hypot(dx, dy);
      const moveAngle = Math.atan2(dy, dx);

      // Lock rotation precisely to movement vector
      if (speed > 0.5) {
        angle.current = moveAngle * (180 / Math.PI) + 90; 
      }

      // Very subtle idle bobbing (implies heavy mass)
      const time = Date.now() / 1000;
      const bobbing = Math.sin(time * 2) * 1.5; 

      // Apply coordinates
      xSet(pos.current.x);
      ySet(pos.current.y);
      rSet(angle.current + bobbing);

      // --- ARCHITECTURAL CANVAS RENDERING ---
      const ctx = canvasRef.current?.getContext('2d');
      if (!ctx) return;

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      
      // We use white for all strokes because mix-blend-difference will handle the contrast

      // A. Center Tracking Line (CAD blueprint effect)
      history.current.push({ x: pos.current.x, y: pos.current.y });
      if (history.current.length > 40) history.current.shift(); // Trail length

      if (history.current.length > 1) {
        for (let i = 0; i < history.current.length - 1; i++) {
          ctx.beginPath();
          ctx.moveTo(history.current[i].x, history.current[i].y);
          ctx.lineTo(history.current[i + 1].x, history.current[i + 1].y);
          // Fades out towards the tail
          ctx.strokeStyle = `rgba(255, 255, 255, ${(i / history.current.length) * 0.3})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // B. Fluid Dynamics V-Wake (Streamlines)
      if (speed > 1.5) {
        const backAngle = moveAngle + Math.PI; // Directly behind
        const vSpread = 0.45; // Tighter, aerodynamic V-shape
        
        // Spawning origin (from the "engine" at the back of the SVG)
        const spawnX = pos.current.x - Math.cos(moveAngle) * 12;
        const spawnY = pos.current.y - Math.sin(moveAngle) * 12;

        // Port (Left) streamline vector
        particles.current.push({
          x: spawnX, y: spawnY, life: 1,
          vx: Math.cos(backAngle - vSpread) * speed * 0.1,
          vy: Math.sin(backAngle - vSpread) * speed * 0.1,
        });

        // Starboard (Right) streamline vector
        particles.current.push({
          x: spawnX, y: spawnY, life: 1,
          vx: Math.cos(backAngle + vSpread) * speed * 0.1,
          vy: Math.sin(backAngle + vSpread) * speed * 0.1,
        });
      }

      // Render the wake particles as crisp directional lines (streaks) instead of dots
      for (let i = particles.current.length - 1; i >= 0; i--) {
        let p = particles.current[i];
        
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.03; // Fade speed
        
        if (p.life <= 0) {
          particles.current.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        // Draw a short line representing the velocity vector
        ctx.lineTo(p.x - p.vx * 3, p.y - p.vy * 3);
        ctx.strokeStyle = `rgba(255, 255, 255, ${p.life * 0.5})`; 
        ctx.lineWidth = 1;
        ctx.lineCap = 'round';
        ctx.stroke();
      }
    };

    gsap.ticker.add(renderLoop);

    return () => {
      gsap.ticker.remove(renderLoop);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', resizeCanvas);
      document.head.removeChild(style);
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    // mix-blend-difference guarantees high-contrast elegance over ANY background
    <div className="fixed inset-0 pointer-events-none z-[9999] mix-blend-difference">
      
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      
      <div 
        ref={cursorRef} 
        // Perfectly centers the architectural SVG on the exact mouse pixel
        className="absolute top-0 left-0 w-6 h-8 -ml-3 -mt-4 flex items-center justify-center"
      >
        {/* Minimalist Architectural Ship Keel / Bow Wireframe */}
        <svg 
          viewBox="0 0 20 30" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-full h-full text-white"
        >
          {/* Sharp Outer Hull */}
          <path 
            d="M10 0L20 30L10 24L0 30L10 0Z" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinejoin="round"
          />
          {/* Center Keel Line (gives it the blueprint look) */}
          <path 
            d="M10 0V24" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            className="opacity-50"
          />
        </svg>
      </div>
      
    </div>
  );
};

export default ShipCursor;