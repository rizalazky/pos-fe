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
                          <form action={deleteData} method='delete'>
                            <input type="hidden" name="id" value={category.id} />
                            <button type='submit' className='btn btn-sm btn-circle btn-error text-white' ><FaTrash/></button>
                          </form>
                        </td>
                    </tr>
                  )
                })
              }
            
            </tbody>
        </table>
      </div>
      {openModal && (
        <Modal id={id} modalTitle='Form Category' redirect='/admin/productcategory'>
          <form action={create} method="post">
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
        </Modal>
      )}
    </div>
  )
}

export default ProductCategory