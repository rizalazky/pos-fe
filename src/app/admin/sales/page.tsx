'use client'
import { Input } from '@/components'
import React, { useEffect, useState } from 'react'
import { FaPen, FaPlus, FaSearch, FaTrash } from 'react-icons/fa'
import Modal from '@/components/Modal'
import { ProductTable } from './components'
import Link from 'next/link'
import { getCustomers, getProducts, processTransaction } from './actions'
import TransactionItems from './components/TransactionItems'
import { toast } from 'react-toastify'

export type Props = {
  searchParams : Record<string,string> | null | undefined
}
type customerType = {
  text : string,
  value : string,
}

interface transactionDetailInterface {
  id : number,
  product_name?: string,
  code? : string,
  price: number,
  discount : number,
  qty : number,
  unit? : string
}

interface productInterface{
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
  discount? : number,
  qty? : number,
}

interface transactionInterface{
  date : Date,
  user_by : string,
  customer_id : string,
  transactionDetail : transactionDetailInterface[],
  discount : number,
  cash : number,
  note:string
}

function Sales(props:Props) {
  const [customers,setCustomers] = useState<customerType[]>([])
  const [modal,setModal] = useState(false)
  const [actionModal,setActionModal] = useState('')
  const [transaction,setTransaction]=useState<transactionInterface>({
    date : new Date(),
    user_by: '',
    customer_id : '',
    transactionDetail:[],
    discount : 0,
    cash : 0,
    note : ''
  });
  const [products,setProducts] = useState([])
  const [subTotal,setSubTotal] = useState(0)
  const [selectedProduct,setSelectedProduct] = useState<productInterface | null>(null) 
  const [selectedTransactionDetail,setSelectedTransactionDetail]  = useState<transactionDetailInterface | null>(null)
  const [note,setNote] = useState('')


  const getCustomerData = async ()=>{
    let data = await getCustomers()
    setCustomers(data)
  }

  const getProductData = async ()=>{
    let dataProducts = await getProducts()
    setProducts(dataProducts)
  }

  useEffect(()=>{
    getCustomerData()
    getProductData()
  },[])

  const handlePickProduct = async(param:productInterface)=>{
    
    setSelectedProduct(param);
    setModal(false)
  }

  useEffect(()=>{
    console.log('FIRED')
    if(transaction.transactionDetail.length > 0){
      let sum : number = transaction.transactionDetail?.map(trx=>{
          return (trx.price * trx.qty) - trx.discount
      }).reduce((a,b)=>{
          return a + b
      })

      console.log('SUMM',sum)

      setSubTotal(sum)
    }
  },[transaction])

  const handleChangeTransaction = (obj:object)=>{
    setTransaction({...transaction,...obj})
  }

  const addTransactionDetail = (e:any)=>{
    e.preventDefault()
    let qty = e.target.qty.value;
    let transactionDetail = transaction.transactionDetail;
    if(Number(qty) > Number(selectedProduct?.stock)){
      toast.error('The quantity entered exceeds available stock!',{
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
      return false;
    }
    
    const checkIfExist = transactionDetail.find(trx=>trx.id == selectedProduct?.id)
    if(selectedProduct && !checkIfExist){
      transactionDetail.push({
          id : selectedProduct.id,
          code : selectedProduct.code,
          product_name: selectedProduct.product_name,
          price : selectedProduct.price,
          qty : Number(qty),
          discount : 0,
          unit : selectedProduct.ProductUnit?.unit_name 
      })
    }
    handleChangeTransaction({transactionDetail : transactionDetail})
    setSelectedProduct(null)
  }

  const deleteTransactionDetail = (e:any)=>{
    e.preventDefault()
    let transactionDetail = transaction.transactionDetail;
    transactionDetail.splice(transactionDetail.findIndex( trx => trx.id == Number(selectedTransactionDetail?.id)) , 1)
    handleChangeTransaction({transactionDetail : transactionDetail})
    setSelectedTransactionDetail(null)
    setModal(false)
  }

  const updateTransactionDetail = async (e:any)=>{
    
    const id = selectedTransactionDetail?.id
    const qty = e.target.qty.value
    const discount = e.target.discount.value

    let transactionDetail = transaction.transactionDetail;
    const itemIndex = transactionDetail.findIndex( trx => trx.id == Number(id))
    transactionDetail[itemIndex].qty = Number(qty)
    transactionDetail[itemIndex].discount = Number(discount)
    handleChangeTransaction({transactionDetail : transactionDetail})
    setSelectedTransactionDetail(null)
    setModal(false)
  }

  const process = async ()=>{
    // window.print();
    // return false;
    const apiProcess = await processTransaction(transaction);
    console.log('test',apiProcess);
    if(apiProcess.status == 'OK'){
      toast.success('Transaction Success!!',{
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
      // print struck
      window.location.reload();
    }else{
      toast.error('Transaction Failed!!',{
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    }
  }
  

  
  
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
            onChange={(e)=>handleChangeTransaction({date:e})}
            value={transaction.date.toLocaleDateString('en-CA')}
          />
          <Input
            label='Casier'
            name='user_by'
            // value={} // session
            type='text'
            required
            className='mt-0'
            isLabelInside
            value={transaction.user_by}
            readOnly
          />
          <Input
            label='Customer'
            name='customer_id'
            type='select'
            required
            className='mt-0'
            isLabelInside
            selectOption={customers}
            value={transaction.customer_id}
            onChange={(e)=>handleChangeTransaction({customer_id:e})}
          />
        </div>
        <div className="card shadow-lg p-4 w-full">
          <form onSubmit={addTransactionDetail}>
            <Input
              label='Product'
              name='product_id'
              type='text'
              required={true}
              className='mt-0'
              isLabelInside
              icon={<i onClick={()=>setModal(true)}><FaSearch/></i>}
              value={selectedProduct?.product_name || ''}
              readOnly
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
          Grand Total : {subTotal - transaction.discount}
        </div>
      </div>
      <TransactionItems
        transactionDetail={transaction.transactionDetail}
        onClickEdit={(param)=>{
          setModal(true)
          setSelectedTransactionDetail(param)
        }}
        onClickDelete={(param)=>{
          setModal(true);
          setSelectedTransactionDetail(param)
          setActionModal('delete')
        }}
      />   
      <div className="flex w-full justify-between gap-4">
        <div className="card shadow-lg p-4 w-full">
          <Input
            label='Sub total'
            name='sub_total'
            type='text'
            required={true}
            isLabelInside
            value={subTotal}
            readOnly
          />
          <Input
            label='Discount'
            name='discount'
            // value={} // session
            type='text'
            required
            isLabelInside
            value={transaction.discount}
            onChange={(e)=>handleChangeTransaction({discount:e.target.value})}
          />
          <Input
            label='Grand Total'
            name='grand_total'
            type='text'
            required
            isLabelInside
            value={subTotal - transaction.discount}
            readOnly
          />
        </div>
        <div className="card shadow-lg p-4 w-full">
          <Input
            label='Cash'
            name='cash'
            type='number'
            required={true}
            isLabelInside
            onChange={(e)=>handleChangeTransaction({cash:e.target.value})}
            value={transaction.cash}
          />
          <Input
            label='Change'
            name='change'
            // value={} // session
            type='number'
            required
            isLabelInside
            value={transaction.cash - (subTotal - transaction.discount) }
            readOnly={true}
          />
          
        </div>
        <div className="card shadow-lg p-4 w-full">
          <Input
            label='Note'
            name='note'
            type='textarea'
            required={true}
            onChange={(e)=>handleChangeTransaction({note : e.target.value})}
            value={transaction.note}
          />
          
        </div>
      </div>
      <div className="flex w-full justify-end gap-4 mt-4">
        <button className='btn btn-warning'>Cancel</button>
        <button className='btn btn-info' onClick={process}>Process</button>
      </div>
      {
        modal && (
          <Modal
            redirect='/admin/sales'
            id=''
            modalTitle=''
            largeModal={!selectedTransactionDetail}
            closeModal={()=>setModal(false)}
          >
            <div className='my-4'></div>
            {
              selectedTransactionDetail ? actionModal == 'delete' ? (
                <form onSubmit={deleteTransactionDetail} >
                  <input type="hidden" value={selectedTransactionDetail.id} name='id' />
                  <h1>Are you sure want to delete this record?</h1>
                  <div className="flex justify-end w-full mt-6">
                    <button type='button' onClick={()=>{setModal(false);setActionModal('')}} className='btn btn-secondary mr-2 text-white mb-6'>No</button>
                    <button type="submit" className='btn btn-primary'>Yes</button>
                  </div>
              </form>
              ) : (
                <form onSubmit={updateTransactionDetail} >
                  <input type="hidden" value={selectedTransactionDetail.id} name='id' />
                  <Input
                    label='Code Product'
                    name='code'
                    type='text'
                    value={selectedTransactionDetail?.code}
                    required
                  />
                  <Input
                    label='Product name'
                    name='product_name'
                    type='text'
                    value={selectedTransactionDetail?.product_name}
                    required
                  />
                  <div className="flex gap-4">
                    <Input
                      label='Unit'
                      name='unit'
                      type='text'
                      value={selectedTransactionDetail?.unit}
                      required
                    />
                    <Input
                      label='Price'
                      name='price'
                      type='text'
                      value={selectedTransactionDetail?.price}
                      required
                    />
                  </div>
                  <div className="flex gap-4">
                    <Input
                      label='Qty'
                      name='qty'
                      type='text'
                      defaultValue={selectedTransactionDetail?.qty}
                      required
                    />
                    <Input
                      label='Discount'
                      name='discount'
                      type='text'
                      defaultValue={selectedTransactionDetail?.discount}
                      required
                    />
                  </div>
                  <div className="flex justify-end w-full mt-6">
                    <button type='button' onClick={()=>{setModal(false);setActionModal('')}} className='btn btn-secondary mr-2 text-white mb-6'>Close</button>
                    <button type="submit" className='btn btn-primary'>Update</button>
                  </div>
                </form>
              ) : (
                <ProductTable products={products} handlePickProduct={handlePickProduct}/>
              )
            }
            
          </Modal>
        )
      }
    </div>
  )
}

export default Sales