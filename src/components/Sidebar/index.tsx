import React from 'react'
import { BiCategory } from 'react-icons/bi'
import { BsPeople } from 'react-icons/bs'
import { FaBalanceScale, FaListOl } from 'react-icons/fa'
import { FiDatabase, FiSettings, FiShoppingBag, FiShoppingCart, FiTruck } from 'react-icons/fi'
import { GrTransaction } from 'react-icons/gr'
import { MdOutlineDashboard } from 'react-icons/md'

function Sidebar() {
  return (
    <div className="flex flex-col flex-wrap bg-white  md:h-screen md:shadow-xl animated faster">
        <div className="navbar bg-base-100">
        <div className="flex-1">
            <a className="btn btn-ghost text-xl">POS</a>
        </div>
        </div>
        <div className="p-6 pt-8">
            <ul className="menu bg-base-200 w-56 rounded-box">
                <li><a><MdOutlineDashboard/>Dashboard</a></li>
                <li>
                    <details open>
                    <summary><FiDatabase/> Master</summary>
                    <ul>
                        <li><a><BiCategory/> Product Category</a></li>
                        <li><a><FaBalanceScale/> Product Unit</a></li>
                        <li><a><FaListOl/> Product</a></li>
                        <li><a><BsPeople/> Customer</a></li>
                        <li><a><FiTruck/> Supplier</a></li>
                    </ul>
                    </details>
                </li>
                <li>
                    <details open>
                    <summary><GrTransaction/> Transaction</summary>
                    <ul>
                        <li><a><FiShoppingBag/>Sales</a></li>
                        
                    </ul>
                    </details>
                </li>
                <li><a><FiSettings/> Setting</a></li>
            </ul>

        </div>
    </div>
  )
}

export default Sidebar