'use server'
import { redirect } from "next/navigation";


export const getData = async (id?:string)=>{
    const url = id ? `http://localhost:4000/api/customer/${id}` : 'http://localhost:4000/api/customer'
    const response = await fetch(url,{
      cache : 'no-store'
    });
    
    return response.json()
}

export async function create (formData : FormData){
    const id = formData.get('id');
    
    const data = {
        customer_name : formData.get('customer_name'),
        phone_number : formData.get('phone_number'),
    }

    const url = id ? `http:localhost:4000/api/customer/${id}` : 'http:localhost:4000/api/customer'
    const method = id ? 'PUT' : 'POST'
    const exec =await fetch(url,{
        method :method,
        headers :{
            'Content-type' :'application/json'
        },
        body : JSON.stringify(data),
    });
    redirect('/admin/customer')
    
}

export async function deleteData(formData:FormData){

    const id = formData.get('id');
    console.log(id)
    const exec =await fetch(`http://localhost:4000/api/customer/${id}`,{
        method :'DELETE',
        headers :{
            'Content-type' :'application/json'
        },
    });

    
    redirect('/admin/customer')
}