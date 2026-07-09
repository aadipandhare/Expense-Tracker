import React,{useContext,useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {SIDE_MENU_DATA} from '../../utils/data.js'
import {UserContext} from '../../context/UserContext'
import {CharAvatar} from '../Cards/CharAvatar.jsx'
import profile from '../../assets/profile.jpg'
import {Logout} from '../../pages/Dashboard/Logout.jsx'

const SideMenu = ({activeMenu}) => {

    const {user,clearUser} = useContext(UserContext);
    const navigate = useNavigate();

    const [showLogOut,setShowLogOut] = useState(false)

    // console.log(user)
    console.log(user?.name)

    const handleclick= (route) =>{
      if(route === "logout"){
        // handleLogOut();
        setShowLogout(true);
        return;
      }

      navigate(route)
    }

    const handleLogOut =()=>{
      localStorage.clear();
      clearUser();
      navigate('/login')
    }
  return (
    <>
   
    <div className='w-64 h-[calc(100vh-61px)] bg-white border border-gray-200 p-5 sticky top-[61px] z-20'>
      <div className='flex flex-col items-center justify-center mb-2 gap-3 mt-3'>
        {!user?.profileImageUrl  ? (
          <img src={profile}
               alt="Profile image"
               className="w-20 h-20 bg-slate-400 rounded-full"
           />
        ):(
          <CharAvatar
            fullName={user?.name}
            width='w-20'
            height='h-20'
            style='text-xl'
          />
        )}
{/* <img src={user?.profileImageUrl || " "} */}
        <h5 className="text-gray-500 font-medium rounded-full">
        {user?.name || " "}
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
    
     {showLogOut && (
          <Logout
            onConfirm={handleLogOut}
            onCancel={()=>setShowLogOut(false)}
          />
        )}
    
 </> )
}

export default SideMenu;



// //user?.profileImage => This uses optional chaining (?.) , It safely checks:
// If user exists (not null or undefined)
// Then accesses user.profileImage
// Without optional chaining, this could crash if user is null.