import React from 'react'

type StatProps ={
    title : string,
    value: string,
    className : string,
    desc? : string
}

function Stat({title,value,className,desc}:StatProps) {
  return (
    <div className={`stats shadow ${className}`}>
        <div className="stat">
        <div className="stat-title">{title}</div>
        <div className="stat-value">{value}</div>
        <div className="stat-desc">{desc}</div>
        </div>
        
    </div>
  )
}

export default Stat