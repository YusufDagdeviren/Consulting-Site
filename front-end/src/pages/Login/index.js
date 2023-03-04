import React from 'react'
import { Box, TextField, Typography } from '@mui/material'
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';
import { useFormik } from 'formik'
import validations from './Validation';
import { fetchLogin } from '../../api';
import { useAuth } from '../../contexts/AuthContext';
function Login() {
  const {Login} = useAuth();

  const { handleSubmit, handleBlur, handleChange, values, errors, touched } = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    onSubmit:async (values) => {
        const loginResponse = await fetchLogin({email:values.email, password:values.password});
        Login(loginResponse);
        window.location.href="/";
    },
    validationSchema: validations
  })
  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <Typography variant='h2' sx={{ mb: 2 }}>
          Login
        </Typography>
        <TextField
          error={Boolean(errors.email && touched.email)}
          label="Email"
          id="email"
          name='email'
          sx={{ width: "400px", mb: 2 }}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
          helperText={errors.email && touched.email && `${errors.email}`}

        />
        <TextField
          error={Boolean(errors.password && touched.password)}
          label="Password"
          id="password"
          name='password'
          type={"password"}
          sx={{ width: "400px", mb: 2 }}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
          helperText={errors.password && touched.password && `${errors.password}`}
        />
        <LoadingButton
          size="large"
          color="success"
          startIcon={<SaveIcon />}
          variant="contained"
          type='submit'
        >
          <span>Login</span>
        </LoadingButton>
      </Box>
    </form>
  )
}

export default Login