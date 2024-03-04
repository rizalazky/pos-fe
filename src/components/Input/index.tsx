import React from 'react'

type inputProps = {
    label : string,
    type : string,
    value : any,
    name : string,
    placeholder? : string,
    required:boolean,
    selectOption? : {
      value: string,
      text : string
    }[],
}

const Input = ({label,type,value='',name,placeholder,required, selectOption}:inputProps) => {
  

  const InputComponent = ()=>{
    switch (type) {
      case 'select':
        return <select defaultValue={value} name={name} className="select select-bordered w-full max-w-xs">
          {/* <option disabled selected>{placeholder}</option> */}
          {
            selectOption?.map(opt =>{
              return(
                <option value={opt.value}>{opt.text}</option>
              )
            })
          }
        </select>
        break;
      case 'textarea':
        return <textarea name={name} className="textarea textarea-bordered" placeholder={placeholder}>{value}</textarea>
        break;
    
      default:
        return <input type={type} placeholder={placeholder} required={required} defaultValue={value} name={name} className="input input-bordered w-full" />
        break;
    }
  }

  
  return (
    <label className="form-control w-full mt-2">
        <div className="label">
            <span className="label-text">{label}</span>
        </div>
        <InputComponent/>
    </label>
  )
}

export default Input