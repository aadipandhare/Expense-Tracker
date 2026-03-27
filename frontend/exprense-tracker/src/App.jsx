import React from 'react'
import {Login} from "../src/pages/Auth/Login.jsx"
import {SignUp} from "../src/pages/Auth/SignUp.jsx"
import {Home} from "../src/pages/Dashboard/Home.jsx"
import {Income} from "../src/pages/Dashboard/Income.jsx"
import {Expense} from "../src/pages/Dashboard/Expense.jsx"

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

export const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Root/>} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/signUp" element={<SignUp/>}/>
          <Route path="/dashboard" element={<Home/>}/>
          <Route path="/income" element={<Income/>}/>
          <Route path="/expense" element={<Expense/>}/>
        </Routes>
       
      </Router>  
    </div>
  )
}



const Root = () =>{

  const isAuthenticated = !!localStorage.getItem("token");

  return isAuthenticated ? (
    <Navigate to="/dashboard"/>
  ):(
    <Navigate to="</login>"/>
  );
}
