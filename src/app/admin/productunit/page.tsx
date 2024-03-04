import { Input, Table } from '@/components'
import React from 'react'
import { create, deleteData, getData } from './actions';
import Link from 'next/link';
import { FaPen, FaPlus, FaTrash } from 'react-icons/fa';
import Modal from '@/components/Modal';

export type Props = {
  searchParams : Record<string,string> | null | undefined
}

export interface unitInterface {
  id? : number,
  unit_name?: string,
}

async function ProductUnit(props:Props) {
  const id = props.searchParams?.id;
  const action = props.searchParams?.action;
  const openModal = props.searchParams?.modal ? true :false;
  const units:unitInterface[] = await getData();
  let unitDetail:unitInterface = {
    unit_name: ''
  };
  if(id){
    unitDetail = await getData(id)
  }



  return (
    <div className='rounded-md shadow-lg p-6'>
      <Link href={'?modal=true'} className='btn btn-sm btn-circle btn-primary mr-2 text-white mb-6'><FaPlus/></Link>
      <div className="overflow-x-auto">
        <table className="table">
            {/* head */}
            <thead>
              <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                units.map((unit,index)=>{
                  return(
                    <tr key={unit.id}>
                        <th>{index +1 }</th>
                        <td>{unit.unit_name}</td>
                        <td>
                          <Link href={`?modal=true&id=${unit.id}`} className='btn btn-sm btn-circle btn-info mr-2 text-white'><FaPen/></Link>
                          <Link href={`?modal=true&id=${unit.id}&action=delete`} className='btn btn-sm btn-circle btn-error mr-2 text-white'><FaTrash/></Link>
                        </td>
                    </tr>
                  )
                })
              }
            
            </tbody>
        </table>
      </div>
      {openModal && (
        <Modal id={id} modalTitle='' redirect='/admin/productunit'>
          {
            action == 'delete' ? (
              <form action={deleteData} method="post">
                <input type="hidden" value={id} name='id' />
                <h1>Are you sure want to delete this record?</h1>
                <div className="flex justify-end w-full mt-6">
                  <Link href={'/admin/productunit'} className='btn btn-secondary mr-2 text-white mb-6'>No</Link>
                  <button type="submit" className='btn btn-primary'>Yes</button>
                </div>
              </form>
            ) : (
              <form action={create} method="post">
                <input type="hidden" value={id} name='id' />
                <Input 
                  label='Unit Name'
                  name='unit_name'
                  type="text"
                  value={unitDetail.unit_name}
                  placeholder='Type here...'
                  required={true}
                  />
                  <div className="flex justify-end w-full mt-6">
                    <Link href={'/admin/productunit'} className='btn btn-secondary mr-2 text-white mb-6'>Close</Link>
                    <button type="submit" className='btn btn-primary'>Submit</button>
                  </div>
              </form>
            )
          }
          
        </Modal>
      )}
    </div>
  )
}

export default ProductUnit