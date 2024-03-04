'use server'

export async function create (formData : FormData){
    const data = {
        name : formData.get('name')
    }

    const exec =await fetch('http:localhost:4000/api/category',{
        method :'POST',
        headers :{
            'Content-type' :'application/json'
        },
        body : JSON.stringify(data),
    });
    console.log('exec',exec)
    // return exec.json()
}   