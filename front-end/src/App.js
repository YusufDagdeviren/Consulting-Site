import './Reset.css';
import Navbar from './components/Navbar';
import { Routes,Route } from 'react-router-dom';
import Home from './pages/Home';
import Signin from './pages/SignIn';
import Login from './pages/Login';
import UserDetail from './pages/UserDetail';
import Profile from './pages/Profile'
function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path = "/profile/:userid" element = {<Profile/>}/>
        <Route path="/user/:userid" element={<UserDetail/>}/>
      </Routes>
    </>
  );
}

export default App;
