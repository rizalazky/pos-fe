import React, { ReactNode } from 'react'


type ButtonProps = {
    label : ReactNode,
    className : string,
    onClick : React.MouseEventHandler
}

function Button({className,onClick,label}:ButtonProps) {
  return (
    <button onClick={onClick} className={className}>
        {label}
    </button>
  )
}

export default Button