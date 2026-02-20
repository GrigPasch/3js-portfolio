import { Suspense, lazy } from "react";
import { BrowserRouter } from "react-router-dom";
import Navbar   from "./components/Navbar";
import Hero     from "./components/Hero";
import CustomCursor from "./components/CustomCursor";

const About      = lazy(() => import("./components/About"));
const Experience = lazy(() => import("./components/Experience"));
const Education  = lazy(() => import("./components/Education"));
const Tech       = lazy(() => import("./components/Tech"));
const Works      = lazy(() => import("./components/Works"));
const Contact    = lazy(() => import("./components/Contact"));
const StarsCanvas = lazy(() => import("./components/canvas/Stars"));

const SectionFallback = () => (
  <div className="w-full py-20 flex justify-center items-center">
    <div className="canvas-loader" />
  </div>
);

const Footer = () => (
  <footer className="relative z-10 border-t border-white/[0.05] py-10 sm:py-12 px-6 overflow-hidden">
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden" aria-hidden="true">
    </div>
    <div className="max-w-7xl mx-auto relative z-10 flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-6">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" aria-hidden="true" />
        <span className="font-body text-[#9d9ab5] text-[12px] sm:text-[13px]">
          Available for Junior Frontend roles · Serres, Greece
        </span>
      </div>
      <span className="font-body text-[#4a4766] text-[12px] text-center order-last sm:order-none">
        © {new Date().getFullYear()} Grigorios Paschalidis
      </span>
      <nav className="flex items-center gap-4 sm:gap-5" aria-label="Footer links">
        {[
          { label: "GitHub",      href: "https://github.com/GrigPasch",          external: true             },
          { label: "Email",       href: "mailto:gregpasch8@gmail.com",            external: false            },
          { label: "Download CV", href: "/CV__Grigorios_Paschalidis.pdf",         download: true, accent: true },
        ].map((l) => (
          <a key={l.label} href={l.href}
            download={l.download || undefined}
            target={l.external ? "_blank" : undefined}
            rel={l.external ? "noreferrer noopener" : undefined}
            className={`font-body text-[12px] sm:text-[13px] transition-colors duration-200 touch-action-manipulation ${
              l.accent ? "text-[#5ec4ff] font-semibold hover:text-white" : "text-[#9d9ab5] hover:text-white"
            }`}>
            {l.label}
          </a>
        ))}
      </nav>
    </div>
  </footer>
);

const App = () => (
  <BrowserRouter>
    <CustomCursor />
    <div className="noise-overlay" aria-hidden="true" />
    <div className="relative z-0 bg-[#050816]">
      <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
        <Navbar />
        <Hero />
      </div>
      <Suspense fallback={<SectionFallback />}>
        <About />
      </Suspense>
      <div className="section-divider" />
      <Suspense fallback={<SectionFallback />}>
        <Experience />
      </Suspense>
      <div className="section-divider" />
      <Suspense fallback={<SectionFallback />}>
        <Education />
      </Suspense>
      <div className="section-divider" />
      <Suspense fallback={<SectionFallback />}>
        <Tech />
      </Suspense>
      <div className="section-divider" />
      <Suspense fallback={<SectionFallback />}>
        <Works />
      </Suspense>
      <div className="section-divider" />
      <div className="relative z-0">
        <Suspense fallback={<SectionFallback />}>
          <Contact />
        </Suspense>
        <Suspense fallback={null}>
          <StarsCanvas />
        </Suspense>
      </div>
      <Footer />
    </div>
  </BrowserRouter>
);

export default App;