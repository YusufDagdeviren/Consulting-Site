import { Link } from 'react-router-dom';
import styles from './styles.module.css'
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Typography
} from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import SvgIcon from '@mui/material/SvgIcon';

function Navbar() {
  
  function HomeIcon(props) {
    return (
      <SvgIcon {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </SvgIcon>
    );
  }
  const { loggedIn,Logout,user } = useAuth();
  return (
    <div>
      <AppBar position="static" >
        <Toolbar>
          <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginRight: "auto" }}>
            <Link to="/" className={styles.link}>
                <HomeIcon fontSize="large" />
              </Link>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: "center", marginLeft: "auto" }}>
            {
              !loggedIn && (
                <>
                  <Link to="/signin" className={styles.link}>
                    <Button variant='contained' color='success'>Signin</Button>
                  </Link>
                  <Link to="/login" className={styles.link}>
                    <Button variant="contained" color="success">Login</Button>
                  </Link>
                </>
              )
            }
            {
              loggedIn && (
                <>
                    <Button variant='contained' color='error' onClick={Logout}>Logout</Button>
                    <Link to={`/profile/${user._id}`} className={styles.link}>
                      <Button variant='contained' color="secondary">Profile</Button>
                    </Link>
                </>
              )
            }
          </Box>


        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;