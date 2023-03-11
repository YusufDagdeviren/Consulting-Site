import React from 'react'
import { Box, TextField, Typography } from '@mui/material'
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';
import { useFormik } from 'formik'
import validations from './Validation';
import { fetchRegister } from '../../api';
import { useAuth } from '../../contexts/AuthContext';
function Signin() {
  const { Login } = useAuth();

  const { handleSubmit, handleBlur, handleChange, values, errors, touched } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: ""
    },
    onSubmit: async (values, bag) => {
      try {
        const registerResponse = await fetchRegister({name:values.name, email:values.email, password:values.password});
        Login(registerResponse);
        window.location.href="/";
      } catch (error) {
        bag.setErrors({general:error.response.data.message})
      }
    },
    validationSchema: validations
  })
  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", mt:3 }}>
        <Typography variant='h2' sx={{ mb: 2 }}>
          SingIn
        </Typography>

        <TextField
          error={Boolean(errors.name && touched.name)}
          label="Name"
          id="name"
          name="name"
          sx={{ width: "400px", mb: 2 }}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.name}
          helperText={errors.name && touched.name && `${errors.name}`}
        />
        <TextField
          error={Boolean(errors.email && touched.email)}
          label="Email"
          id="email"
          name="email"
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
          name="password"
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
          <span>SignIn</span>
        </LoadingButton>
      </Box>
    </form>
  )
}

export default Signin