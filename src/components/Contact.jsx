/* eslint-disable react-refresh/only-export-components */
import { useState, useRef, useEffect, useCallback, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

const EarthCanvas = lazy(() => import("./canvas/Earth"));

const socials = [
  {
    name: "GitHub", url: "https://github.com/GrigPasch",
    icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>,
  },
  {
    name: "LinkedIn", url: "https://linkedin.com/in/grigorios-paschalidis",
    icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
  },
  {
    name: "Email", url: "mailto:gregpasch8@gmail.com",
    icon: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>,
  },
];

const INITIAL_FORM = { name: "", email: "", message: "" };

const Contact = () => {
  const formRef   = useRef();
  const earthRef  = useRef(null);
  const [loading,  setLoading]  = useState(false);
  const [sent,     setSent]     = useState(false);
  const [form,     setForm]     = useState(INITIAL_FORM);
  const [earthVis, setEarthVis] = useState(false);

  useEffect(() => {
    const el = earthRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setEarthVis(true); obs.disconnect(); } },
      { rootMargin: "200px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    setLoading(true);
    emailjs.send(
      "service_a0z4bre", "template_ym1i2bc",
      { from_name: form.name, to_name: "Greg", from_email: form.email, to_email: "gregpasch8@gmail.com", message: form.message },
      "swhp5-AwiTTyojnA1"
    ).then(() => {
      setLoading(false); setSent(true);
      setForm(INITIAL_FORM);
      setTimeout(() => setSent(false), 5000);
    }).catch((err) => {
      setLoading(false);
      console.error(err);
      alert("Something went wrong. Please try again.");
    });
  }, [form]);

  return (
    <div className="relative">
      <div className="xl:mt-12 flex flex-col-reverse xl:flex-row gap-8 sm:gap-10 overflow-hidden">
        {/* Form */}
        <motion.div
          variants={slideIn("left", "tween", 0.2, 1)}
          className="flex-[0.75] bg-[var(--bg-surface)] p-6 sm:p-8 rounded-2xl border border-white/[0.06]"
        >
          <p className={styles.sectionSubText}>Got something in mind?</p>
          <h3 className={`${styles.sectionHeadText} mt-1`}>Let&apos;s Talk.</h3>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-4 mb-6 sm:mb-8">
            {socials.map((s) => (
              <a key={s.name} href={s.url}
                target={s.url.startsWith("mailto") ? undefined : "_blank"}
                rel={s.url.startsWith("mailto") ? undefined : "noreferrer noopener"}
                aria-label={s.name}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center bg-white/[0.04] border border-white/[0.08] text-[#9d9ab5] hover:text-[#5ec4ff] hover:border-[#5ec4ff]/35 transition-all duration-200 touch-action-manipulation">
                {s.icon}
              </a>
            ))}
            <div className="flex items-center gap-2 ml-1">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" aria-hidden="true" />
              <span className="font-body text-[#9d9ab5] text-[11px] sm:text-[12px]">Open to opportunities</span>
            </div>
          </div>
          <form ref={formRef} onSubmit={handleSubmit} noValidate className="flex flex-col gap-4 sm:gap-5" aria-label="Contact form">
            {[
              { name: "name",  type: "text",  placeholder: "Your name",  label: "Name",  autocomplete: "name"  },
              { name: "email", type: "email", placeholder: "Your email", label: "Email", autocomplete: "email" },
            ].map((field) => (
              <label key={field.name} className="flex flex-col gap-1.5">
                <span className="font-body text-white text-[12px] sm:text-[13px] font-medium">{field.label}</span>
                <input
                  type={field.type} name={field.name}
                  autoComplete={field.autocomplete}
                  value={form[field.name]} onChange={handleChange} required
                  placeholder={field.placeholder}
                  className="font-body bg-[var(--bg-elevated)] py-3 sm:py-3.5 px-4 sm:px-5 placeholder:text-[#4a4766] text-white rounded-xl border border-white/[0.06] focus:border-[#5ec4ff]/35 transition-colors text-[13px] sm:text-[14px] touch-action-manipulation"
                />
              </label>
            ))}
            <label className="flex flex-col gap-1.5">
              <span className="font-body text-white text-[12px] sm:text-[13px] font-medium">Message</span>
              <textarea
                rows="5" name="message"
                value={form.message} onChange={handleChange} required
                placeholder="What would you like to talk about?"
                className="font-body bg-[var(--bg-elevated)] py-3 sm:py-3.5 px-4 sm:px-5 placeholder:text-[#4a4766] text-white rounded-xl border border-white/[0.06] focus:border-[#5ec4ff]/35 transition-colors text-[13px] sm:text-[14px] resize-none"
              />
            </label>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-1">
              <button type="submit" disabled={loading}
                className="btn-primary !text-[13px] sm:!text-[14px] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100">
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Sending...
                  </span>
                ) : "Send Message →"}
              </button>
              {sent && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} role="status"
                  className="font-body text-green-400 text-[12px] sm:text-[13px] flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Message sent!
                </motion.span>
              )}
            </div>
          </form>
        </motion.div>
        {/* Earth */}
        <motion.div
          ref={earthRef}
          variants={slideIn("right", "tween", 0.2, 1)}
          className="xl:flex-1 xl:h-auto md:h-[500px] h-[280px] sm:h-[350px]"
        >
          {earthVis && (
            <Suspense fallback={
              <div className="w-full h-full flex items-center justify-center">
                <div className="canvas-loader" />
              </div>
            }>
              <EarthCanvas />
            </Suspense>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");