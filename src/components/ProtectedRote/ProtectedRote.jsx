import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'



export default function ProtectedRote({ children }) {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [children]);

    if (localStorage.getItem("tok") == null) {

        return <Navigate to="/Login" />

    }

    return children
}
