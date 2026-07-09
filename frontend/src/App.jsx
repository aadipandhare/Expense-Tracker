import React from 'react'
import {Login} from "../src/pages/Auth/Login.jsx"
import {SignUp} from "../src/pages/Auth/SignUp.jsx"
import {Home} from "../src/pages/Dashboard/Home.jsx"
import {Income} from "../src/pages/Dashboard/Income.jsx"
import {Expense} from "../src/pages/Dashboard/Expense.jsx"
import {Logout} from "../src/pages/Dashboard/Logout"
import userContext from './context/UserContext.jsx'
import {UserProvider} from './context/UserContext'
import {Toaster} from 'react-hot-toast' 

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

export const App = () => {
  return (
    <UserProvider>
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Root/>} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/signUp" element={<SignUp/>}/>
          <Route path="/dashboard" element={<Home/>}/>
          <Route path="/income" element={<Income/>}/>
          <Route path="/expense" element={<Expense/>}/>
          <Route path='/logout' element={<Logout/>}/>
        </Routes>
       
      </Router>  
    </div>

    <Toaster
      toastOptions={{
        className:'',
        style : {
          fontSize:'13px'
        }
      }}
    />
    </UserProvider>
  )
}



const Root = () =>{

  const isAuthenticated = !!localStorage.getItem("token");

  return isAuthenticated ? (
    <Navigate to="/dashboard"/>
  ):(
    <Navigate to="/login"/>
  );
}
