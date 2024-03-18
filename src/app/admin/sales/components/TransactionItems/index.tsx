import React, { MouseEventHandler } from 'react'
import { FaPen } from 'react-icons/fa'
import { FaTrash } from 'react-icons/fa6'

interface transactionDetailInterface {
    id : number,
    product_name?: string,
    code? : string,
    price: number,
    discount : number,
    qty : number,
    unit? : string
}

type TransactionItemsProps = {
    transactionDetail : transactionDetailInterface[],
    onClickEdit : (param:transactionDetailInterface)=>void,
    onClickDelete : (param:transactionDetailInterface)=>void,
}

function TransactionItems({transactionDetail,onClickEdit,onClickDelete}:TransactionItemsProps) {
  return (
    <div className="card flex w-full my-4 shadow-lg p-6">
            <h1 className='my-4'>Items</h1>
            {
              transactionDetail.length > 0 && (
                  <table className='table'>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Product Name</th>
                        <th>Unit</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Discount</th>
                        <th>Total</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        transactionDetail?.map((item,index)=>{
                          return(
                            <tr key={index}>
                              <td>{item.code}</td>
                              <td>{item.product_name}</td>
                              <td>{item.unit}</td>
                              <td>{item.price}</td>
                              <td>{item.qty}</td>
                              <td>{item.discount}</td>
                              <td>{(Number(item.price) * item.qty) - item.discount}</td>
                              <td>
                                <button onClick={()=>onClickEdit(item)} className='btn btn-sm btn-circle btn-info mr-2 text-white'><FaPen/></button>
                                <button onClick={()=>onClickDelete(item)} className='btn btn-sm btn-circle btn-error mr-2 text-white'><FaTrash/></button>
                              </td>
                            </tr>
                          )
                        })
                      }
                      
                    </tbody>
                  </table>
                )
              }
          </div>
  )
}

export default TransactionItems