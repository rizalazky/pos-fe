'use server'
import { redirect } from "next/navigation";


export const getData = async (id?:string)=>{
    const url = id ? `http://localhost:4000/api/supplier/${id}` : 'http://localhost:4000/api/supplier'
    const response = await fetch(url,{
      cache : 'no-store'
    });
    
    return response.json()
}

export async function create (formData : FormData){
    const id = formData.get('id');
    
    const data = {
        supplier_name : formData.get('supplier_name'),
        phone_number : formData.get('phone_number'),
    }

    const url = id ? `http:localhost:4000/api/supplier/${id}` : 'http:localhost:4000/api/supplier'
    const method = id ? 'PUT' : 'POST'
    const exec =await fetch(url,{
        method :method,
        headers :{
            'Content-type' :'application/json'
        },
        body : JSON.stringify(data),
    });
    redirect('/admin/supplier')
    
}

export async function deleteData(formData:FormData){

    const id = formData.get('id');
    console.log(id)
    const exec =await fetch(`http://localhost:4000/api/supplier/${id}`,{
        method :'DELETE',
        headers :{
            'Content-type' :'application/json'
        },
    });

    
    redirect('/admin/supplier')
}