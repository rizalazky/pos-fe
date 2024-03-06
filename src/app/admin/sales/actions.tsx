'use server'

import { redirect } from "next/navigation"

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
    discount? : number,
    qty? : number,
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

interface transactionInterface{
    date : Date,
    user_by : string,
    customer_id : string,
    transactionsDetail : transactionInterface,
    discount : number,
    cash : number,
    note:string
}

const transactionDetail:transactionDetailInterface[] = []

let pickProduct:productInterface;

let transaction:transactionInterface;


export const getTransactionsDetail = ()=>{
    return transactionDetail
}

export const getCustomers = async()=>{
    const response = await fetch('http://localhost:4000/api/customer',{
        cache:'no-store'
    });
    let customers = await response.json()
    customers = customers.map((item: { customer_name: string; id: number; }) => {
        return {
            text: item.customer_name,
            value: item.id
        };
    });
    customers.push({
        value : 0,
        text : 'Umum'
    })
    customers.sort((a:any, b:any) => a.value - b.value); 

    return customers
}

export const getProducts = async (id?:string)=>{
    const url = 'http://localhost:4000/api/product'
    const response = await fetch(url,{
      cache : 'no-store'
    });
    
    return response.json()
}

export const getTransactionDetail = async(id:number)=>{
    return transactionDetail.find(trx=>trx.id == id)
}

export const addTotransactionDetail = async(formData:FormData)=>{
    const qty = formData.get('qty');
    const checkIfExist =await getTransactionDetail(pickProduct.id)
    if(checkIfExist) return false;
    transactionDetail.push({
        id : pickProduct.id,
        code : pickProduct.code,
        product_name: pickProduct.product_name,
        price : pickProduct.price,
        qty : Number(qty),
        discount : 0,
        unit : pickProduct.ProductUnit?.unit_name 
    })
    redirect('/admin/sales')
}

export const deleteTransactionDetail = (formData : FormData)=>{
    const id = formData.get('id');

    transactionDetail.splice(transactionDetail.findIndex( trx => trx.id == Number(id)) , 1)
    redirect('/admin/sales')
}

export const updateTransactionDetail = async (formData : FormData)=>{
    
    const id = formData.get('id')
    const qty = formData.get('qty')
    const discount = formData.get('discount')
    const itemIndex = transactionDetail.findIndex( trx => trx.id == Number(id))
    transactionDetail[itemIndex].qty = Number(qty)
    transactionDetail[itemIndex].discount = Number(discount)
    
    redirect('/admin/sales')
}

export const selectProduct = (product:productInterface)=>{
    pickProduct = product
}

export const getSelectedProduct = async()=>{
    return pickProduct
}

export const getSubTotal = ()=>{
    if(transactionDetail.length > 0){
        let sum : number = transactionDetail?.map(trx=>{
            return (trx.price * trx.qty) - trx.discount
        }).reduce((a,b)=>{
            return a + b
        })
    
        return sum;
    }
}



