import React from 'react'
import user from '../../context/UserContext'
import {Navbar} from './Navbar.jsx'
import SideMenu from './SideMenu.jsx'

export const DashboardLayout = ({children,activeMenu}) => {
  return (
    <div>
        <Navbar activeMenu={activeMenu}/>

        {user && (
            <div className="flex bg-gray-100">
                <div className='max-[1080px]:hidden'>
                   <SideMenu activeMenu={activeMenu}/> 
                </div>

                <div className="grow mx-5">{children}</div>
            </div>
        )}
    </div>
  )
}
