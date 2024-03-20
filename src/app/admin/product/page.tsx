import Modal from '@/components/Modal';
import Link from 'next/link';
import React from 'react'
import { FaPen, FaPlus, FaTrash } from 'react-icons/fa';
import { create, deleteData, getData, getDataCategory, getDataUnitProduct } from './actions';
import { Input } from '@/components';


export type Props = {
  searchParams : Record<string,string> | null | undefined
}

export interface productInterface {
  id? : number,
  product_name?: string,
  code? : string,
  category_id?: string,
  unit_id?: string,
  price?: string,
  stock?: string,
  description?: string,
  ProductCategory? : {
    name: string
  },
  ProductUnit? : {
    unit_name : string
  },
}

interface selectOptionInterface{
  value : string,
  text: string
}

const Product= async (props : Props) => {

  const id = props.searchParams?.id;
  const action = props.searchParams?.action;
  const openModal = props.searchParams?.modal ? true :false;
  const products:productInterface[] = await getData();
  let productDetail:productInterface = {
    product_name: ''
  };
  if(id){
    productDetail = await getData(id)
  }

  const selectOptionCategory = await getDataCategory()
  const selectOptionProductUniut = await getDataUnitProduct()



  return (
    <div className='rounded-md shadow-lg p-6'>
      <Link href={'?modal=true'} className='btn btn-sm btn-circle btn-primary mr-2 text-white mb-6'><FaPlus/></Link>
      <div className="overflow-x-auto">
        <table className="table">
            {/* head */}
            <thead>
              <tr>
                  <th>Code</th>
                  <th>Category</th>
                  <th>Prouct Name</th>
                  <th>Unit</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Description</th>
                  <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                products.map((product)=>{
                  return(
                    <tr key={product.id}>
                        <th>{product.code}</th>
                        <td>{product.ProductCategory?.name}</td>
                        <td>{product.product_name}</td>
                        <td>{product.ProductUnit?.unit_name}</td>
                        <td>{product.price}</td>
                        <td>{product.stock}</td>
                        <td>{product.description}</td>
                       
                        <td>
                          <Link href={`?modal=true&id=${product.id}`} className='btn btn-sm btn-circle btn-info mr-2 text-white'><FaPen/></Link>
                          <Link href={`?modal=true&id=${product.id}&action=delete`} className='btn btn-sm btn-circle btn-error mr-2 text-white'><FaTrash/></Link>
                        </td>
                    </tr>
                  )
                })
              }
            
            </tbody>
        </table>
      </div>
      {openModal && (
        <Modal id={id} modalTitle='' redirect='/admin/product'>
          {
            action == 'delete' ? (
              <form action={deleteData}>
                <input type="hidden" value={id} name='id' />
                <h1>Are you sure want to delete this record?</h1>
                <div className="flex justify-end w-full mt-6">
                  <Link href={'/admin/product'} className='btn btn-secondary mr-2 text-white mb-6'>No</Link>
                  <button type="submit" className='btn btn-primary'>Yes</button>
                </div>
              </form>
            ) : (
              <form action={create} className='mt-8'>
                <input type="hidden" value={id} name='id' />
                <input type="hidden" value={0} name='stock' />
                <div className="flex gap-4">
                  <Input 
                    label='Code'
                    name='code'
                    type="text"
                    defaultValue={productDetail.code}
                    placeholder=''
                    required={true}
                    />
                  <Input 
                    label='Category'
                    name='category_id'
                    type="select"
                    selectOption={selectOptionCategory}
                    defaultValue={productDetail.category_id}
                    placeholder=''
                    required={true}
                    />
                </div>
                
                <Input 
                  label='Product Name'
                  name='product_name'
                  type="text"
                  defaultValue={productDetail.product_name}
                  placeholder=''
                  required={true}
                  />
                <div className="flex gap-4">
                  <Input 
                    label='Unit'
                    name='unit_id'
                    type="select"
                    selectOption={selectOptionProductUniut}
                    defaultValue={productDetail.unit_id}
                    placeholder=''
                    required={true}
                    />
                    <Input 
                      label='Price'
                      name='price'
                      type="number"
                      defaultValue={productDetail.price}
                      placeholder=''
                      required={true}
                      />
                </div>
                <Input 
                  label='Description'
                  name='description'
                  type="textarea"
                  defaultValue={productDetail.description}
                  placeholder=''
                  required={true}
                  />
                <div className="flex justify-end w-full mt-6">
                  <Link href={'/admin/product'} className='btn btn-secondary mr-2 text-white mb-6'>Close</Link>
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

export default Product