import React from 'react'
import { Box, TextField, Typography } from '@mui/material'
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';

function Login() {
  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <Typography variant='h2'sx={{mb:2}}>
        Login
      </Typography>
      <TextField label="Email" id="email" sx={{ width: "400px",mb:2 }}/>
      <TextField label="Password" id="password" type={"password"} sx={{width:"400px",mb:2}}/>
      <LoadingButton
          size="large"
          color="success"
          startIcon={<SaveIcon />}
          variant="contained"
        >
          <span>Login</span>
        </LoadingButton>
    </Box>
  )
}

export default Login