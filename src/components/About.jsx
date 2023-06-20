/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import { Tilt } from 'react-tilt'
import { motion } from 'framer-motion'
import { styles } from '../styles'
import { services } from '../constants'
import { fadeIn, textVariant } from '../utils/motion'
import { SectionWrapper } from '../hoc'

const ServiceCard = ({ index, title, icon}) => {
  return (
    <Tilt className = 'xs:w-[250px] w-full '> 
      <motion.div variants = { fadeIn("down", "tween", 0.20 * index, 0.5)} className = 'w-full green-pink-radient p-[1px] rounded-[20px] shadow-card'>
        <div className = 'bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'>
          <img src = { icon } alt = { title } className = ' w-16 h-16 object-contain '/>
          <h3 className = ' text-white text-[20px] font-bold text-center '> { title }</h3>
        </div>
      </motion.div>
    </Tilt>
  )
}

const About = () => {
  return (
    <>
      <motion.div variants = { textVariant() }>
        <p className = { styles.sectionSubText }>Introduction</p>
        <h2 className = { styles.sectionHeadText }>Overview.</h2>
      </motion.div>
      <motion.p variants = { fadeIn("", "", 0.1, 1)}
       className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'>
          Hello, I am an aspiring FrontEnd developer from Greece, trying to
          find the perfect job. I am skilled in HTML, CSS, pretty good at Js
          and React and I am currently learning more of Three.js alongside,
          Typescript, tailwind and others. I am a quick learner and I love
          collaborating with other people! 
      </motion.p>
      <div className='mt-20 flex flex-wrap gap-x-[150px]'>
        {services.map((service, index) => (
          <ServiceCard key = { service.title } index = { index } { ...service }/> 
        ))}
      </div>
    </>
  )
}

export default SectionWrapper(About, "about")