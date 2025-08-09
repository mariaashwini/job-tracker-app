import { createContext, useState } from "react"

export const UserContext = createContext();

export default function UserProvider({children}){

    const [user,setUser] =useState(()=>{
        const loggedInUser = localStorage.getItem("loggedInUser");
        return loggedInUser ? JSON.parse(loggedInUser) : null;
    });

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem("loggedInUser",JSON.stringify(userData));
    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem("loggedInUser");
    }
    return (<UserContext.Provider value={{user,login,logout}}>
        {children}
    </UserContext.Provider>)
}