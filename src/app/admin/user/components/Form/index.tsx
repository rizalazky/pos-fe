'use client'
import { Button, Input } from '@/components'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { create } from '../../actions'
import { toast } from 'react-toastify'
import { HiOutlinePencil } from 'react-icons/hi2'

type FormProps = {
    id? : string,
    userDetail : {
        usernamae?:string,
        name:string,
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
    const [showImageField,setShowImageField]= useState(!id)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const onSubmit = async (formData : FormData)=>{
    
        // console.log(formData.get('image'));
        // return false;
        console.log()
        if(!fileInputRef?.current?.value && id){
            formData.delete('image')
        }
        console.log(formData.get('image'))
        // return false;
        
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

    useEffect(()=>{
        
    },[fileInputRef])

    const handleButtonChangePhoto = ()=>{
        // setShowImageField(true)
        if(fileInputRef.current){
            fileInputRef.current.click()
        }
    }

    return (
        <form action={onSubmit}>
            {
                userDetail?.image && (
                    <div className='flex flex-col justify-center items-center '>
                        <Image
                            src={`http://localhost:4000/uploads/${userDetail.image}`}
                            alt={`image-${userDetail.usernamae}`}
                            width={100}
                            height={100}
                            className='rounded-full h-[150px] w-[150px] p-2 border border-2 border-slate'
                        />
                       
                        <Button
                            onClick={handleButtonChangePhoto}
                            className='btn btn-sm mt-4 btn-primary text-white'
                            label={`Change Image`}
                            type='button'
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
                label='Full Name'
                name='name'
                type="text"
                value={userDetail.name}
                placeholder=''
                required={true}
                />
           {
            id ? (
                <input type="file" name="image" className={'hidden'} ref={fileInputRef} required={false} id="" />
            ) : (

                <Input 
                    label='Image'
                    name='image'
                    type="file"
                    value={""}
                    placeholder=''
                    required={!id}
                    /> 
            )
           }
               
           
               
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