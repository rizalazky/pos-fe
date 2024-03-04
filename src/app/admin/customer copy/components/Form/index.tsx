import { Input } from '@/components'
import Link from 'next/link'
import React from 'react'

type FormProps = {
    customerDetail : {
        customer_name : string,
        phone_number : string
    },
    id? : string
}


function Form({customerDetail,id}:FormProps) {
  return (
    <>
        <input type="hidden" value={id} name='id' />
        <Input 
            label='Customer Name'
            name='customer_name'
            type="text"
            value={customerDetail.customer_name}
            placeholder=''
            required={true}
            />
        <Input 
            label='Phone Number'
            name='phone_number'
            type="text"
            value={customerDetail.phone_number}
            placeholder=''
            required={true}
            />
        <div className="flex justify-end w-full mt-6">
            <Link href={'/admin/customer'} className='btn btn-secondary mr-2 text-white mb-6'>Close</Link>
            <button type="submit" className='btn btn-primary'>Submit</button>
        </div>
    </>
  )
}

export default Form