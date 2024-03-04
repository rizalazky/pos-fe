import Modal from '@/components/Modal';
import Link from 'next/link';
import React from 'react'
import { FaPen, FaPlus, FaTrash } from 'react-icons/fa';
import { create, deleteData, getData } from './actions';
import { Input } from '@/components';
import Form from './components/Form';


export type Props = {
  searchParams : Record<string,string> | null | undefined
}

export interface supplierInterface {
  id? : number,
  supplier_name : string,
  phone_number:string
}



const Supplier= async (props : Props) => {

  const id = props.searchParams?.id;
  const action = props.searchParams?.action;
  const openModal = props.searchParams?.modal ? true :false;
  const suppliers:supplierInterface[] = await getData();
  let supplierDetail:supplierInterface = {
    supplier_name: '',
    phone_number:''
  };
  if(id){
    supplierDetail = await getData(id)
  }




  return (
    <div className='rounded-md shadow-lg p-6'>
      <Link href={'?modal=true'} className='btn btn-sm btn-circle btn-primary mr-2 text-white mb-6'><FaPlus/></Link>
      <div className="overflow-x-auto">
        <table className="table">
            {/* head */}
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
                suppliers.map((supplier,index)=>{
                  return(
                    <tr key={supplier.id}>
                        <th>{index + 1}</th>
                        <td>{supplier.supplier_name}</td>
                        <td>{supplier.phone_number}</td> 
                        <td>
                          <Link href={`?modal=true&id=${supplier.id}`} className='btn btn-sm btn-circle btn-info mr-2 text-white'><FaPen/></Link>
                          <Link href={`?modal=true&id=${supplier.id}&action=delete`} className='btn btn-sm btn-circle btn-error mr-2 text-white'><FaTrash/></Link>
                        </td>
                    </tr>
                  )
                })
              }
            
            </tbody>
        </table>
      </div>
      {openModal && (
        <Modal id={id} modalTitle='' redirect='/admin/supplier'>
          {
            action == 'delete' ? (
              <form action={deleteData} method="post">
                <input type="hidden" value={id} name='id' />
                <h1>Are you sure want to delete this record?</h1>
                <div className="flex justify-end w-full mt-6">
                  <Link href={'/admin/supplier'} className='btn btn-secondary mr-2 text-white mb-6'>No</Link>
                  <button type="submit" className='btn btn-primary'>Yes</button>
                </div>
              </form>
            ) : (
              <form action={create} method="post" className='mt-8'>
                <Form id={id} supplierDetail={supplierDetail}/>
              </form>
            )
          }
          
        </Modal>
      )}
    </div>
  )
}

export default Supplier