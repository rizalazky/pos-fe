import React, { MouseEventHandler } from 'react'

import { CiPickerEmpty } from 'react-icons/ci'


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

function ProductTable({ products, handlePickProduct}:{products:productInterface[],handlePickProduct:(param:productInterface)=>void}) {

    
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
                                <button type='button' className='btn btn-sm btn-primary' disabled={Number(product.stock) == 0} onClick={()=>handlePickProduct(product)}><CiPickerEmpty/></button>
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