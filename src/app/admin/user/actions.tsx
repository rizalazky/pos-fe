'use server'
import { redirect } from "next/navigation";

export const getRoles = async()=>{
    const response = await fetch(`http://localhost:4000/api/role`,{
        cache : 'no-store'
      });
      let roles = await response.json()
      roles = roles.map((item: { role_name: string; id: number; }) => {
        return {
          text: item.role_name,
          value: item.id
        };
    });
    return roles
}


export const getData = async (id?:string)=>{
    const url = id ? `http://localhost:4000/api/user/${id}` : 'http://localhost:4000/api/user'
    console.log('URL',url)
    const response = await fetch(url,{
      cache : 'no-store'
    });
    
    return response.json()
}

export async function create (formData : FormData){
    const id = formData.get('id');

  
    
    const data = {
        usernamae : formData.get('usernamae'),
        password : formData.get('usernamae'),
        image : formData.get('image'),
        address : formData.get('address'),
        role_id : formData.get('role_id'),
    }

    const url = id ? `http:localhost:4000/api/user/${id}` : 'http:localhost:4000/api/user'
    const method = id ? 'PUT' : 'POST'
    const exec =await fetch(url,{
        method :method,
        headers :{
            // 'Content-type' :'multipart/form-data'
        },
        body : formData,
    });

    const response = await exec.json();
    if(response.status == 'FAIL'){ 
        return {
            errors: response.errors 
        };
    }
    redirect('/admin/user')
    
}

export async function deleteData(formData:FormData){

    const id = formData.get('id');
    console.log(id)
    const exec =await fetch(`http://localhost:4000/api/user/${id}`,{
        method :'DELETE',
        headers :{
            'Content-type' :'application/json'
        },
    });

    
    redirect('/admin/user')
}