import React from 'react'
import { addTotransactionDetail, getProducts, selectProduct } from '../../actions'
import { FaMouse, FaMousePointer } from 'react-icons/fa'
import { CiPickerEmpty } from 'react-icons/ci'
import { redirect } from 'next/navigation'


interface productInterface {
    id : number,
    product_name?: string,
    code? : string,
    category_id?: string,
    unit_id?: string,
    price: number,
    stock?: string,
    description?: string,
    ProductCategory? : {
      name: string
    },
    ProductUnit? : {
      unit_name : string
    },
}

async function ProductTable() {

    const products:productInterface[] = await getProducts()
    return (
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
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {
                    products.map((product)=>{
                    return(
                        <tr key={product.id} className='hover'>
                            <th>{product.code}</th>
                            <td>{product.ProductCategory?.name}</td>
                            <td>{product.product_name}</td>
                            <td>{product.ProductUnit?.unit_name}</td>
                            <td>{product.price}</td>
                            <td>{product.stock}</td>
                            <td>{product.description}</td>
                            <td>
                                <form 
                                    action={ async()=>{
                                        'use server'
                                        selectProduct(product)
                                        redirect('/admin/sales')
                                    }} 
                                    method="post">
                                    <input type="hidden" name="id" value={product.id} />
                                    <button type='submit' className='btn btn-sm btn-primary'><CiPickerEmpty/></button>
                                </form>
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

export default ProductTable