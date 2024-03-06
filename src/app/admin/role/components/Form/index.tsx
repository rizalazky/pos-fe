import { Input } from '@/components'
import Link from 'next/link'
import React from 'react'

type FormProps = {
    roleDetail : {
        role_name : string,
    },
    id? : string
}


function Form({roleDetail,id}:FormProps) {
  return (
    <>
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
    </>
  )
}

export default Form