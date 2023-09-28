import { createContext, useEffect, useState } from 'react';
import { authReq } from '../requestMethods';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user") || null)
    );
    const login = async (inputs) => {
        const res = await authReq.post("/auth/login", inputs);
        setCurrentUser(res.data.userInfo);
        console.log(currentUser);
    };
    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);
    return (
        <AuthContext.Provider
          value={{currentUser, login}}
        >
            {children}
        </AuthContext.Provider>
    );
};