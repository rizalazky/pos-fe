'use client'
import React from 'react'

type inputProps = {
    label : string,
    type : string,
    value? : any,
    name : string,
    placeholder? : string,
    required:boolean,
    selectOption? : {
      value: string,
      text : string
    }[],
    className? : string,
    isLabelInside? : boolean,
    icon? : React.ReactNode,
    onChange?:(value:any)=>void ,
    readOnly? : boolean,
    defaultValue? : any | null
}

const InputComponent = ({type,value,defaultValue,name,placeholder,required, selectOption,className ,onChange=()=>{},readOnly}:inputProps)=>{
  switch (type) {
    case 'select':
      return (
        <select onChange={(e)=>onChange(e.target.value)} value={value} name={name} className={`select select-bordered w-full ${className}`}>
          {
            selectOption?.map((opt,index) =>{
              return(
                <option key={index} value={opt.value}>{opt.text}</option>
              )
            })
          }
        </select>
      )
      break;
    case 'textarea':
      return <textarea name={name}  onChange={onChange} className={`textarea textarea-bordered ${className}`} value={value} placeholder={placeholder} readOnly={readOnly}></textarea>
      break;
    case 'file':
      return <input type={type} placeholder={placeholder} required={required} value={value} name={name} className={`file-input file-input-bordered w-full ${className}`} readOnly={readOnly}/>
  
    default:
      return <input type={type} onChange={(e)=>onChange(e)} placeholder={placeholder} defaultValue={defaultValue} value={value} required={required} name={name} className={`input input-bordered w-full ${className}`} readOnly={readOnly}/>
      break;
  }
}

const Input = ({label,type,value,defaultValue,name,placeholder,required, selectOption,className,isLabelInside,icon,onChange=()=>{},readOnly}:inputProps) => {
  


  if(isLabelInside){
    return(
      <label className="input input-bordered flex items-center gap-2 mt-2">
        <p className='whitespace-nowrap min-w-[30%]'>{label}</p>
        <InputComponent 
          className='grow border-transparent' 
          type={type} 
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          required={required}
          selectOption={selectOption}
          value={value}
          label=''
          icon=''
          isLabelInside={false}
          readOnly={readOnly}
          defaultValue={defaultValue}
          />
        {icon}
      </label>
    )
  }
  
  return (
    <label className={`form-control w-full mt-2  ${className}`}>
        <div className="label">
            <span className="label-text">{label}</span>
        </div>
        <InputComponent
          type={type} 
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          required={required}
          selectOption={selectOption}
          value={value}
          label=''
          icon=''
          isLabelInside={false}
          readOnly={readOnly}
          defaultValue={defaultValue}
        />
        {icon}
    </label>
  )
}

export default Input