import { createContext,useContext,useState, useEffect } from "react";
import { fetchMe } from "../api";
const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const[loggedIn,setLoggedIn] = useState(localStorage.getItem("token") ? true:false);
    const[token,setToken] = useState(localStorage.getItem("token") || null);
    const[user,setUser] = useState(null);
    const [loading, setLoading] = useState(true)

    useEffect(() =>{
        (async ()=>{
            try {
                const me = await fetchMe();
                console.log(me);
                setToken(localStorage.getItem("token"));
                setLoggedIn(token ? true:false); 
                setUser(me)
                setLoading(false); 
            } catch (error) {
                setLoading(false);
            }
        })()
          
    },[])
    const Login = (responseData) => {
        setToken(responseData.token);
        localStorage.setItem("token",responseData.token);
        setLoggedIn(true);
    }
    const Logout = () => {
        setLoggedIn(false);
        localStorage.removeItem("token");
    }
    const values = {
        loggedIn,
        token,
        Login,
        Logout,
        user
    }
    if(loading){
        return <div>Loading....</div>
    }
    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}
const useAuth = () => useContext(AuthContext);

export{
    AuthProvider,
    useAuth
}