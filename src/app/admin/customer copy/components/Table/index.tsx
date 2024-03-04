import Link from 'next/link'
import React from 'react'
import { FaPen, FaTrash } from 'react-icons/fa'


interface customerInterface {
    id:number,customer_name:string, phone_number:string
}

function Table(customers:customerInterface[]) {
  return (
    <div className="overflow-x-auto">
    <table className="table">
        
        <thead>
            <tr>
                <th>Code</th>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {
            customers.map((customer,index)=>{
                return(
                <tr key={customer.id}>
                    <th>{index + 1}</th>
                    <td>{customer.customer_name}</td>
                    <td>{customer.phone_number}</td> 
                    <td>
                        <Link href={`?modal=true&id=${customer.id}`} className='btn btn-sm btn-circle btn-info mr-2 text-white'><FaPen/></Link>
                        <Link href={`?modal=true&id=${customer.id}&action=delete`} className='btn btn-sm btn-circle btn-error mr-2 text-white'><FaTrash/></Link>
                    </td>
                </tr>
                )
            })
            }
        
        </tbody>
    </table>
    </div>
  )
}

export default Table