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
    nextPortfolio,
    coinsTable,
    form,
    restaurantMenu,
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
      title: "BS or BSc",
      company_name: "Technological Educational Institute of Central Macedonia",
      icon: teicm,
      iconBg: "#383E56",
      date: "June 2023",
      points: [
        "Finished my studies at the university, where among the subjects we were taught," +
        "we learned languages like C, C++, Java, HTML, PHP and the fundamentals of MySQL" +
        "databases.",
      ],
    },
    {
      title: "Seminar titled: Frontend development Industry training of 24hours + individual work",
      company_name: "Brainnest",
      icon: brainnest,
      iconBg: "#E6DEDD",
      date: "May 2022 - June 2022",
      points: [
        "This was an online seminar, held by the Brainnest company in which we learned the " +
        "fundamentals of HTML, CSS ad Javascript. We did a project for each programming language " +
        "and were graded for each one. The seminar was taught by Mr. Branko Popovic and was " +
        "overall a great learning experience and really taught you to never forget the fundamentals " +
        "and their importance even to complex projects",
      ],
    },
    {
      title: "Gothe - Zertifikat B2",
      company_name: "Goethe - Institut",
      icon: goethe,
      iconBg: "#E6DEDD",
      date: "2021 - 2022",
      points: [
        "I succeded in obtaining 3 out of the 4, sadly, Moduls of Goethe - Zertifikat B2 of German" +
        "Language Competency",
        "Schreiben - Writing",
        "Lessen - Reading",
        "Sprechen – Speaking",
      ],
    },
    {
      title: "Assistant Technician, Internship",
      company_name: "Dixons S.E. - Kotsovolos",
      icon: kotsovolos,
      iconBg: "#E6DEDD",
      date: "June 2021 - November 2021",
      points: [
        "This was my 6 months internship, where I assisted the technician of the store with" +
        "various technical problems the clients were facing. I also assisted him in setting" +
        "up desktop PCs, initializing smartphones, tablets, laptops and all sorts of equipment" +
        "in order for them to be ready to be used the instant the customer buys them. It was a" +
        "fun 6 month period, where I learned to collaborate with others, hear and assist clients" +
        " needs and overall, learn how a big company works."
      ],
    },
    {
      title: "Seminar titled: Ultimate web Development for Experts with React 16, Angular 7, Vue.js 2, HTML, Javascript, JQuery and Bootstrap 4",
      company_name: "National and Kapodistrian University of Athens",
      icon: ekpa,
      iconBg: "#E6DEDD",
      date: "2019 - 2020",
      points: [
        "Completed the aforementioned 250 hours seminar orginised by the National and Kapodistrian University of Athens. " +
        "In this seminar, we were taught all the technologies mentioned and were told how to use them, when to use them " +
        "and was overall a great learning experience as well, and probably the  first reason I decided to work with React.js " +
        "framework instead of Angular. Since then of course, I've dwelled deeper in the React system and how it works, " +
        "learned many libraries, packages and dependencies and how and when to use them.",
      ],
    },
    {
      title: "Seminar titled: Ruby and Ruby on Rails: Web and Desktop Application Development",
      company_name: "National and Kapodistrian University of Athens",
      icon: ekpa,
      iconBg: "#E6DEDD",
      date: "2019 - 2020",
      points: [
        "Completed the aforementioned 138 hours seminar orginised by the National and Kapodistrian University of Athens. " +
        "In this seminar, we were taught Ruby and RoR. We learned the fundamentals of this backend language, how to install " +
        "it of course, to a project and how it is structured." 
      ],
    },
    {
      title: "Seminar titled: Web design and Front-End Expertise",
      company_name: "National and Kapodistrian University of Athens",
      icon: ekpa,
      iconBg: "#E6DEDD",
      date: "2018 - 2019",
      points: [
        "Completed the aforementioned 126 hours seminar orginised by the National and Kapodistrian University of Athens. " +
        "In this seminar, we were taught the basics of web design. We used simple fundamental languages like HTML, CSS and " +
        "Javascript and learned how to utilize them properly." 
      ],
    },
  ];
  
  
  export const projects = [
    {
      name: "E-Commerce Product details page",
      description:
        "It was part of an assignment, where we had to copy a figma design. The page is the Product"+ 
        "Details subcategory and is a simple mockup design",
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
        "A multipage form build with typescript for the functions.",
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
        "This is the first portfolio page I've built. It is built by utilizing next.js alongside js"+
        " and tailwind. It is 95% functional (contact form isn't working) and 100% responsive.",
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
        "A simple crypto coins list, made with the help of CoinGecko API. It showcases all the coins"+
        " info and provides pagination pagination",
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
        "This was done as a draft for a friend of mine that has a family restaurant in Germany."+
        " It is basically a cost catalog of their restaurant. This project may seem half finished, "+ 
        "because  but I want to repeat it was just a draft to showcase the overall structure of the online catalog.",
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
  ];