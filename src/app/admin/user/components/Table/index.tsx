import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaPen, FaTrash } from 'react-icons/fa'


interface userInterface {
    id:number,
    usernamae:string,
    name:string,
    image: string,
    Role: {
        role_name?:string
    },
    address: string
}

interface TableProps {
    users : userInterface[]
}

function Table({users}:TableProps) {
  return (
    <div className="overflow-x-auto">
    <table className="table">
        
        <thead>
            <tr>
                <th>#</th>
                <th>Image</th>
                <th>Username</th>
                <th>Full Name</th>
                <th>Address</th>
                <th>Role</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {
            users.map((user,index)=>{
                return(
                <tr key={user.id}>
                    <th>{index + 1}</th>
                    <td> <Image alt='image' src={`http://localhost:4000/uploads/${user.image}`} width={100} height={100}/></td>
                    <td>{user.usernamae}</td>
                    <td>{user.name}</td>
                    <td>{user.address}</td> 
                    <td>{user.Role.role_name}</td> 
                    <td>
                        <Link href={`?modal=true&id=${user.id}`} className='btn btn-sm btn-circle btn-info mr-2 text-white'><FaPen/></Link>
                        <Link href={`?modal=true&id=${user.id}&action=delete`} className='btn btn-sm btn-circle btn-error mr-2 text-white'><FaTrash/></Link>
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