import {motion as m} from "framer-motion"

const animations = {
  initial: {opacity: 0, x:"40%"},
  animate: {opacity: 1, x:0},
  exit: {opacity: 0, x:"-40%"},
};

export const AnimatedPage = ({children}) => {
    return (
        <m.div variants={animations} initial="initial" animate="animate" exit="exit" transition={{duration: 0.2}}>
            {children}
        </m.div>
    )
}