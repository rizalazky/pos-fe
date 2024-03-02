import React from 'react'
import { FaPen, FaPlus, FaTrash } from 'react-icons/fa';


const getData = async ()=>{
  const response = await fetch('http://localhost:4000/api/category');
  
  return response.json()
}

interface categoriesInterface {
  id : number,
  name: string,
}
const ProductCategory= async () => {

  const categories:categoriesInterface[] = await getData();


  return (
    <div className='rounded-md shadow-lg p-6'>
      <button className='btn btn-sm btn-circle btn-primary mr-2 text-white mb-6'><FaPlus/></button>
      <div className="overflow-x-auto">

        <table className="table">
            {/* head */}
            <thead>
              <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                categories.map((category,index)=>{
                  return(
                    <tr key={category.id}>
                        <th>{index +1 }</th>
                        <td>{category.name}</td>
                        <td>
                          <button className='btn btn-sm btn-circle btn-info mr-2 text-white'><FaPen/></button>
                          <button className='btn btn-sm btn-circle btn-error text-white'><FaTrash/></button>
                        </td>
                    </tr>
                  )
                })
              }
            
            </tbody>
        </table>
      </div>
    </div>
  )
}

export default ProductCategory