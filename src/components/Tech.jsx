/* eslint-disable react-refresh/only-export-components */
import { useState, useEffect, useRef } from "react";
import { BallCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants/constants_index";

/* ── CSS icon grid for mobile ── */
const MobileGrid = () => (
  <div className="flex flex-row flex-wrap justify-center gap-6 sm:gap-8">
    {technologies.map((tech) => (
      <div key={tech.name}
        className="flex flex-col items-center gap-2 group cursor-default">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
          }}>
          <img
            src={tech.icon}
            alt={tech.name}
            loading="lazy"
            decoding="async"
            className="w-8 h-8 object-contain"
          />
        </div>
        <span className="font-body text-[10px] text-[#9d9ab5] group-hover:text-white transition-colors">
          {tech.name}
        </span>
      </div>
    ))}
  </div>
);

/* ── lazy-mounted Ball canvas — only when in viewport ── */
const LazyBall = ({ icon, name }) => {
  const ref     = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShow(true); obs.disconnect(); } },
      { rootMargin: "80px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="w-[120px] h-[110px]" title={name}>
      {show && <BallCanvas icon={icon} />}
    </div>
  );
};

const Tech = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const h = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);

  if (isMobile) return <MobileGrid />;

  return (
    <div className="flex flex-row flex-wrap justify-center gap-[60px]">
      {technologies.map((tech) => (
        <LazyBall key={tech.name} icon={tech.icon} name={tech.name} />
      ))}
    </div>
  );
};

export default SectionWrapper(Tech, "");