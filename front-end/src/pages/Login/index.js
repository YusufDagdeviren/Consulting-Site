import { useState } from 'react'
import { Box, TextField, Typography, Alert, IconButton, Collapse } from '@mui/material'
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';
import { useFormik } from 'formik'
import validations from './Validation';
import { fetchLogin } from '../../api';
import { useAuth } from '../../contexts/AuthContext';
import CloseIcon from '@mui/icons-material/Close';
function Login() {
  const { Login } = useAuth();
  const [open, setOpen] = useState(true);
  const { handleSubmit, handleBlur, handleChange, values, errors, touched } = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    onSubmit: async (values, bag) => {
      try {
        setOpen(true)
        const loginResponse = await fetchLogin({ email: values.email, password: values.password });
        await Login(loginResponse);
        window.location.href = "/";
      } catch (error) {
        bag.setErrors({ general: error.response.data.message })
      }

    },
    validationSchema: validations
  })
  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", mt:3}}>
        <Typography variant='h2' sx={{ mb: 2 }}>
          Login
        </Typography>
        {errors.general && (
          <Box sx={{ mb: 2, width:"400px"}}>
            <Collapse in={open}>
              <Alert
                severity='error'
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                sx={{ mb: 2 }}
              >
                {errors.general}
              </Alert>
            </Collapse>
          </Box>
        )}
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