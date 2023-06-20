/* eslint-disable react-refresh/only-export-components */
import { BallCanvas } from "./canvas"
import { SectionWrapper } from "../hoc"
import { technologies } from "../constants"

const Tech = () => {
  return (
    <div className = 'flex flex-row flex-wrap justify-center gap-[80px]'>
      { technologies.map((technology) => (
        <div className = 'w-[167px] h-[150px]' key = { technology.name }>
          <BallCanvas icon = { technology.icon }/>
        </div>
      ))}
    </div>
  )
}

export default SectionWrapper(Tech, "");