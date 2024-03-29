'use server'

import { redirect } from "next/navigation";


export const getData = async (id?:string)=>{
    const url = id ? `http://localhost:4000/api/category/${id}` : 'http://localhost:4000/api/category'
    const response = await fetch(url,{
      cache : 'no-store'
    });
    
    return response.json()
}

export async function create (formData : FormData){
    const id = formData.get('id');
    const data = {
        name : formData.get('name')
    }

    const url = id ? `http:localhost:4000/api/category/${id}` : 'http:localhost:4000/api/category'
    const method = id ? 'PUT' : 'POST'
    const exec =await fetch(url,{
        method :method,
        headers :{
            'Content-type' :'application/json'
        },
        body : JSON.stringify(data),
    });
    console.log('exec',exec)
    redirect('/admin/productcategory')
    // return exec.json()
}

export async function deleteData(formData:FormData){

    const id = formData.get('id');
    console.log(id)
    const exec =await fetch(`http://localhost:4000/api/category/${id}`,{
        method :'DELETE',
        headers :{
            'Content-type' :'application/json'
        },
    });

    console.log(exec)
    redirect('/admin/productcategory')
}