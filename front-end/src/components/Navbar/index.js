import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.css'
import {
  AppBar,
  Toolbar,
  Button, 
  Box,
  Typography
} from '@mui/material';


function Navbar(){
  return (
    <div>
      <AppBar position="static" >
        <Toolbar>
          <Box sx={{display:"flex",justifyContent:"flex-end",alignItems:"center",marginRight:"auto"}}>
          <Link to="/" className={styles.link}>
             <Typography variant='h6'>
                Home
            </Typography>
          </Link>
          </Box>
          <Box sx={{display:'flex',justifyContent:'flex-end',alignItems:"center",marginLeft:"auto"}}>
            <Link to="/signin" className={styles.link}>
              <Button variant='contained' color='success'>Signin</Button>
            </Link>
            <Link to="/login" className={styles.link}>
              <Button variant="contained" color="success">Login</Button>
            </Link>
          </Box>


        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;