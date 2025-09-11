import React, { createContext, useEffect } from 'react'
import { useState } from 'react';
import LoderScren from '../components/LoderScren/LoderScren';
import { jwtDecode } from 'jwt-decode';

export const authcontext = createContext();
export default function AuthContextProvider({ children }) {

    const [Token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userData, setuserData] = useState(null);

    function decryptUserToken(params) {
        const res = jwtDecode(Token);
        setuserData(res)
    }

    useEffect(() => {
        if (Token) {
            decryptUserToken()
        }
    }, [Token])

    useEffect(() => {

        const Tkn = localStorage.getItem("tok");
        if (Tkn != null) {
            setToken(Tkn);

        }
        setLoading(false);

    }, []);

    if (loading) { return <LoderScren /> }
    
    return (
        <authcontext.Provider
            value={{
                Token,
                setToken,
                userData,

            }}>

            {children}

        </authcontext.Provider>
    )
}
