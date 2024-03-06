import { Input } from '@/components'
import React from 'react'
import { FaPen, FaPlus, FaSearch, FaTrash } from 'react-icons/fa'
import { addTotransactionDetail, deleteTransactionDetail, getCustomers, getSelectedProduct, getSubTotal, getTransactionDetail, getTransactionsDetail, updateTransactionDetail } from './actions'
import Modal from '@/components/Modal'
import { ProductTable } from './components'
import Link from 'next/link'

export type Props = {
  searchParams : Record<string,string> | null | undefined
}
type customerType = {
  text : string,
  value : string,
}
async function Sales(props:Props) {
  const customers:customerType[] = await getCustomers();
  const modal = props.searchParams?.modal
  const id = props.searchParams?.id
  const action = props.searchParams?.action

  const transactionDetail = getTransactionsDetail()
  const selectedProduct = await getSelectedProduct()

  const transactionDetailItem = await getTransactionDetail(Number(id));

  const subTotal = getSubTotal()

  console.log(transactionDetailItem)
  return (
    <div className='bg-white'>
      <div className="flex w-full justify-between gap-8">
        <div className="card shadow-lg p-4 w-full">
          <Input
            label='Date'
            name='date'
            type='date'
            required={true}
            className='mt-0'
            isLabelInside
          />
          <Input
            label='Casier'
            name='user_by'
            // value={} // session
            type='text'
            required
            className='mt-0'
            isLabelInside
          />
          <Input
            label='Customer'
            name='customer_id'
            type='select'
            required
            className='mt-0'
            isLabelInside
            selectOption={customers}
          />
        </div>
        <div className="card shadow-lg p-4 w-full">
          <form action={addTotransactionDetail}>
            <Input
              label='Product'
              name='product_id'
              type='text'
              required={true}
              className='mt-0'
              isLabelInside
              icon={<Link href={'?modal=true'}><FaSearch/></Link>}
              value={selectedProduct?.product_name}
            />
            <Input
              label='Qty'
              name='qty'
              isLabelInside
              type='number'
              required
              className='mt-0'
            />
            <div className="flex justify-end w-full mt-4">
              <button type='submit' className='btn btn-primary'><FaPlus/> Add</button>
            </div>
          </form>
          
        </div>
        <div className="card shadow-lg p-4 w-full">
          <h1>Invoice {`INV123456`}</h1>
          Grand Total : {subTotal}
        </div>
      </div>
      <div className="card flex w-full my-4 shadow-lg p-6">
        <h1 className='my-4'>Items</h1>
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
                      <Link href={`?modal=true&id=${item.id}`} className='btn btn-sm btn-circle btn-info mr-2 text-white'><FaPen/></Link>
                      <Link href={`?modal=true&id=${item.id}&action=delete`} className='btn btn-sm btn-circle btn-error mr-2 text-white'><FaTrash/></Link>
                    </td>
                  </tr>
                )
              })
            }
            
          </tbody>
        </table>
      </div>
      <div className="flex w-full justify-between gap-4">
        <div className="card shadow-lg p-4 w-full">
          <Input
            label='Sub total'
            name='sub_total'
            type='text'
            required={true}
            isLabelInside
            value={subTotal}

          />
          <Input
            label='Discount'
            name='discount'
            // value={} // session
            type='text'
            required
            isLabelInside
          />
          <Input
            label='Grand Total'
            name='grand_total'
            type='text'
            required
            isLabelInside
          />
        </div>
        <div className="card shadow-lg p-4 w-full">
          <Input
            label='Cash'
            name='cash'
            type='text'
            required={true}
            isLabelInside

          />
          <Input
            label='Change'
            name='change'
            // value={} // session
            type='text'
            required
            isLabelInside
          />
          
        </div>
        <div className="card shadow-lg p-4 w-full">
          <Input
            label='Note'
            name='note'
            type='textarea'
            required={true}

          />
          
        </div>
      </div>
      <div className="flex w-full justify-end gap-4 mt-4">
        <button className='btn btn-warning'>Cancel</button>
        <button className='btn btn-info'>Process</button>
      </div>
      {
        modal && (
          <Modal
            redirect='/admin/sales'
            id=''
            modalTitle=''
            largeModal={!id}
          >
            <div className='my-4'></div>
            {
              id ? action == 'delete' ? (
                <form action={deleteTransactionDetail} method="post">
                  <input type="hidden" value={id} name='id' />
                  <h1>Are you sure want to delete this record?</h1>
                  <div className="flex justify-end w-full mt-6">
                    <Link href={'/admin/sales'} className='btn btn-secondary mr-2 text-white mb-6'>No</Link>
                    <button type="submit" className='btn btn-primary'>Yes</button>
                  </div>
              </form>
              ) : (
                <form action={updateTransactionDetail} method="post">
                  <input type="hidden" value={id} name='id' />
                  <Input
                    label='Code Product'
                    name='code'
                    type='text'
                    value={transactionDetailItem?.code}
                    required
                  />
                  <Input
                    label='Product name'
                    name='product_name'
                    type='text'
                    value={transactionDetailItem?.product_name}
                    required
                  />
                  <div className="flex gap-4">
                    <Input
                      label='Unit'
                      name='unit'
                      type='text'
                      value={transactionDetailItem?.unit}
                      required
                    />
                    <Input
                      label='Price'
                      name='price'
                      type='text'
                      value={transactionDetailItem?.price}
                      required
                    />
                  </div>
                  <div className="flex gap-4">
                    <Input
                      label='Qty'
                      name='qty'
                      type='text'
                      value={transactionDetailItem?.qty}
                      required
                    />
                    <Input
                      label='Discount'
                      name='discount'
                      type='text'
                      value={transactionDetailItem?.discount}
                      required
                    />
                  </div>
                  <div className="flex justify-end w-full mt-6">
                    <Link href={'/admin/sales'} className='btn btn-secondary mr-2 text-white mb-6'>Close</Link>
                    <button type="submit" className='btn btn-primary'>Update</button>
                  </div>
                </form>
              ) : (
                <ProductTable/>
              )
            }
            
          </Modal>
        )
      }
    </div>
  )
}

export default Sales