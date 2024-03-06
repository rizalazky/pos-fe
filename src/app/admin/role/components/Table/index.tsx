import Link from 'next/link'
import React from 'react'
import { FaPen, FaTrash } from 'react-icons/fa'


interface roleType {
    id:number,
    role_name:string
}

type TableProps ={
    roles:roleType[]
} 

function Table({roles}:TableProps) {
  return (
    <div className="overflow-x-auto">
    <table className="table">
        
        <thead>
            <tr>
                <th>#</th>
                <th>Role Name</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {
            roles.map((role,index)=>{
                return(
                <tr key={role.id}>
                    <th>{index + 1}</th>
                    <td>{role.role_name}</td>
                    <td>
                        <Link href={`?modal=true&id=${role.id}`} className='btn btn-sm btn-circle btn-info mr-2 text-white'><FaPen/></Link>
                        <Link href={`?modal=true&id=${role.id}&action=delete`} className='btn btn-sm btn-circle btn-error mr-2 text-white'><FaTrash/></Link>
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