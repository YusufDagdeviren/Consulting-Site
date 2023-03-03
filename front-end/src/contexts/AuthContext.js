import { createContext,useContext,useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const[loggedIn,setLoggedIn] = useState(false);
    const[token,setToken] = useState(localStorage.getItem("token") || null);

    const values = {
        loggedIn,
        setLoggedIn,
        token,
        setToken
    }
    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}
const useAuth = () => useContext(AuthContext);

export{
    AuthProvider,
    useAuth
}