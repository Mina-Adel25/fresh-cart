import React from 'react'
import { Navigate } from 'react-router-dom'

export default function AuthRoute({children}) {

       if (localStorage.getItem("tok") !== null) {

        return <Navigate to="/home" />

    }
    
  return children 
}
