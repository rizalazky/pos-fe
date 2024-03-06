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
    icon? : React.ReactNode
}

const Input = ({label,type,value,name,placeholder,required, selectOption,className,isLabelInside,icon}:inputProps) => {
  

  const InputComponent = ({className}:{className?:string})=>{
    switch (type) {
      case 'select':
        return <select defaultValue={value} name={name} className={`select select-bordered w-full ${className}`}>
          {/* <option disabled selected>{placeholder}</option> */}
          {
            selectOption?.map((opt,index) =>{
              return(
                <option key={index} value={opt.value}>{opt.text}</option>
              )
            })
          }
        </select>
        break;
      case 'textarea':
        return <textarea name={name} className={`textarea textarea-bordered ${className}`} placeholder={placeholder}>{value}</textarea>
        break;
    
      default:
        return <input type={type} placeholder={placeholder} required={required} defaultValue={value} name={name} className={`input input-bordered w-full ${className}`} />
        break;
    }
  }

  if(isLabelInside){
    return(
      <label className="input input-bordered flex items-center gap-2 mt-2">
        <p className='whitespace-nowrap min-w-[30%]'>{label}</p>
        <InputComponent className='grow border-transparent'/>
        {icon}
      </label>
    )
  }
  
  return (
    <label className={`form-control w-full mt-2  ${className}`}>
        <div className="label">
            <span className="label-text">{label}</span>
        </div>
        {/* {
          icon && (
            {icon}
          )
        } */}
        <InputComponent/>
        {icon}
    </label>
  )
}

export default Input