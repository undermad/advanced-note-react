import React, {useEffect} from "react";
import {useAnimation, motion} from "framer-motion";

type Props = {
  children: React.ReactNode;
}

export const AppearAnimation = ({children}: Props) => {

  const mainControls = useAnimation();
  
  
  useEffect(() => {
      mainControls.start("visible");
  }, [mainControls]);

  return (
    <motion.div
      variants={{
        hidden: {opacity: 0},
        visible: {opacity: 1},
      }}
      initial="hidden"
      transition={{duration: 0.3, delay: 0.25}}
      animate={mainControls}
      >

      {children}
    </motion.div>
  )

}