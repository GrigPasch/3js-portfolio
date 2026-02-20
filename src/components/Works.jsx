/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { useRef, useState, useMemo, useEffect, Suspense, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants/constants_index";
import { textVariant, fadeIn } from "../utils/motion";

const ACCENTS = ["#5ec4ff", "#bf61ff", "#00cea8", "#f5af19", "#fc6767", "#56ccf2"];

const getExt = (tags) => {
  const names = tags.map(t => t.name.toLowerCase());
  if (names.some(n => n.includes("typescript"))) return ".tsx";
  if (names.some(n => n.includes("next")))       return ".jsx";
  if (names.some(n => n.includes("react")))      return ".jsx";
  return ".js";
};

/* ── 3D background — floating grid + particles ── */
const BGScene = () => {
  const gridRef = useRef();
  const partRef = useRef();

  const particleGeo = useMemo(() => {
    const count = 180;
    const pos   = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return g;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (gridRef.current) {
      gridRef.current.rotation.x = -0.45 + Math.sin(t * 0.12) * 0.02;
      gridRef.current.position.y = -3.5 + Math.sin(t * 0.08) * 0.15;
    }
    if (partRef.current) {
      partRef.current.rotation.y = t * 0.006;
    }
  });

  // Procedural grid lines
  const gridLines = useMemo(() => {
    const lines = [];
    const W = 28, D = 22, cols = 14, rows = 11;
    for (let i = 0; i <= cols; i++) {
      const x = -W / 2 + (i / cols) * W;
      lines.push([x, 0, -D / 2, x, 0, D / 2]);
    }
    for (let j = 0; j <= rows; j++) {
      const z = -D / 2 + (j / rows) * D;
      lines.push([-W / 2, 0, z, W / 2, 0, z]);
    }
    return lines;
  }, []);

  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 4, 2]}  intensity={0.8} color="#5ec4ff" />
      <pointLight position={[0, -2, 2]} intensity={0.4} color="#bf61ff" />

      <group ref={gridRef} position={[0, -3.5, 0]} rotation={[-0.45, 0, 0]}>
        {gridLines.map((l, i) => {
          const pts = [new THREE.Vector3(l[0], l[1], l[2]), new THREE.Vector3(l[3], l[4], l[5])];
          const geo = new THREE.BufferGeometry().setFromPoints(pts);
          const isHoriz = l[1] === l[4] && l[0] !== l[3];
          return (
            <line key={i} geometry={geo}>
              <lineBasicMaterial
                color={isHoriz ? "#5ec4ff" : "#bf61ff"}
                transparent
                opacity={0.06 + (i % 3 === 0 ? 0.04 : 0)}
              />
            </line>
          );
        })}
      </group>

      {/* Dust */}
      <points ref={partRef} geometry={particleGeo}>
        <pointsMaterial color="#5ec4ff" size={0.028} transparent opacity={0.25} sizeAttenuation />
      </points>

      <Stars radius={60} depth={30} count={700} factor={2.5} fade speed={0.4} />
    </>
  );
};

/* ── traffic light buttons ── */
const TrafficLights = ({ onClose }) => (
  <div className="flex items-center gap-1.5">
    <button onClick={onClose} aria-label="Close"
      className="w-3 h-3 rounded-full transition-opacity hover:opacity-80"
      style={{ background: "#ff5f57" }} />
    <div className="w-3 h-3 rounded-full" style={{ background: "#febc2e" }} />
    <div className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
  </div>
);

/* ── fake path breadcrumb ── */
const PathBar = ({ project }) => {
  const [shown, setShown] = useState("");
  const path = project
    ? `~/projects/${project.name.toLowerCase().replace(/\s+/g, "-")}${getExt(project.tags)}`
    : "~/projects";

  useEffect(() => {
    setShown("");
    let i = 0;
    const id = setInterval(() => {
      setShown(path.slice(0, i + 1));
      i++;
      if (i >= path.length) clearInterval(id);
    }, 22);
    return () => clearInterval(id);
  }, [path]);

  return (
    <div className="flex items-center gap-1.5 font-mono text-[10px] sm:text-[11px] text-[#9d9ab5] min-w-0 overflow-hidden">
      <span className="text-[#5ec4ff] shrink-0">❯</span>
      <span className="truncate">{shown}<span className="animate-pulse">▋</span></span>
    </div>
  );
};

/* ── sidebar file item ── */
const FileItem = ({ project, index, selected, onClick }) => {
  const color = ACCENTS[index % ACCENTS.length];
  const ext   = getExt(project.tags);
  const isSelected = selected === index;

  return (
    <motion.button
      onClick={() => onClick(index)}
      whileHover={{ x: 2 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      className="w-full text-left flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors duration-150 group"
      style={{
        background: isSelected ? `${color}14` : "transparent",
        border: isSelected ? `1px solid ${color}30` : "1px solid transparent",
      }}
    >
      {/* File icon */}
      <div className="shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded flex items-center justify-center text-[8px] font-bold"
        style={{ background: `${color}20`, color, border: `1px solid ${color}30` }}>
        {ext === ".tsx" ? "T" : ext === ".jsx" ? "J" : "JS"}
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-body text-[11px] sm:text-[12px] font-medium truncate transition-colors"
          style={{ color: isSelected ? "#fff" : "#9d9ab5" }}>
          {project.name}
        </p>
        <p className="font-mono text-[9px] sm:text-[10px]" style={{ color: `${color}90` }}>
          {ext}
        </p>
      </div>
      {isSelected && (
        <div className="w-1 h-1 rounded-full shrink-0" style={{ background: color }} />
      )}
    </motion.button>
  );
};

/* ── main preview panel ── */
const PreviewPanel = ({ project, index }) => {
  const color     = ACCENTS[index % ACCENTS.length];
  const cleanDesc = typeof project.description === "string"
    ? project.description.replace(/<br\s*\/?>/gi, " ")
    : "";

  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, x: 18 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -18 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className="h-full flex flex-col overflow-hidden"
    >
      {/* Screenshot */}
      <div className="relative w-full shrink-0 overflow-hidden"
        style={{ height: "clamp(140px, 30vh, 260px)" }}>
        <motion.img
          src={project.image}
          alt={project.name}
          loading="lazy"
          decoding="async"
          initial={{ scale: 1.04 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full object-cover"
        />
        {/* Scanline overlay for CRT feel */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.06) 2px, rgba(0,0,0,0.06) 4px)",
            mixBlendMode: "overlay",
          }} />
        <div className="absolute inset-0"
          style={{ background: `linear-gradient(to top, #050816 0%, transparent 50%)` }} />
        {/* Accent top bar */}
        <div className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />
      </div>
      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3 sm:space-y-4"
        style={{ scrollbarWidth: "none" }}>
        {/* Title row */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display font-bold text-[15px] sm:text-[17px] leading-snug"
              style={{ color }}>
              {project.name}
            </h3>
            <p className="font-mono text-[9px] sm:text-[10px] mt-0.5"
              style={{ color: `${color}70` }}>
              {getExt(project.tags)} · {project.tags.length} dependencies
            </p>
          </div>
          <a
            href={project.source_code_link}
            target="_blank"
            rel="noreferrer noopener"
            onClick={(e) => e.stopPropagation()}
            className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-body text-[11px] sm:text-[12px] font-semibold transition-all duration-200 hover:scale-105"
            style={{
              background: `${color}18`,
              border: `1px solid ${color}35`,
              color,
            }}
          >
            <img src={github} alt="" aria-hidden="true" className="w-3 h-3 opacity-80" />
            GitHub
          </a>
        </div>
        {/* Divider */}
        <div className="h-[1px]" style={{ background: `linear-gradient(90deg, ${color}40, transparent)` }} />
        {/* Description */}
        <div>
          <p className="font-mono text-[9px] sm:text-[10px] text-[#4a4766] mb-1.5 uppercase tracking-wider">
            // description
          </p>
          <p className="font-body text-[#9d9ab5] text-[12px] sm:text-[13px] leading-[20px] sm:leading-[22px]">
            {cleanDesc}
          </p>
        </div>
        {/* Tech stack */}
        <div>
          <p className="font-mono text-[9px] sm:text-[10px] text-[#4a4766] mb-1.5 uppercase tracking-wider">
            // stack
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span key={tag.name}
                className={`font-mono text-[10px] sm:text-[11px] font-semibold px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.08] ${tag.color}`}>
                {tag.name}
              </span>
            ))}
          </div>
        </div>
        {/* Fake status bar */}
        <div className="flex items-center gap-3 pt-1">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="font-mono text-[9px] text-[#4a4766]">deployed</span>
          </div>
          <div className="font-mono text-[9px] text-[#4a4766]">
            UTF-8 · LF · {Math.floor(Math.random() * 800 + 200)} lines
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ── empty state ── */
const EmptyState = () => (
  <div className="h-full flex flex-col items-center justify-center gap-3 p-8">
    <div className="w-12 h-12 rounded-xl flex items-center justify-center"
      style={{ background: "rgba(94,196,255,0.06)", border: "1px solid rgba(94,196,255,0.12)" }}>
      <svg className="w-5 h-5 text-[#5ec4ff]/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
      </svg>
    </div>
    <p className="font-mono text-[11px] text-[#4a4766] text-center leading-relaxed">
      Select a file to preview
    </p>
  </div>
);

/* ── mobile card list (no OS chrome) ── */
const MobileView = ({ selected, onSelect }) => {
  const project = selected !== null ? projects[selected] : null;
  const color   = selected !== null ? ACCENTS[selected % ACCENTS.length] : "#5ec4ff";

  return (
    <div className="space-y-3">
      {/* File list */}
      <div className="rounded-xl overflow-hidden"
        style={{ background: "rgba(13,11,30,0.95)", border: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="flex items-center gap-2 px-3 py-2 border-b border-white/[0.05]">
          <div className="w-2 h-2 rounded-full bg-[#5ec4ff]/40" />
          <span className="font-mono text-[10px] text-[#4a4766]">~/projects</span>
        </div>
        <div className="p-2 space-y-0.5">
          {projects.map((p, i) => (
            <FileItem key={i} project={p} index={i} selected={selected} onClick={onSelect} />
          ))}
        </div>
      </div>

      {/* Preview */}
      <AnimatePresence mode="wait">
        {project && (
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="rounded-xl overflow-hidden"
            style={{ background: "rgba(13,11,30,0.95)", border: `1px solid ${color}30` }}
          >
            <PreviewPanel project={project} index={selected} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ── desktop OS window ── */
const DesktopOS = ({ selected, onSelect, onClose }) => {
  const project = selected !== null ? projects[selected] : null;
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setMounted(true); obs.disconnect(); } },
      { rootMargin: "100px" }
    );
    if (canvasRef.current) obs.observe(canvasRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="relative w-full" style={{ height: "clamp(480px, 72vh, 720px)" }}>
      {/* 3D background */}
      <div ref={canvasRef} className="absolute inset-0 rounded-2xl overflow-hidden">
        {mounted && (
          <Canvas
            frameloop="always"
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
            camera={{ position: [0, 1.5, 9], fov: 55 }}
            style={{ background: "#030210" }}
          >
            <Suspense fallback={null}>
              <BGScene />
            </Suspense>
          </Canvas>
        )}
        {/* Vignette */}
        <div className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(3,2,16,0.7) 100%)" }} />
      </div>
      {/* OS window  */}
      <div className="absolute inset-4 sm:inset-8 flex flex-col rounded-2xl overflow-hidden"
        style={{
          background: "rgba(8,6,20,0.92)",
          border: "1px solid rgba(255,255,255,0.09)",
          backdropFilter: "blur(24px)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}>
        {/* Title bar */}
        <div className="flex items-center justify-between px-4 py-2.5 shrink-0"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}>
          <TrafficLights onClose={onClose} />
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm flex items-center justify-center"
              style={{ background: "rgba(94,196,255,0.12)" }}>
              <div className="w-1.5 h-1.5 rounded-sm bg-[#5ec4ff]/60" />
            </div>
            <span className="font-mono text-[10px] sm:text-[11px] text-[#9d9ab5]">
              GrigPasch — projects
            </span>
          </div>
          <div className="flex items-center gap-1 opacity-40">
            <div className="w-4 h-[1px] bg-white/50" />
            <div className="w-3 h-3 border border-white/50 rounded-sm" />
          </div>
        </div>
        {/* Menu bar */}
        <div className="flex items-center gap-4 px-4 py-1.5 shrink-0"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", background: "rgba(255,255,255,0.01)" }}>
          {["File", "Edit", "View", "Go", "Help"].map((m) => (
            <span key={m} className="font-body text-[10px] sm:text-[11px] text-[#9d9ab5]/60 hover:text-white/80 cursor-default transition-colors">
              {m}
            </span>
          ))}
          <div className="ml-auto">
            <PathBar project={project} />
          </div>
        </div>
        {/* Main content — sidebar + preview */}
        <div className="flex flex-1 min-h-0">
          {/* Sidebar */}
          <div className="shrink-0 flex flex-col"
            style={{
              width: "clamp(160px, 28%, 220px)",
              borderRight: "1px solid rgba(255,255,255,0.05)",
              background: "rgba(255,255,255,0.01)",
            }}>
            {/* Sidebar header */}
            <div className="px-3 py-2 shrink-0"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
              <p className="font-mono text-[9px] text-[#4a4766] uppercase tracking-widest">Explorer</p>
              <p className="font-mono text-[10px] text-[#9d9ab5] mt-0.5">PROJECTS ({projects.length})</p>
            </div>
            {/* File list */}
            <div className="flex-1 overflow-y-auto p-2 space-y-0.5"
              style={{ scrollbarWidth: "none" }}>
              {projects.map((p, i) => (
                <FileItem key={i} project={p} index={i} selected={selected} onClick={onSelect} />
              ))}
            </div>
            {/* Sidebar footer */}
            <div className="px-3 py-2 shrink-0"
              style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
              <p className="font-mono text-[9px] text-[#4a4766]">
                {projects.length} files · React workspace
              </p>
            </div>
          </div>

          {/* Preview area */}
          <div className="flex-1 min-w-0 overflow-hidden">
            <AnimatePresence mode="wait">
              {project ? (
                <PreviewPanel key={selected} project={project} index={selected} />
              ) : (
                <EmptyState key="empty" />
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Status bar */}
        <div className="flex items-center justify-between px-4 py-1 shrink-0"
          style={{ borderTop: "1px solid rgba(255,255,255,0.04)", background: "rgba(94,196,255,0.03)" }}>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[9px] text-[#5ec4ff]/60">⬡ GrigOS v1.0</span>
            {selected !== null && (
              <span className="font-mono text-[9px]" style={{ color: ACCENTS[selected % ACCENTS.length] + "80" }}>
                {getExt(projects[selected].tags)}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[9px] text-[#4a4766]">UTF-8</span>
            <span className="font-mono text-[9px] text-[#4a4766]">React 18</span>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="font-mono text-[9px] text-green-400/60">live</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Works = () => {
  const [selected,  setSelected]  = useState(0);
  const [isMobile,  setIsMobile]  = useState(false);
  const [osVisible, setOsVisible] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const h = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);

  const handleSelect = useCallback((i) => setSelected(i), []);
  const handleClose  = useCallback(() => setOsVisible(false), []);

  return (
    <div className="relative">
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>What I&apos;ve Built</p>
        <h2 className={`${styles.sectionHeadText} text-center`}>Personal Projects.</h2>
      </motion.div>
      <div className="flex justify-center mt-3">
        <div className="h-[1px] w-32"
          style={{ background: "linear-gradient(90deg, transparent, #5ec4ff, transparent)" }} />
      </div>
      <motion.p
        variants={fadeIn("", "", 0.1, 0.8)}
        className="font-body mt-4 text-[#9d9ab5] text-[14px] text-center max-w-xl mx-auto leading-relaxed"
      >
        Browse the workspace · select a project to preview
      </motion.p>
      <motion.div
        variants={fadeIn("", "", 0.2, 0.75)}
        className="mt-8 sm:mt-12"
      >
        <AnimatePresence>
          {osVisible ? (
            isMobile ? (
              <MobileView selected={selected} onSelect={handleSelect} />
            ) : (
              <DesktopOS
                selected={selected}
                onSelect={handleSelect}
                onClose={handleClose}
              />
            )
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-4 py-16"
            >
              <p className="font-mono text-[#9d9ab5] text-[13px]">Window closed.</p>
              <button
                onClick={() => setOsVisible(true)}
                className="font-mono text-[12px] px-4 py-2 rounded-lg transition-all hover:scale-105"
                style={{
                  background: "rgba(94,196,255,0.1)",
                  border: "1px solid rgba(94,196,255,0.3)",
                  color: "#5ec4ff",
                }}
              >
                ↺ Reopen GrigOS
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Works, "projects");