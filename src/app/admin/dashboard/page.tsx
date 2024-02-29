import { Stat } from '@/components'
import React from 'react'

function Dashboard() {
  return (
    <div>
      <div className="flex gap-4">
        <Stat title='Products' value='20' className='flex-1'/>
        <Stat title='Customers' value='200' className='flex-1'/>
        <Stat title='Suppliers' value='10' className='flex-1'/>
      </div>
    </div>
  )
}

export default Dashboard