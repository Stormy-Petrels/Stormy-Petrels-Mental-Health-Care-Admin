import React from 'react'
import AnimatedCursor from "react-animated-cursor"
function AnimaCursor() {
  return (
    <div>
      <AnimatedCursor 
      innerSize={8}
      outerSize={8}
      color='193, 11, 111'
      outerAlpha={0.2}
      innerScale={0.7}
      outerScale={5}
      />
    </div>
  )
}

export default AnimaCursor
