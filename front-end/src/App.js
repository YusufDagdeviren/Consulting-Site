import './Reset.css';
import Navbar from './components/Navbar';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Home from './pages/Home';
import Signin from './pages/SignIn';
import Login from './pages/Login';
import UserDetail from './pages/UserDetail';
import Profile from './pages/Profile'
import Error404 from './pages/Error404';
import Admin from './pages/Admin';
import { useAuth } from './contexts/AuthContext';
function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path='/' element={<ProtectedRoutes/>}>
          <Route path ="/profile/:userid" element = {<Profile/>}/>
        </Route>
        <Route path = "/" element={<ProtectedAdminRoutes/>}>
          <Route path = "/admin" element = {<Admin/>}/>
        </Route>
        <Route path="/user/:userid" element={<UserDetail/>}/>
        <Route path="*" element={<Error404/>}/>
      </Routes>
    </>
  );
}
//
const ProtectedRoutes = () =>{
  const { loggedIn } = useAuth();
  return loggedIn ? <Outlet/>:<Navigate to="/signin"/>
}
const ProtectedAdminRoutes = () => {
  const { user,loggedIn } = useAuth();
  return loggedIn && user.authority === "admin" ? <Outlet/> : <Navigate to="/"/>
}

export default App;
