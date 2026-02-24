/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/no-unknown-property */
import { Suspense, useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Preload } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { services } from "../constants/constants_index";
import { fadeIn, textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";
import CanvasLoader from "./Loader";

const skills = [
  "React.js","Next.js","TypeScript","JavaScript",
  "Tailwind CSS","HTML / CSS","Node.js","Git",
  "WordPress","MySQL","Firebase","Vite",
  "Framer Motion","Three.js","Prestashop",
];

const facts = [
  { icon: "📍", label: "Location",   value: "Serres, Greece"                              },
  { icon: "🌍", label: "Relocation", value: "Open to EU"                                  },
  { icon: "🎓", label: "Degree",     value: "BEng, 2023"                                  },
  { icon: "🗣️", label: "Languages",  value: "Greek (native) · English (C1) · German (B2)" },
  { icon: "💼", label: "Status",     value: "Open to Junior Frontend roles"               },
];

/* ─── Fluid morphing hook ─── */
const useMorphingGeometry = (baseGeo, speed = 1, amplitude = 0.12) => {
  const meshRef = useRef();
  // Store original positions once
  const originalPositions = useMemo(() => Float32Array.from(baseGeo.attributes.position.array), [baseGeo]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t   = clock.getElapsedTime() * speed;
    const pos = meshRef.current.geometry.attributes.position;
    const len = pos.count;
    for (let i = 0; i < len; i++) {
      const ix = i * 3;
      const ox = originalPositions[ix], oy = originalPositions[ix+1], oz = originalPositions[ix+2];
      const noise = (Math.sin(ox * 2.1 + t * 1.1) + Math.sin(oy * 1.9 + t * 0.9) + Math.sin(oz * 2.3 + t * 1.3)) / 6;
      const f = 1 + noise * amplitude;
      pos.setXYZ(i, ox * f, oy * f, oz * f);
    }
    pos.needsUpdate = true;
    meshRef.current.geometry.computeVertexNormals();
  });
  return meshRef;
};

/* ─── Shapes ─── */
const FluidTorusKnot = ({ color, emissive }) => {
  const meshRef = useRef();
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.rotation.x = Math.sin(t * 0.4) * 0.3;
    meshRef.current.rotation.z = Math.cos(t * 0.3) * 0.2;
  });
  return (
    <mesh ref={meshRef} castShadow scale={0.72}>
      <torusKnotGeometry args={[1, 0.32, 96, 14]} />
      <meshStandardMaterial color={color} emissive={emissive} emissiveIntensity={0.4} roughness={0.1} metalness={0.9} />
    </mesh>
  );
};

const FluidIcosahedron = ({ color, emissive }) => {
  const geo = useMemo(() => new THREE.IcosahedronGeometry(1, 3), []);
  const meshRef = useMorphingGeometry(geo, 0.7, 0.14);
  return (
    <mesh ref={meshRef} castShadow scale={1.3}>
      <primitive object={geo} attach="geometry" />
      <meshStandardMaterial color={color} emissive={emissive} emissiveIntensity={0.4} roughness={0.15} metalness={0.85} />
    </mesh>
  );
};

const FluidOctahedron = ({ color, emissive }) => {
  const geo = useMemo(() => new THREE.OctahedronGeometry(1, 1), []);
  const meshRef = useMorphingGeometry(geo, 0.85, 0.13);
  return (
    <mesh ref={meshRef} castShadow scale={1.25}>
      <primitive object={geo} attach="geometry" />
      <meshStandardMaterial color={color} emissive={emissive} emissiveIntensity={0.4} roughness={0.15} metalness={0.85} />
    </mesh>
  );
};

const serviceConfig = [
  { color: "#5ec4ff", emissive: "#1a6aaa", label: "Frontend Developer",    Shape: FluidTorusKnot   },
  { color: "#bf61ff", emissive: "#6a1aaa", label: "React Developer",       Shape: FluidIcosahedron },
  { color: "#00cea8", emissive: "#006a55", label: "IT Support Specialist",  Shape: FluidOctahedron  },
];

const ServiceScene = ({ config }) => {
  const { Shape, color, emissive } = config;
  return (
    <Float speed={1.6} rotationIntensity={0.5} floatIntensity={1.2}>
      <ambientLight intensity={0.25} />
      <directionalLight position={[5, 5, 5]} intensity={0.7} />
      <pointLight position={[3, 3, 3]}    intensity={1.4} color={color} />
      <pointLight position={[-3, -2, -3]} intensity={0.5} color={color} />
      <Shape color={color} emissive={emissive} />
    </Float>
  );
};

/* ─── CSS fallback shape for mobile — no WebGL ─── */
const ShapeFallback = ({ color, index }) => {
  const shapes = [
    <div key="tk" className="relative w-full h-full flex items-center justify-center">
      {[1, 0.72, 0.46].map((s, i) => (
        <div key={i} className="absolute rounded-full border-2"
          style={{
            width: `${s * 100}%`, height: `${s * 100}%`,
            borderColor: color + (i === 0 ? "60" : i === 1 ? "90" : "ff"),
            boxShadow: i === 2 ? `0 0 16px ${color}60` : "none",
            animation: `spin ${3 + i * 1.2}s linear infinite ${i % 2 === 0 ? "" : "reverse"}`,
          }} />
      ))}
    </div>,
    <div key="ico" className="relative w-full h-full flex items-center justify-center">
      {[0, 60, 120].map((rot, i) => (
        <div key={i} className="absolute"
          style={{
            width: "65%", height: "65%",
            border: `2px solid ${color}${i === 0 ? "ff" : i === 1 ? "80" : "40"}`,
            borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
            transform: `rotate(${rot}deg)`,
            boxShadow: i === 0 ? `0 0 18px ${color}50` : "none",
            animation: `spin ${4 + i * 0.8}s linear infinite`,
          }} />
      ))}
    </div>,
    <div key="oct" className="relative w-full h-full flex items-center justify-center">
      {[45, 0, 22].map((rot, i) => (
        <div key={i} className="absolute"
          style={{
            width: `${(1 - i * 0.2) * 65}%`, height: `${(1 - i * 0.2) * 65}%`,
            border: `2px solid ${color}${i === 0 ? "50" : i === 1 ? "80" : "ff"}`,
            transform: `rotate(${rot}deg)`,
            boxShadow: i === 2 ? `0 0 16px ${color}60` : "none",
            animation: `spin ${3.5 + i * 0.6}s linear infinite ${i % 2 ? "reverse" : ""}`,
          }} />
      ))}
    </div>,
  ];
  return shapes[index] ?? shapes[0];
};

/* ─── ServiceCard ─── */
const ServiceCard = ({ index }) => {
  const config   = serviceConfig[index];
  const { color, label } = config;
  const wrapRef  = useRef(null);
  const [visible,   setVisible]   = useState(false);
  const [isMobile,  setIsMobile]  = useState(() => window.innerWidth < 768);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const h = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const el = wrapRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "100px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [isMobile]);

  return (
    <motion.div
      variants={fadeIn("up", "spring", 0.2 * index, 0.65)}
      className="flex flex-col items-center gap-3 group"
    >
      <div ref={wrapRef} className="relative w-[140px] h-[140px] sm:w-[190px] sm:h-[190px]">
        {isMobile ? (
          /* CSS animated shape*/
          <div className="w-full h-full rounded-full flex items-center justify-center"
            style={{ background: `radial-gradient(circle, ${color}12 0%, transparent 70%)` }}>
            <ShapeFallback color={color} index={index} />
          </div>
        ) : (
          visible && (
            <Canvas
              frameloop="always"
              dpr={[1, 1.5]}
              gl={{ preserveDrawingBuffer: false, alpha: true, antialias: true, powerPreference: "high-performance" }}
              camera={{ position: [0, 0, 5], fov: 40 }}
            >
              <Suspense fallback={<CanvasLoader />}>
                <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={2.5} />
                <ServiceScene config={config} />
              </Suspense>
              <Preload all />
            </Canvas>
          )
        )}
        {/* Glow bloom */}
        <div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 w-20 h-4 rounded-full blur-2xl opacity-40 group-hover:opacity-70 transition-opacity duration-300 pointer-events-none"
          style={{ background: color }}
        />
      </div>
      <p className="font-display text-[14px] sm:text-[15px] font-bold text-center text-white/80 group-hover:text-white transition-colors leading-snug">
        {label}
      </p>
      <div className="w-1.5 h-1.5 rounded-full transition-transform duration-300 group-hover:scale-150" style={{ background: color }} />
    </motion.div>
  );
};

const About = () => (
  <div className="relative">
    <span className="font-display absolute -top-6 -left-2 text-[110px] font-black text-white/[0.025] leading-none select-none pointer-events-none hidden lg:block">01</span>

    <motion.div variants={textVariant()}>
      <p className={styles.sectionSubText}>Introduction</p>
      <h2 className={styles.sectionHeadText}>About Me.</h2>
    </motion.div>

    <motion.div variants={fadeIn("right", "tween", 0.1, 0.6)}
      className="mt-4 mb-8 sm:mb-10 h-[1px] w-full max-w-xs"
      style={{ background: "linear-gradient(90deg, #5ec4ff, transparent)" }} />

    {/* Two-column layout — stacks on mobile */}
    <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">

      <motion.div variants={fadeIn("right", "tween", 0.15, 0.75)} className="flex-1 min-w-0 space-y-4 sm:space-y-5">
        <p className="font-body text-[#9d9ab5] text-[15px] sm:text-[16px] leading-[28px] sm:leading-[30px]">
          I&apos;m a <span className="text-white font-medium">detail-oriented Frontend Developer</span> from{" "}
          <span className="text-[#5ec4ff] font-medium">Serres, Greece</span>, with a BEng in Computer,
          Informatics & Telecommunications Engineering and over{" "}
          <span className="text-white font-medium">6 years of combined experience</span> in web development and IT support.
        </p>
        <p className="font-body text-[#9d9ab5] text-[15px] sm:text-[16px] leading-[28px] sm:leading-[30px]">
          My stack of choice is <span className="text-white font-medium">React · TypeScript · Tailwind</span>, though I&apos;m equally
          comfortable with Next.js, WordPress and databases. I care about interfaces that are{" "}
          <span className="text-[#5ec4ff] font-medium">fast, accessible and thoughtfully designed</span>.
        </p>
        <p className="font-body text-[#9d9ab5] text-[15px] sm:text-[16px] leading-[28px] sm:leading-[30px]">
          Currently at <span className="text-white font-medium">DROMEAS S.A.</span> building internal web apps and managing the e-shop.
          Actively looking for a <span className="text-[#5ec4ff] font-medium">Junior Frontend Developer role</span>.
          Open to relocation anywhere in the EU 🇪🇺
        </p>

        <div className="pt-2 flex flex-wrap gap-2">
          {skills.map((skill, i) => (
            <motion.span key={skill}
              variants={fadeIn("up", "spring", 0.03 * i, 0.35)}
              className="font-body px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-[12px] font-medium border border-white/[0.08] text-[#9d9ab5] hover:border-[#5ec4ff]/40 hover:text-white transition-all duration-200 cursor-default bg-white/[0.02]">
              {skill}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Quick Facts */}
      <motion.div variants={fadeIn("left", "tween", 0.25, 0.75)} className="w-full lg:w-[260px] shrink-0">
        <div className="gradient-border rounded-2xl">
          <div className="bg-[var(--bg-surface)] rounded-2xl p-5 sm:p-6 space-y-4">
            <h4 className="font-display text-[#5ec4ff] text-[11px] sm:text-[13px] font-bold uppercase tracking-[3px]">Quick Facts</h4>
            {facts.map((f, i) => (
              <div key={f.label}>
                <div className="flex gap-2 items-start">
                  <span className="text-[14px] mt-0.5">{f.icon}</span>
                  <div>
                    <p className="font-body text-[#4a4766] text-[9px] sm:text-[10px] uppercase tracking-wider mb-0.5">{f.label}</p>
                    <p className="font-body text-white text-[12px] sm:text-[13px] font-medium leading-snug">{f.value}</p>
                  </div>
                </div>
                {i < facts.length - 1 && <div className="mt-3 h-[1px] bg-white/[0.05]" />}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>

    {/* 3D shapes */}
    <motion.div variants={fadeIn("", "", 0.3, 0.8)}
      className="mt-14 sm:mt-20 flex flex-wrap justify-center gap-8 sm:gap-16">
      {services.map((_, index) => (
        <ServiceCard key={index} index={index} />
      ))}
    </motion.div>
  </div>
);

export default SectionWrapper(About, "about");