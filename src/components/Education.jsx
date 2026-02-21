/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { styles } from "../styles";
import { education } from "../constants/constants_index";
import { SectionWrapper } from "../hoc";
import { textVariant, fadeIn } from "../utils/motion";

const EducationCard = ({ item, index }) => (
  <motion.div
    variants={fadeIn("up", "spring", index * 0.1, 0.6)}
    className="relative flex gap-4 sm:gap-6 group"
  >
    {/* Logo + connector */}
    <div className="flex flex-col items-center shrink-0">
      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[var(--bg-elevated)] border border-white/[0.08] flex items-center justify-center overflow-hidden group-hover:border-[#bf61ff]/35 transition-colors duration-300 shrink-0">
        <img src={item.icon} alt={item.company_name} className="w-8 h-8 sm:w-9 sm:h-9 object-contain" />
      </div>
      <div className="w-[1px] flex-1 mt-3 min-h-[32px]"
        style={{ background: "linear-gradient(180deg, rgba(191,97,255,0.2), transparent)" }} />
    </div>
    {/* Content */}
    <div className="flex-1 pb-8 sm:pb-12">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-4 mb-3">
        <div>
          <h3 className="font-display text-white text-[15px] sm:text-[17px] font-bold leading-snug group-hover:text-[#bf61ff] transition-colors duration-300">
            {item.title}
          </h3>
          <p className="font-body text-[#bf61ff] text-[12px] sm:text-[13px] font-medium mt-0.5">
            {item.company_name}
          </p>
        </div>
        <span className="font-body text-[10px] sm:text-[11px] text-[#9d9ab5] bg-white/[0.04] border border-white/[0.07] rounded-full px-3 py-1 self-start whitespace-nowrap shrink-0">
          {item.date}
        </span>
      </div>
      <ul className="space-y-2">
        {item.points.map((point, i) => (
          <li key={i} className="flex gap-2.5 items-start">
            <span className="mt-[8px] w-1 h-1 rounded-full bg-[#bf61ff]/60 shrink-0" />
            <p className="font-body text-[#9d9ab5] text-[13px] sm:text-[14px] leading-[22px] sm:leading-[24px]">
              {point}
            </p>
          </li>
        ))}
      </ul>
    </div>
  </motion.div>
);

const Education = () => (
  <div className="relative">
    <motion.div variants={textVariant()}>
      <p className={styles.sectionSubText} style={{ color: "#bf61ff" }}>What I&apos;ve Studied</p>
      <h2 className={styles.sectionHeadText}>Education & Certifications.</h2>
    </motion.div>
    <motion.div variants={fadeIn("right", "tween", 0.1, 0.6)}
      className="mt-4 mb-10 sm:mb-14 h-[1px] w-full max-w-xs"
      style={{ background: "linear-gradient(90deg, #bf61ff, transparent)" }} />
    <div className="max-w-3xl">
      {education.map((item, i) => (
        <EducationCard key={i} item={item} index={i} />
      ))}
    </div>
  </div>
);

export default SectionWrapper(Education, "education");