import {
    mobile,
    backend,
    web,
    javascript,
    typescript,
    html,
    css,
    reactjs,
    tailwind,
    nodejs,
    git,
    brainnest,
    ekpa,
    goethe,
    kotsovolos,
    teicm,
    lexir,
    tountzisLogo,
    greka,
    nextPortfolio,
    coinsTable,
    form,
    restaurantMenu,
    merchandise,
    vacationCalendar,
    dromeas,
  } from "../assets";

  export const navLinks = [
    { id: "about",     title: "About"      },
    { id: "work",      title: "Experience" },
    { id: "education", title: "Education"  },
    { id: "projects",  title: "Projects"   },
    { id: "contact",   title: "Contact"    },
  ];

  export const services = [
    { title: "Frontend Developer",    icon: web     },
    { title: "React Developer",       icon: mobile  },
    { title: "IT Support Specialist", icon: backend },
  ];

  export const technologies = [
    { name: "HTML 5",       icon: html       },
    { name: "CSS3",         icon: css        },
    { name: "JavaScript",   icon: javascript },
    { name: "TypeScript",   icon: typescript },
    { name: "React.js",     icon: reactjs    },
    { name: "Tailwind CSS", icon: tailwind   },
    { name: "Node.js",      icon: nodejs     },
    { name: "Git",          icon: git        },
  ];

  /* ─────────────────────────────────────
          WORK EXPERIENCE
  ───────────────────────────────────── */
  export const workExperiences = [
    {
      title: "IT Support Engineer (Full-time)",
      company_name: "DROMEAS S.A.",
      icon: dromeas,
      iconBg: "#fff",
      date: "01/07/2025 – Present",
      points: [
        "Configuration and management for the company e-shop and website.",
        "Resolving hardware, software, server and ERP issues, minimizing downtime.",
        "Designed and developed an in-house web app for employee time-off management, improving internal request tracking and reducing manual processing.",
      ],
    },
    {
      title: "IT Support Engineer (Full-time)",
      company_name: "S.G. Manufacturing P.C. (Branch of KORE)",
      icon: greka,
      iconBg: "#fff",
      date: "01/10/2024 – 30/06/2025",
      points: [
        "Internal systems maintenance.",
        "Configuration, installation and management of office software and hardware.",
      ],
    },
    {
      title: "Web Developer & Website Administrator (Full-time)",
      company_name: "Tountzis Candles",
      icon: tountzisLogo,
      iconBg: "#fff",
      date: "01/10/2023 – 30/09/2024",
      points: [
        "Setting up and maintenance of e-shop and e-commerce.",
        "Creating seasonal landing pages, implementing G-Tags and SEO optimization.",
      ],
    },
    {
      title: "Assistant Technician — Internship (Full-time)",
      company_name: "Kotsovolos (Member of Dixons S.E.)",
      icon: kotsovolos,
      iconBg: "#fff",
      date: "June 2021 – November 2021",
      points: [
        "Daily tech support and hardware configuration.",
        "Customer service and system management.",
      ],
    },
    {
      title: "IT Support Specialist (Part-time during studies)",
      company_name: "S.G. Manufacturing P.C.",
      icon: greka,
      iconBg: "#fff",
      date: "2012 – 2018",
      points: [
        "Started as an office assistant and progressively shifted into IT support roles alongside my studies.",
      ],
    },
  ];

  /* ─────────────────────────────────────
          EDUCATION & CERTIFICATIONS
  ───────────────────────────────────── */
  export const education = [
    {
      title: "BEng — Computer, Informatics & Telecommunications Engineering",
      company_name: "Technological Educational Institute of Central Macedonia, Serres",
      icon: teicm,
      iconBg: "#fff",
      date: "Graduated June 2023",
      points: [
        "Core subjects: Software Development, Web Development, Object-Oriented Programming, MySQL Databases.",
        "Languages studied: C, C++, Java, HTML, PHP.",
      ],
    },
    {
      title: "Frontend Development Industry Training (24h + individual work)",
      company_name: "Brainnest",
      icon: brainnest,
      iconBg: "#fff",
      date: "May 2023 – June 2023",
      points: [
        "Online seminar covering HTML, CSS and JavaScript fundamentals.",
        "Completed graded projects for each language, taught by Mr. Branko Popovic.",
      ],
    },
    {
      title: "Goethe-Zertifikat B2 — German Language Certificate",
      company_name: "Goethe-Institut",
      icon: goethe,
      iconBg: "#fff",
      date: "2021 – 2022",
      points: [
        "Certified German proficiency at B2 level covering Writing, Reading and Speaking.",
      ],
    },
    {
      title: "Ultimate Web Development for Experts (250h Seminar)",
      company_name: "National and Kapodistrian University of Athens",
      icon: ekpa,
      iconBg: "#fff",
      date: "Sep 2019 – Mar 2020",
      points: [
        "React 16, Angular 7, Vue.js 2, HTML, JavaScript, jQuery and Bootstrap 4.",
        "The seminar that led me to commit to React.js as my primary framework.",
      ],
    },
    {
      title: "Ruby and Ruby on Rails: Web & Desktop App Development (138h)",
      company_name: "National and Kapodistrian University of Athens",
      icon: ekpa,
      iconBg: "#fff",
      date: "Sep 2019 – Feb 2020",
      points: [
        "Fundamentals of Ruby and Ruby on Rails, structure and practical use of the backend language.",
      ],
    },
    {
      title: "Web Design and Front-End Expertise (126h Seminar)",
      company_name: "National and Kapodistrian University of Athens",
      icon: ekpa,
      iconBg: "#fff",
      date: "Feb 2019 – Jul 2019",
      points: [
        "HTML, CSS and JavaScript fundamentals for web design and front-end development.",
      ],
    },
  ];

  /* ─────────────────────────────────────
                PROJECTS
  ───────────────────────────────────── */
  export const projects = [
    {
      name: "Vacation Calendar (Fullstack)",
      description:
        "A fullstack React app allowing employees to log in and manage their vacation days, and managers to approve or reject requests. Built for real-world internal use.",
      tags: [
        { name: "React",      color: "blue-text-gradient"    },
        { name: "Tailwind",   color: "tailwind-text-color"   },
        { name: "JavaScript", color: "javascript-text-color" },
        { name: "MySQL",      color: "orange-text-gradient"  },
        { name: "Vite",       color: "green-text-gradient"   },
      ],
      image: vacationCalendar,
      source_code_link: "https://github.com/GrigPasch",
    },
    {
      name: "E-Commerce Product Details Page",
      description:
        "A pixel-perfect recreation of a Figma design for a product details page. Built as an assignment showcasing attention to design accuracy.",
      tags: [
        { name: "Next.js",    color: "white"                 },
        { name: "TypeScript", color: "typescript-text-color" },
        { name: "JavaScript", color: "javascript-text-color" },
        { name: "Tailwind",   color: "tailwind-text-color"   },
      ],
      image: lexir,
      source_code_link: "https://github.com/GrigPasch/lexir-io-challenge",
    },
    {
      name: "TypeScript Multi-Step Form",
      description:
        "A multi-page form built with TypeScript for all logic and state handling, demonstrating type-safe React development.",
      tags: [
        { name: "React",      color: "blue-text-gradient"    },
        { name: "TypeScript", color: "typescript-text-color" },
        { name: "CSS",        color: "pink-text-gradient"    },
      ],
      image: form,
      source_code_link: "https://github.com/GrigPasch/Form",
    },
    {
      name: "E-Shop Mockup",
      description:
        "An e-commerce mockup built to explore the React + Vite combo. Users can browse products and simulate a shopping experience.",
      tags: [
        { name: "React",      color: "blue-text-gradient"    },
        { name: "JavaScript", color: "javascript-text-color" },
        { name: "Tailwind",   color: "tailwind-text-color"   },
        { name: "Vite",       color: "green-text-gradient"   },
      ],
      image: merchandise,
      source_code_link: "https://github.com/GrigPasch/Merchandise",
    },
    {
      name: "Next.js Portfolio",
      description:
        "My first portfolio site — 95% functional, 100% responsive. Built with Next.js, JavaScript and Tailwind.",
      tags: [
        { name: "Next.js",    color: "white"                 },
        { name: "JavaScript", color: "javascript-text-color" },
        { name: "Tailwind",   color: "tailwind-text-color"   },
      ],
      image: nextPortfolio,
      source_code_link: "https://github.com/GrigPasch/next.js-portfolio",
    },
    {
      name: "Crypto Coins List",
      description:
        "A live crypto coin tracker using the CoinGecko API, with full coin info display and pagination.",
      tags: [
        { name: "Next.js",    color: "white"                 },
        { name: "JavaScript", color: "javascript-text-color" },
        { name: "Tailwind",   color: "tailwind-text-color"   },
      ],
      image: coinsTable,
      source_code_link: "https://github.com/GrigPasch/CoinsTable",
    },
    {
      name: "Restaurant Menu Draft",
      description:
        "A cost catalog draft for a family restaurant in Germany. Showcases menu layout and pricing — a design proof-of-concept.",
      tags: [
        { name: "Next.js",    color: "white"                 },
        { name: "JavaScript", color: "javascript-text-color" },
        { name: "Tailwind",   color: "tailwind-text-color"   },
      ],
      image: restaurantMenu,
      source_code_link: "https://github.com/GrigPasch/Kreta",
    },
  ];