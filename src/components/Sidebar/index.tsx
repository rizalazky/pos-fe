import Link from 'next/link'
import React from 'react'
import { BiCategory } from 'react-icons/bi'
import { BsPeople } from 'react-icons/bs'
import { FaBalanceScale, FaListOl } from 'react-icons/fa'
import { FiDatabase, FiSettings, FiShoppingBag, FiShoppingCart, FiTruck, FiUser, FiUsers } from 'react-icons/fi'
import { GrTransaction } from 'react-icons/gr'
import { MdOutlineDashboard } from 'react-icons/md'
import { TbShoppingBagMinus, TbShoppingBagPlus } from 'react-icons/tb'

function Sidebar() {
  return (
    <div className="flex flex-col flex-wrap bg-white  min-h-screen md:shadow-xl animated faster">
        <div className="navbar bg-base-100">
        <div className="flex-1">
            <a className="btn btn-ghost text-xl">POS</a>
        </div>
        </div>
        <div className="p-6 pt-8">
            <ul className="menu bg-base-200 w-56 rounded-box">
                <li><Link href={'/admin/dashboard'}><MdOutlineDashboard/>Dashboard</Link></li>
                <li>
                    <details open>
                    <summary><FiDatabase/> Master</summary>
                    <ul>
                        <li><Link href={'/admin/productcategory'}><BiCategory/> Product Category</Link></li>
                        <li><Link href={'/admin/productunit'}><FaBalanceScale/> Product Unit</Link></li>
                        <li><Link href={'/admin/product'}><FaListOl/> Product</Link></li>
                        <li><Link href={'/admin/customer'}><BsPeople/> Customer</Link></li>
                        <li><Link href={'/admin/supplier'}><FiTruck/> Supplier</Link></li>
                    </ul>
                    </details>
                </li>
                <li>
                    <details open>
                    <summary><GrTransaction/> Transaction</summary>
                    <ul>
                        <li><Link href={'/admin/sales'}><FiShoppingBag/>Sales</Link></li>
                        <li><Link href={'/admin/stockin'}><TbShoppingBagPlus/>Stock in</Link></li>
                        <li><Link href={'/admin/stockout'}><TbShoppingBagMinus/>Stock out</Link></li>
                    </ul>
                    </details>
                </li>
                <li><Link href={'/admin/role'}><FiUser/>Roles</Link></li>
                <li><Link href={'/admin/user'}><FiUsers/>Users</Link></li>
                <li><a><FiSettings/> Setting</a></li>
            </ul>

        </div>
    </div>
  )
}

export default Sidebar