import Modal from '@/components/Modal';
import Link from 'next/link';
import React from 'react'
import { FaPen, FaPlus, FaTrash } from 'react-icons/fa';
import { create, deleteData, getData, getRoles } from './actions';
import { Input } from '@/components';
import Form from './components/Form';
import { Table } from './components';


export type Props = {
  searchParams : Record<string,string> | null | undefined
}

interface userInterface {
  id:number,
  usernamae:string,
  image: string,
  role_id: string,
  address: string,
  Role:{
    role_name:string
  }
}

interface RoleInterface{
  value : string,
  text:string
}



const Customer= async (props : Props) => {

  const id = props.searchParams?.id;
  const action = props.searchParams?.action;
  const openModal = props.searchParams?.modal ? true :false;
  const users:userInterface[] = await getData();
  const roles:RoleInterface[] = await getRoles()
  let userDetail:userInterface ={
    usernamae :'',
    image : '',
    role_id:'',
    address:'',
    id:0,
    Role:{
      role_name:''
    }
  };
  if(id){
    userDetail = await getData(id)
  }




  return (
    <div className='rounded-md shadow-lg p-6'>
      <Link href={'?modal=true'} className='btn btn-sm btn-circle btn-primary mr-2 text-white mb-6'><FaPlus/></Link>
      <Table users={users}/>
      {openModal && (
        <Modal id={id} modalTitle='' redirect='/admin/user'>
          {
            action == 'delete' ? (
              <form action={deleteData} method="post">
                <input type="hidden" value={id} name='id' />
                <h1>Are you sure want to delete this record?</h1>
                <div className="flex justify-end w-full mt-6">
                  <Link href={'/admin/user'} className='btn btn-secondary mr-2 text-white mb-6'>No</Link>
                  <button type="submit" className='btn btn-primary'>Yes</button>
                </div>
              </form>
            ) : (
              <form action={create} method="post" className='mt-8'>
                <Form roles={roles} id={id} userDetail={userDetail}/>
              </form>
            )
          }
          
        </Modal>
      )}
    </div>
  )
}

export default Customer