import React,{useState} from 'react'
import {HiOutlineMenu, HiOutlineX} from 'react-icons/hi'
import SideMenu from './SideMenu.jsx'

export const Navbar = ({activeMenu}) => {
    
    const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <div className='flex gap-5 border border-gray-200 py-4 px-7 sticky top-0 z-30'>
        <button
        className="lg:hidden block"
        onClick={()=>setOpenSideMenu(!openSideMenu)}
        >
          {
            openSideMenu ? (
                <HiOutlineX className=""/>
            ):(
                <HiOutlineMenu className=""/>
            )
    
        }
        </button>

        <h1 className='text-lg font-medium'>Expense Tracker</h1>

{/* //conditional rendering using && (AND operator). */}
        {
            openSideMenu && (
                <div className='fixed top-[60px] -ml-5 bg-white'>
                    <SideMenu activeMenu={activeMenu}/>
                </div>
            )
        }
    </div>
  )
}
