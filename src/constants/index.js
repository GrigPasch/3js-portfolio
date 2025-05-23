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
  } from "../assets";
  
  export const navLinks = [
    {
      id: "about",
      title: "About",
    },
    {
      id: "work",
      title: "Work",
    },
    {
      id: "contact",
      title: "Contact",
    },
  ];
  
  export const services = [
    {
      title: "Web Developer",
      icon: web,
    },
    {
      title: "React Developer",
      icon: mobile,
    },
    {
      title: "FrontEnd Developer",
      icon: backend,
    },
  ];
  
  export const technologies = [
    {
      name: "HTML 5",
      icon: html,
    },
    {
      name: "CSS3",
      icon: css,
    },
    {
      name: "JavaScript",
      icon: javascript,
    },
    {
      name: "TypeScript",
      icon: typescript,
    },
    {
      name: "React.js",
      icon: reactjs,
    },
    {
      name: "Tailwind CSS",
      icon: tailwind,
    },
    {
      name: "Node.js",
      icon: nodejs,
    },
    {
      name: "git",
      icon: git,
    },
  ];
  
  export const experiences = [
    {
      title: "IT Technician (Full-time)",
      company_name: "S.G. Manufacturing P.C.",
      icon: greka,
      iconBg: "#fff",
      date: "01/12/2022 - 30/09/2023 & 01/10/2024 - today",
      points: [
        "Troubleshot software/hardware issues and maintained internal systems. <br />" +
        "Installed and configured devices and software packages." ,
      ],
    },
    {
      title: "Wordpress Developer - Website Administrator",
      company_name: "Tountzis Candles",
      icon: tountzisLogo,
      iconBg: "#fff",
      date: "01/10/2023 - 30/09/2024",
      points: [
        "A 1 year fixed term contract with a small shop here in my hometown where I : <br /> " +
        "-Designed and launched seasonal landing pages using Flatsome (WordPress theme). <br />" +
        "-Managed daily product updates and category organization. <br />" +
        "-Provided e-commerce technical support and maintenance." ,
      ],
    },
    {
      title: "BEng",
      company_name: "Technological Educational Institute of Central Macedonia, Serres ,Greece",
      icon: teicm,
      iconBg: "#fff",
      date: "June 2023",
      points: [
        "Finished my studies at the university, where among the subjects we were taught, <br />" +
        "we learned languages like C, C++, Java, HTML, PHP and the fundamentals of MySQL <br />" +
        "databases.", 
      ],
    },
    {
      title: "Seminar titled: Frontend development Industry training of 24hours + individual work",
      company_name: "Brainnest",
      icon: brainnest,
      iconBg: "#fff",
      date: "May 2022 - June 2022",
      points: [
        "This was an online seminar, held by the Brainnest company in which we learned the <br />" +
        "fundamentals of HTML, CSS ad Javascript. We did a project for each programming language and were graded for each one.<br />" +
        "The seminar was taught by Mr. Branko Popovic and was overall a great learning experience and really taught you to <br />" +
        "never forget the fundamentals and their importance even to complex projects.",
      ],
    },
    {
      title: "Gothe - Zertifikat B2",
      company_name: "Goethe - Institut",
      icon: goethe,
      iconBg: "#fff",
      date: "2021 - 2022",
      points: [
        "Schreiben - Writing <br />" +
        "Lessen - Reading <br />" +
        "Sprechen – Speaking",
      ],
    },
    {
      title: "Assistant Technician, Internship",
      company_name: "Dixons S.E. - Kotsovolos",
      icon: kotsovolos,
      iconBg: "#fff",
      date: "June 2021 - November 2021",
      points: [
        "This was my 6 months internship, where I assisted the technician of the store with <br />" +
        "various technical problems the clients were facing. <br />" +
        "-Assisted in daily tech support and hardware configuration. <br /> " +
        "-Gained hands-on experience with customer service and system management." 
      ],
    },
    {
      title: "Seminar titled: Ultimate web Development for Experts with React 16, Angular 7, Vue.js 2, HTML, Javascript, JQuery and Bootstrap 4",
      company_name: "National and Kapodistrian University of Athens",
      icon: ekpa,
      iconBg: "#fff",
      date: "2019 - 2020",
      points: [
        "Completed the aforementioned 250 hours seminar organized by the National and Kapodistrian University of Athens. <br />" +
        "In this seminar, we were taught all the technologies mentioned and were told how to use them, when to use them <br />" +
        "and was overall a great learning experience as well, and probably the  first reason I decided to work with React.js <br />" +
        "framework instead of Angular. Since then of course, I've dwelled deeper in the React system and how it works, <br />" +
        "learned many libraries, packages and dependencies and how and when to use them.",
      ],
    },
    {
      title: "Seminar titled: Ruby and Ruby on Rails: Web and Desktop Application Development",
      company_name: "National and Kapodistrian University of Athens",
      icon: ekpa,
      iconBg: "#fff",
      date: "2019 - 2020",
      points: [
        "Completed the aforementioned 138 hours seminar organized by the National and Kapodistrian University of Athens. <br />" +
        "In this seminar, we were taught Ruby and RoR. We learned the fundamentals of this backend language, how to use  <br />" +
        "it and how it is structured." ,
      ],
    },
    {
      title: "Seminar titled: Web design and Front-End Expertise",
      company_name: "National and Kapodistrian University of Athens",
      icon: ekpa,
      iconBg: "#fff",
      date: "2018 - 2019",
      points: [
        "Completed the aforementioned 126 hours seminar organized by the National and Kapodistrian University of Athens. <br />" +
        "In this seminar, we were taught the basics of web design. We used simple fundamental languages like HTML, CSS and <br />" +
        "Javascript and learned how to utilize them properly." 
      ],
    },
  ];
  
  
  export const projects = [
    {
      name: "E-Commerce Product details page",
      description:
        "It was part of an assignment, where we had to copy a figma design. The page is the Product <br />" +
        "Details subcategory and is a simple mockup design.",
      tags: [
        {
          name: "Next.js",
          color: "white",
        },
        {
          name: "Typescript",
          color: 'typescript-text-color',
        },
        {
          name: "Javascript",
          color: "javascript-text-color",
        },
        {
          name: "TailWind",
          color: "tailwind-text-color",
        },
      ],
      image: lexir,
      source_code_link: "https://github.com/GrigPasch/lexir-io-challenge",
    },
    {
      name: "Typescript Form",
      description:
        "A multiple page form build with typescript for the functions.",
      tags: [
        {
          name: "React",
          color: "blue-text-gradient",
        },
        {
          name: "Typescript",
          color: "typescript-text-color",
        },
        {
          name: "CSS",
          color: "pink-text-gradient",
        },
      ],
      image: form,
      source_code_link: "https://github.com/GrigPasch/Form",
    },
    {
      name: "Portfolio page",
      description:
        "This is the first portfolio page I've built. It is built by utilizing next.js alongside js <br />" +
        "and tailwind. It is 95% functional (contact form isn't working) and 100% responsive.",
      tags: [
        {
          name: "Nextjs",
          color: "white",
        },
        {
          name: "Javascript",
          color: "javascript-text-color",
        },
        {
          name: "CSS",
          color: "pink-text-gradient",
        },
        {
          name: "TailWind",
          color: "tailwind-text-color",
        },
      ],
      image: nextPortfolio,
      source_code_link: "https://github.com/GrigPasch/next.js-portfolio",
    },
    {
      name: "Simple Crypto coins list",
      description:
        "A simple crypto coins list, made with the help of CoinGecko API. It showcases all the coins <br />" +
        "info and provides pagination pagination",
      tags: [
        {
          name: "Next.js",
          color: "white",
        },
        {
          name: "Javascript",
          color: "javascript-text-color",
        },
        {
          name: "CSS",
          color: "pink-text-gradient",
        },
        {
          name: "TailWind",
          color: "tailwind-text-color",
        },
      ],
      image: coinsTable,
      source_code_link: "https://github.com/GrigPasch/CoinsTable",
    },
    {
      name: "Restaurant Menu",
      description:
        "This was done as a draft for a friend of mine that has a family restaurant in Germany. <br />" +
        "It is basically a cost catalog of their restaurant. This project is half finished, <br />" +
        "but it was just a draft for them to see how their catalogue would look like.",
      tags: [
        {
          name: "Nextjs",
          color: "white",
        },
        {
          name: "Javascript",
          color: "javascript-text-color",
        },
        {
          name: "CSS",
          color: "pink-text-gradient",
        },
        {
          name: "TailWind",
          color: "tailwind-text-color",
        },
      ],
      image: restaurantMenu,
      source_code_link: "https://github.com/GrigPasch/Kreta",
    },
    {
      name: "E-shop mockup",
      description:
        "This is a website that I am building to learn react + vite combo and how they work together. <br />" +
        "It is basically an e-shop with various products where user can navigate and decide what he wants to buy." , 
      tags: [
        {
          name: "React",
          color: "white",
        },
        {
          name: "Javascript",
          color: "javascript-text-color",
        },
        {
          name: "CSS",
          color: "pink-text-gradient",
        },
        {
          name: "TailWind",
          color: "tailwind-text-color",
        },
        {
          name: "Vite",
          color: "green",
        },
      ],
      image: merchandise,
      source_code_link: "https://github.com/GrigPasch/Merchandise",
    },
  ];