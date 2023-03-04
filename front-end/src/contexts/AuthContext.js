import { createContext,useContext,useState, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const[loggedIn,setLoggedIn] = useState(localStorage.getItem("token") ? true:false);
    const[token,setToken] = useState(localStorage.getItem("token") || null);
    useEffect(() =>{
        localStorage.setItem("token",token)
    },[token])
    const Login = (responseData) => {
        setLoggedIn(true);
        setToken(responseData.token);
    }
    const Logout = () => {
        setLoggedIn(false);
        localStorage.removeItem("token");
    }
    const values = {
        loggedIn,
        token,
        Login,
        Logout
    }
    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}
const useAuth = () => useContext(AuthContext);

export{
    AuthProvider,
    useAuth
}