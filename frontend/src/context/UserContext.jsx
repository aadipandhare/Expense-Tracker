import React,{createContext, useState} from 'react'

export const UserContext = createContext();

export const UserProvider = ({children})=>{
    const [user,setUser] = useState();
console.log(user)
    //Function to update user
    const updateUser = (userData)=>{
        console.log(userData)
        setUser(userData)
    };

    //function to clear user data
    const clearUser=()=>{
        setUser(null);
    }

    return(
        <UserContext.Provider
          value={{
                user,
                updateUser,
                clearUser
                }}
        >
          {children}
        </UserContext.Provider>
    )

}

export default UserProvider;