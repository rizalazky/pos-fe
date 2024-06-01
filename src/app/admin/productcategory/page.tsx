import Modal from '@/components/Modal';
import Link from 'next/link';
import React from 'react'
import { FaPen, FaPlus, FaTrash } from 'react-icons/fa';
import { create, deleteData, getData } from './actions';
import { Input } from '@/components';


export type Props = {
  searchParams : Record<string,string> | null | undefined
}

export interface categoriesInterface {
  id? : number,
  name?: string,
}
const ProductCategory= async (props : Props) => {

  const id = props.searchParams?.id;
  const action = props.searchParams?.action;
  const openModal = props.searchParams?.modal ? true :false;
  const categories:categoriesInterface[] = await getData();
  let categoryDetail:categoriesInterface = {
    name: ''
  };
  if(id){
    categoryDetail = await getData(id)
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
                categories.map((category,index)=>{
                  return(
                    <tr key={category.id}>
                        <th>{index +1 }</th>
                        <td>{category.name}</td>
                        <td>
                          <Link href={`?modal=true&id=${category.id}`} className='btn btn-sm btn-circle btn-info mr-2 text-white'><FaPen/></Link>
                          <Link href={`?modal=true&id=${category.id}&action=delete`} className='btn btn-sm btn-circle btn-error mr-2 text-white'><FaTrash/></Link>
                        </td>
                    </tr>
                  )
                })
              }
            
            </tbody>
        </table>
      </div>
      {openModal && (
        <Modal id={id} modalTitle='' redirect='/admin/productcategory'>
          {
            action == 'delete' ? (
              <form action={deleteData} method="post">
                <input type="hidden" value={id} name='id' />
                <h1>Are you sure want to delete this record?</h1>
                <div className="flex justify-end w-full mt-6">
                  <Link href={'/admin/productcategory'} className='btn btn-secondary mr-2 text-white mb-6'>No</Link>
                  <button type="submit" className='btn btn-primary'>Yes</button>
                </div>
              </form>
            ) : (
              <form action={create}>
                <input type="hidden" value={id} name='id' />
                <Input 
                  label='Category Name'
                  name='name'
                  type="text"
                  value={categoryDetail.name}
                  placeholder='Type here...'
                  required={true}
                  />
                  <div className="flex justify-end w-full mt-6">
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

export default ProductCategory