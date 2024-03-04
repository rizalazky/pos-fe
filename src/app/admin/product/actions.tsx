'use server'

import { redirect } from "next/navigation";



export const getDataCategory = async()=>{
    const response = await fetch('http://localhost:4000/api/category',{
        cache : 'no-store'
    });
    
    let categories = await response.json()
    categories = categories.map((item: { name: string; id: number; }) => {
        return {
          text: item.name,
          value: item.id
        };
    });
    return categories
}

export const getDataUnitProduct = async()=>{
    const response = await fetch('http://localhost:4000/api/unit',{
        cache : 'no-store'
    });
    let units = await response.json()
    units = units.map((item: { unit_name: string; id: number; }) => {
        return {
          text: item.unit_name,
          value: item.id
        };
    });
    return units
}


export const getData = async (id?:string)=>{
    const url = id ? `http://localhost:4000/api/product/${id}` : 'http://localhost:4000/api/product'
    const response = await fetch(url,{
      cache : 'no-store'
    });
    
    return response.json()
}

export async function create (formData : FormData){
    const id = formData.get('id');
    
    const data = {
        product_name : formData.get('product_name'),
        code : formData.get('code'),
        category_id : formData.get('category_id'),
        unit_id : formData.get('unit_id'),
        price : formData.get('price'),
        stock : formData.get('stock'),
        description : formData.get('description'),
    }

    const url = id ? `http:localhost:4000/api/product/${id}` : 'http:localhost:4000/api/product'
    const method = id ? 'PUT' : 'POST'
    const exec =await fetch(url,{
        method :method,
        headers :{
            'Content-type' :'application/json'
        },
        body : JSON.stringify(data),
    });
    console.log('exec',exec)
    redirect('/admin/product')
    
}

export async function deleteData(formData:FormData){

    const id = formData.get('id');
    console.log(id)
    const exec =await fetch(`http://localhost:4000/api/product/${id}`,{
        method :'DELETE',
        headers :{
            'Content-type' :'application/json'
        },
    });

    console.log(exec)
    redirect('/admin/product')
}