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
    carrent,
    jobit,
    tripguide,
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
      date: "September 2012 - June 2023",
      points: [
        "Finished my studies at the university, where among the subjects we were taught,"+
        "we learned languages like C, C++, Java, HTML, PHP and the fundamentals of MySQL"+
        "databases. As you can tell I preferred the web design languages and decided to pursue"+
        "this field as my work :)",
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
  
  export const testimonials = [
    {
      testimonial:
        "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
      name: "Sara Lee",
      designation: "CFO",
      company: "Acme Co",
      image: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
      testimonial:
        "I've never met a web developer who truly cares about their clients' success like Rick does.",
      name: "Chris Brown",
      designation: "COO",
      company: "DEF Corp",
      image: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
      testimonial:
        "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
      name: "Lisa Wang",
      designation: "CTO",
      company: "456 Enterprises",
      image: "https://randomuser.me/api/portraits/women/6.jpg",
    },
  ];
  
  export const projects = [
    {
      name: "Car Rent",
      description:
        "Web-based platform that allows users to search, book, and manage car rentals from various providers, providing a convenient and efficient solution for transportation needs.",
      tags: [
        {
          name: "react",
          color: "blue-text-gradient",
        },
        {
          name: "mongodb",
          color: "green-text-gradient",
        },
        {
          name: "tailwind",
          color: "pink-text-gradient",
        },
      ],
      image: carrent,
      source_code_link: "https://github.com/",
    },
    {
      name: "Job IT",
      description:
        "Web application that enables users to search for job openings, view estimated salary ranges for positions, and locate available jobs based on their current location.",
      tags: [
        {
          name: "react",
          color: "blue-text-gradient",
        },
        {
          name: "restapi",
          color: "green-text-gradient",
        },
        {
          name: "scss",
          color: "pink-text-gradient",
        },
      ],
      image: jobit,
      source_code_link: "https://github.com/",
    },
    {
      name: "Trip Guide",
      description:
        "A comprehensive travel booking platform that allows users to book flights, hotels, and rental cars, and offers curated recommendations for popular destinations.",
      tags: [
        {
          name: "nextjs",
          color: "blue-text-gradient",
        },
        {
          name: "supabase",
          color: "green-text-gradient",
        },
        {
          name: "css",
          color: "pink-text-gradient",
        },
      ],
      image: tripguide,
      source_code_link: "https://github.com/",
    },
  ];