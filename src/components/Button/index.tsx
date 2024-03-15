import React, { ReactNode } from 'react'


type ButtonProps = {
    label : ReactNode,
    className : string,
    onClick : React.MouseEventHandler,
    type: string
}

function Button({className,onClick,label,type}:ButtonProps) {
  return (
    <button onClick={onClick} className={className} type='button'>
        {label}
    </button>
  )
}

export default Button