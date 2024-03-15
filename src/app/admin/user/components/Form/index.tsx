'use client'
import { Input } from '@/components'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { create } from '../../actions'
import { toast } from 'react-toastify'

type FormProps = {
    id? : string,
    userDetail : {
        usernamae?:string,
        image?: string,
        role_id?: string,
        address?: string
    },
    roles:{
        text:string,
        value:string
    }[]
}


function Form({userDetail,id,roles}:FormProps) {
    const onSubmit = async (formData : FormData)=>{
        let response = await create(formData)
        if(response.errors){
            
            toast.error(response.errors[0].message,{
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
        <form action={onSubmit}>
            {
                userDetail?.image && (
                    <div className='flex justify-center items-center'>
                        <Image
                            src={`http://localhost:4000/uploads/${userDetail.image}`}
                            alt={`image-${userDetail.usernamae}`}
                            width={100}
                            height={100}
                            className='rounded-full h-[150px] w-[150px]'
                        />
                    </div>
                )
            }
            <input type="hidden" value={id} name='id'/>
            <Input 
                label='Username'
                name='usernamae'
                type="text"
                value={userDetail.usernamae}
                placeholder=''
                required={true}
                />
            <Input 
                label='Image'
                name='image'
                type="file"
                value={""}
                placeholder=''
                required={true}
                />
            <Input 
                label='Address'
                name='address'
                type="textarea"
                value={userDetail.address}
                placeholder=''
                required={true}
                />
            <Input 
                label='Role'
                name='role_id'
                type="select"
                selectOption={roles}
                value={userDetail.role_id}
                placeholder=''
                required={true}
                />
            <div className="flex justify-end w-full mt-6">
                <Link href={'/admin/user'} className='btn btn-secondary mr-2 text-white mb-6'>Close</Link>
                <button type="submit" className='btn btn-primary'>Submit</button>
            </div>
        </form>
    )
}

export default Form