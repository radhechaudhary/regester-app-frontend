import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

function Protected(prop) {
  if(prop.loggedIn){
    return <Outlet/>
  }
  else return <Navigate to="/login"/>;
}

export default Protected
