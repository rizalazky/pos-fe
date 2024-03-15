'use client'
import { Input } from '@/components'
import Link from 'next/link'
import React from 'react'
import { create } from '../../actions'
import { ToastContainer, toast } from 'react-toastify'

type FormProps = {
    roleDetail : {
        role_name : string,
    },
    id? : string
}


function Form({roleDetail,id}:FormProps) {
    
    const onSubmit = async (formData : FormData)=>{
        let response = await create(formData)
        if(response.errors){
            
            toast.error('Role Name must be unique!',{
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        }
    }
  return (
    <form action={onSubmit} className='mt-8'>
        <input type="hidden" value={id} name='id' />
        <Input 
            label='Role Name'
            name='role_name'
            type="text"
            value={roleDetail.role_name}
            placeholder=''
            required={true}
            />
        <div className="flex justify-end w-full mt-6">
            <Link href={'/admin/role'} className='btn btn-secondary mr-2 text-white mb-6'>Close</Link>
            <button type="submit" className='btn btn-primary'>Submit</button>
        </div>
        
    </form>
  )
}

export default Form