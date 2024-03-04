'use server'

import { redirect } from "next/navigation";


export const getData = async (id?:string)=>{
    const url = id ? `http://localhost:4000/api/unit/${id}` : 'http://localhost:4000/api/unit'
    const response = await fetch(url,{
      cache : 'no-store'
    });
    
    return response.json()
}

export async function create (formData : FormData){
    const id = formData.get('id');
    const data = {
        unit_name : formData.get('unit_name')
    }

    const url = id ? `http:localhost:4000/api/unit/${id}` : 'http:localhost:4000/api/unit'
    const method = id ? 'PUT' : 'POST'
    const exec =await fetch(url,{
        method :method,
        headers :{
            'Content-type' :'application/json'
        },
        body : JSON.stringify(data),
    });
    console.log('exec',exec)
    redirect('/admin/productunit')
    // return exec.json()
}

export async function deleteData(formData:FormData){

    const id = formData.get('id');
    console.log(id)
    const exec =await fetch(`http://localhost:4000/api/unit/${id}`,{
        method :'DELETE',
        headers :{
            'Content-type' :'application/json'
        },
    });

    console.log(exec)
    redirect('/admin/productunit')
}