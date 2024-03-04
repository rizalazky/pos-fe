import React from 'react'

type inputProps = {
    label : string,
    type : string,
    value : any,
    name : string,
    placeholder : string,
    required:boolean
}

const Input = ({label,type,value='',name,placeholder = 'Type here...',required}:inputProps) => {
  return (
    <label className="form-control w-full">
        <div className="label">
            <span className="label-text">{label}</span>
        </div>
        <input type={type} placeholder={placeholder} required={required} defaultValue={value} name={name} className="input input-bordered w-full" />
    </label>
  )
}

export default Input