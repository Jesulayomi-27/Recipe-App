import React from 'react'
import './Button.css'

const Button = ({Children, BackgroundColor, MarginLeft}) => {
  return (
    <button
     style={{backgroundColor: BackgroundColor || "bisque", marginLeft: MarginLeft || "none"} }
    >
        {Children}
    </button>
  )
}

export default Button
