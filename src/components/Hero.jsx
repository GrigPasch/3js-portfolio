import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { useState, useEffect, useRef, Suspense, lazy } from "react";
import { styles } from "../styles";

// Lazy-load the heavy 3D canvas — doesn't block initial paint
const ComputersCanvas = lazy(() => import("./canvas/Computers"));

const roles = ["Frontend Developer","React Developer","UI Craftsman","IT Specialist","Web3 Curious"];

const TypewriterText = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting,  setDeleting]  = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const current = roles[roleIndex];
    let t;
    if (!deleting && charIndex <= current.length) {
      t = setTimeout(() => { setDisplayed(current.slice(0, charIndex)); setCharIndex(c => c + 1); }, 75);
    } else if (!deleting && charIndex > current.length) {
      t = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && charIndex >= 0) {
      t = setTimeout(() => { setDisplayed(current.slice(0, charIndex)); setCharIndex(c => c - 1); }, 42);
    } else {
      setDeleting(false);
      setRoleIndex(r => (r + 1) % roles.length);
      setCharIndex(0);
    }
    return () => clearTimeout(t);
  }, [charIndex, deleting, roleIndex]);

  return (
    <span className="text-[#5ec4ff]">
      {displayed}<span className="animate-pulse opacity-70">|</span>
    </span>
  );
};

// Reduced from 12 → 8 particles; deterministic positions
const particles = [
  { id: 0, x: 8,  y: 18, size: 5, delay: 0.0, dur: 4.2 },
  { id: 1, x: 20, y: 70, size: 7, delay: 0.5, dur: 5.1 },
  { id: 2, x: 52, y: 82, size: 6, delay: 1.5, dur: 6.0 },
  { id: 3, x: 68, y: 22, size: 5, delay: 2.0, dur: 4.4 },
  { id: 4, x: 82, y: 58, size: 5, delay: 2.5, dur: 5.5 },
  { id: 5, x: 46, y: 12, size: 8, delay: 3.5, dur: 5.8 },
  { id: 6, x: 76, y: 44, size: 4, delay: 1.3, dur: 6.2 },
  { id: 7, x: 90, y: 32, size: 4, delay: 2.3, dur: 4.6 },
];

const Particle = ({ x, y, size, delay, dur }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{
      left: `${x}%`, top: `${y}%`, width: size, height: size,
      background: "radial-gradient(circle, rgba(94,196,255,0.6) 0%, transparent 70%)",
    }}
    animate={{ y: [0, -22, 0], opacity: [0.15, 0.55, 0.15], scale: [1, 1.3, 1] }}
    transition={{ duration: dur, delay, repeat: Infinity, ease: "easeInOut" }}
  />
);

Particle.propTypes = {
  x:     PropTypes.number.isRequired,
  y:     PropTypes.number.isRequired,
  size:  PropTypes.number.isRequired,
  delay: PropTypes.number.isRequired,
  dur:   PropTypes.number.isRequired,
};

const Hero = () => {
  const canvasRef = useRef(null);
  const [canvasVisible, setCanvasVisible] = useState(false);

  // Load 3D canvas only after first paint — improves LCP significantly
  useEffect(() => {
    const id = requestIdleCallback
      ? requestIdleCallback(() => setCanvasVisible(true), { timeout: 1500 })
      : setTimeout(() => setCanvasVisible(true), 300);
    return () => (requestIdleCallback ? cancelIdleCallback(id) : clearTimeout(id));
  }, []);

  return (
    <section className="relative w-full h-screen mx-auto overflow-hidden">

      {/* 3D globe — lazy loaded after idle */}
      <div ref={canvasRef} className="absolute inset-0 z-0">
        {canvasVisible && (
          <Suspense fallback={null}>
            <ComputersCanvas />
          </Suspense>
        )}
      </div>

      {/* Directional gradient veil */}
      <div className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background: "linear-gradient(105deg, rgba(5,8,22,0.94) 0%, rgba(5,8,22,0.78) 45%, rgba(5,8,22,0.15) 100%)" }} />

      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full pointer-events-none z-[1]"
        style={{ background: "radial-gradient(circle, rgba(94,196,255,0.06) 0%, transparent 70%)" }} />

      {/* Particles */}
      <div className="absolute inset-0 z-[2] pointer-events-none">
        {particles.map(p => <Particle key={p.id} {...p} />)}
      </div>

      {/* Text content */}
      <div className={`absolute inset-0 top-[100px] sm:top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-4 sm:gap-5 z-[3]`}>

        {/* Accent line */}
        <div className="flex flex-col justify-center items-center mt-5 shrink-0">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#5ec4ff]"
            style={{ boxShadow: "0 0 16px rgba(94,196,255,0.7)" }} />
          <motion.div initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="w-[2px] sm:h-80 h-40 violet-gradient origin-top" />
        </div>

        <div className="mt-4 sm:mt-5 max-w-xl sm:max-w-2xl">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.3 }}>
            <p className="font-body text-[#9d9ab5] text-[10px] sm:text-[12px] tracking-[4px] sm:tracking-[5px] uppercase mb-2 sm:mb-3 font-medium">
              👋 Based in Serres, Greece
            </p>
            <h1 className={styles.heroHeadText}>
              Hi, I&apos;m{" "}
              <span className="relative inline-block">
                <span className="shimmer-text">Grigoris</span>
                <motion.span className="absolute -bottom-1 left-0 h-[2px] rounded-full"
                  style={{ background: "linear-gradient(90deg, #5ec4ff, #bf61ff)" }}
                  initial={{ width: 0 }} animate={{ width: "100%" }}
                  transition={{ duration: 0.9, delay: 1.1 }} />
              </span>
            </h1>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.55 }} className="mt-3 sm:mt-4">
            <p className={styles.heroSubText}>A passionate <TypewriterText /></p>
            <p className="font-body text-[#9d9ab5] text-[13px] sm:text-[14px] mt-3 sm:mt-4 max-w-sm sm:max-w-md leading-[24px] sm:leading-[26px] hidden xs:block">
              Building clean, performant web interfaces with React and modern tooling.
              Open to relocation across the EU.
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-wrap gap-3 mt-6 sm:mt-8">
            <a href="#contact" className="btn-primary !text-[13px] sm:!text-[14px] !py-2.5 sm:!py-3 !px-5 sm:!px-6">
              Get in touch
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a href="#projects" className="btn-secondary !text-[13px] sm:!text-[14px] !py-2.5 sm:!py-3 !px-5 sm:!px-6">
              View my work
            </a>
          </motion.div>

          {/* Stats — hidden on mobile to avoid clutter */}
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.05 }}
            className="hidden sm:flex gap-6 sm:gap-10 mt-8 sm:mt-10">
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute xs:bottom-10 bottom-28 sm:bottom-32 w-full flex justify-center items-center z-[3]">
        <a href="#about">
          <motion.div animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 group">
            <span className="font-body text-[#9d9ab5] text-[9px] sm:text-[10px] uppercase tracking-[3px] group-hover:text-white transition-colors">Scroll</span>
            <div className="w-[24px] sm:w-[28px] h-[44px] sm:h-[50px] rounded-3xl border-2 border-[#9d9ab5]/40 group-hover:border-[#5ec4ff]/60 transition-colors flex justify-center items-start p-1.5">
              <motion.div animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-1.5 h-1.5 rounded-full bg-[#5ec4ff]" />
            </div>
          </motion.div>
        </a>
      </div>
    </section>
  );
};

export default Hero;