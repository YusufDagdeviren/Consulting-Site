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
function Navbar() {
  const { loggedIn,Logout,user } = useAuth();
  return (
    <div>
      <AppBar position="static" >
        <Toolbar>
          <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginRight: "auto" }}>
            <Link to="/" className={styles.link}>
              <Typography variant='h6'>
                Home
              </Typography>
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