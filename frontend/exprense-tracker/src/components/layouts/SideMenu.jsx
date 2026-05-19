import React,{useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import {SIDE_MENU_DATA} from '../../utils/data.js'
import {UserContext} from '../../context/UserContext'
import {CharAvatar} from '../Cards/CharAvatar.jsx'

const SideMenu = ({activeMenu}) => {

    const {user,clearUser} = useContext(UserContext);
    const navigate = useNavigate();

    const handleclick= (route) =>{
      if(route === "logout"){
        handleLogOut();
        return;
      }

      navigate(route)
    }

    const handleLogOut =()=>{
      localStorage.clear(),
      clearUser();
      navigate('/login')
    }
  return (
   
    <div className='w-64 h-[calc(100vh-61px)] bg-white border border-gray-200 p-5 sticky top-[61px] z-20'>
      <div className='flex flex-col items-center justify-center mb-2 gap-3 mt-3'>
        {!user?.profileImage  ? (
          <img src={user?.profileImageUrl || " "}
               alt="Profile image"
               className="w-20 h-20 bg-slate-400 rounded-full"
           />
        ):(
          <CharAvatar
            fullName={user?.fullName}
            width='w-20'
            height='h-20'
            style='text-xl'
          />
        )}

        <h5 className="text-gray-500 font-medium rounded-full">
        {user?.fullName || " "}
        </h5>
      </div>


        {SIDE_MENU_DATA.map((item,index)=>(
          <button
            key={`menu_${index}`}
            className={`w-full flex item-center gap-4 text-[15px] ${activeMenu == item.label ? 'text-white text-lg bg-primary':" "} py-3 px-6 rounded-lg mb-3`}
            onClick={()=> handleclick(item.path)}
          >
            <item.icon className=''/>
            <span>{item.label}</span>
            
          </button>
        ))}

       

    </div>
    
  )
}

export default SideMenu;



// //user?.profileImage => This uses optional chaining (?.) , It safely checks:
// If user exists (not null or undefined)
// Then accesses user.profileImage
// Without optional chaining, this could crash if user is null.