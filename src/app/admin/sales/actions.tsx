'use server'

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
    transactionDetail : transactionDetailInterface[],
    discount : number,
    cash : number,
    note:string
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

export const processTransaction = async(dataTransaction:transactionInterface)=>{
    let dataToPost = {
        customer_id : dataTransaction.customer_id,
        discount: dataTransaction.discount,
        transaction_date : dataTransaction.date,
        cash : dataTransaction.cash,
        notes : dataTransaction.note,
        user_by : dataTransaction.user_by,
        transaction_items : dataTransaction.transactionDetail
    }

    const url = 'http://localhost:4000/api/sales';
    const exec = await fetch(url,{
        method : 'POST',
        headers :{
            'Content-type' :'application/json'
        },
        body : JSON.stringify(dataToPost),
    })

    const response = await exec.json();
    console.log(response.data)
}








