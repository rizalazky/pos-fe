import { Input } from '@/components'
import Link from 'next/link'
import React from 'react'

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
  return (
    <>
        <input type="hidden" value={id} name='id' />
        <Input 
            label='Username'
            name='usernamae'
            type="text"
            value={userDetail.usernamae}
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
    </>
  )
}

export default Form