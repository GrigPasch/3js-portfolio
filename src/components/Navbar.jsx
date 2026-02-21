import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { styles } from "../styles";
import { navLinks } from "../constants/constants_index";
import { logo, menu, close } from "../assets";

const Navbar = () => {
  const [active,   setActive]   = useState("");
  const [toggle,   setToggle]   = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docH > 0 ? (scrollTop / docH) * 100 : 0);
      setScrolled(scrollTop > 50);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks.map(n => document.getElementById(n.id)).filter(Boolean);
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const link = navLinks.find(n => n.id === entry.target.id);
            if (link) setActive(link.title);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const closeMenu = useCallback(() => setToggle(false), []);

  return (
    <>
      {/* Scroll progress barb */}
      <div className="fixed top-0 left-0 w-full h-[2px] z-50 pointer-events-none">
        <div className="h-full will-change-transform"
          style={{ width: `${progress}%`, background: "linear-gradient(90deg, #5ec4ff, #bf61ff)", transition: "width 0.1s linear" }} />
      </div>
      <motion.nav
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className={`${styles.paddingX} w-full flex items-center py-3 sm:py-4 fixed top-0 z-40 transition-all duration-500 ${
          scrolled ? "bg-[#050816]/80 backdrop-blur-2xl border-b border-white/[0.05] shadow-xl shadow-black/30" : "bg-transparent"
        }`}
      >
        <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 group"
            onClick={() => { setActive(""); window.scrollTo(0, 0); }}>
            <img src={logo} alt="logo" width={44} height={44}
              className="w-9 h-9 sm:w-11 sm:h-11 object-contain transition-transform duration-300 group-hover:scale-110" />
            <div className="flex flex-col leading-tight">
              <span className="font-display text-white text-[13px] sm:text-[15px] font-bold tracking-wide">Grigoris Paschalidis</span>
              <span className="font-body text-[#5ec4ff] text-[9px] sm:text-[10px] tracking-[2px] sm:tracking-[3px] uppercase hidden sm:block">Frontend Developer</span>
            </div>
          </Link>
          {/* Desktop links */}
          <ul className="list-none hidden sm:flex flex-row items-center gap-6 lg:gap-8">
            {navLinks.map((nav) => (
              <li key={nav.id} className="relative group cursor-pointer">
                <a href={`#${nav.id}`} onClick={() => setActive(nav.title)}
                  className={`font-body text-[13px] font-medium tracking-wide transition-colors duration-200 ${
                    active === nav.title ? "text-white" : "text-[#9d9ab5] hover:text-white"
                  }`}>
                  {nav.title}
                </a>
                <span className="absolute -bottom-1 left-0 h-[1.5px] rounded-full transition-all duration-300"
                  style={{ width: active === nav.title ? "100%" : "0%", background: "linear-gradient(90deg, #5ec4ff, #bf61ff)" }} />
              </li>
            ))}
            <li>
              <a href="/public/GRIGORIOS_PASCHALIDIS_RESUME.pdf" download
                className="btn-secondary !py-2 !px-3.5 !text-[12px] flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-[#5ec4ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Resume
              </a>
            </li>
          </ul>
          {/* Mobile */}
          <div className="sm:hidden flex items-center gap-2">
            <a href="/public/GRIGORIOS_PASCHALIDIS_RESUME.pdf" download
              className="font-body text-[#5ec4ff] text-[11px] font-semibold border border-[#5ec4ff]/30 px-3 py-1.5 rounded-full touch-action-manipulation">
              CV
            </a>
            <button onClick={() => setToggle(t => !t)} aria-label="Toggle menu"
              className="w-8 h-8 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 touch-action-manipulation">
              <img src={toggle ? close : menu} alt="menu" width={16} height={16} className="w-4 h-4 object-contain" />
            </button>

            <AnimatePresence>
              {toggle && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.96 }}
                  transition={{ duration: 0.18 }}
                  className="absolute top-14 right-4 p-5 bg-[#0d0b1e]/98 backdrop-blur-xl border border-white/10 rounded-2xl min-w-[160px] z-50 shadow-2xl"
                >
                  <ul className="flex flex-col gap-4">
                    {navLinks.map((nav) => (
                      <li key={nav.id}
                        onClick={() => { closeMenu(); setActive(nav.title); }}
                        className={`font-body text-[14px] font-medium ${active === nav.title ? "text-white" : "text-[#9d9ab5]"}`}>
                        <a href={`#${nav.id}`}>{nav.title}</a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.nav>
    </>
  );
};

export default Navbar;