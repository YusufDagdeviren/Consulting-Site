import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query';
import { fetchUserDetail } from '../../api';
import { Formik } from 'formik';
import validations from './Validation';
import UpdateIcon from '@mui/icons-material/Update';
import DeleteIcon from '@mui/icons-material/Delete'
import { fetchUpdateUser } from '../../api';
import {
  Box,
  Typography,
  TextField,
  Button
} from '@mui/material';
function Profile() {
  const { userid } = useParams();
  const { isLoading, error, data } = useQuery(['user', userid], () => fetchUserDetail(userid))

  if (isLoading) {
    return <div> Loading...
    </div>
  }

  if (error) {
    return <div>{error.message}</div>
  }
  return (
    <Formik
      initialValues={{
        name: data.name,//required
        age: data.age,
        address: data.address,
        job: data.job,
        title: data.title
      }}
      onSubmit= {async (values) => {
        const userUpdateResponse = await fetchUpdateUser(userid,
          {
            name:values.name,
            age:values.age,
            address:values.address,
            job:values.job,
            title:values.title
          }
          )
          console.log(userUpdateResponse);
          window.location.href="/";
      }}
      validationSchema={validations}
    >
      {({ handleSubmit, handleBlur, handleChange, values, errors, touched }) => (
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <Typography variant='h2' sx={{ mb: 2 }}>
            Information Profile
          </Typography>
          <TextField
            error={Boolean(errors.name && touched.name)}
            label="Name"
            id="name"
            name='name'
            sx={{ width: "400px", mb: 2 }}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
            helperText={errors.name && touched.name && `${errors.name}`}
          />
          <TextField
            error={Boolean(errors.age && touched.age)}
            label="Age"
            id="age"
            name='age'
            sx={{ width: "400px", mb: 2 }}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.age}
            helperText={errors.age && touched.age && `${errors.age}`}
          />
          <TextField
            error={Boolean(errors.address && touched.address)}
            label="Address"
            id="address"
            name='address'
            sx={{ width: "400px", mb: 2 }}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.address}
            helperText={errors.address && touched.address && `${errors.address}`}
          />
          <TextField
            error={Boolean(errors.job && touched.job)}
            label="Job"
            id="job"
            name='job'
            sx={{ width: "400px", mb: 2 }}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.job}
            helperText={errors.job && touched.job && `${errors.job}`}
          />
          <TextField
            error={Boolean(errors.job && touched.job)}
            label="Introduce Yourself"
            id="outlined-multiline-static"
            rows={4}
            multiline
            name='title'
            sx={{ width: "400px", mb: 2 }}
            onChange={handleChange}
            onBlur={handleBlur}
            defaultValue={values.title}
            helperText={errors.title && touched.title && `${errors.title}`}
          />
        </Box>
        <Box sx={{display:"flex",justifyContent:"center" ,flexDirection:"row"}}>
          <Button
            size="large"
            color="success"
            startIcon={<UpdateIcon />}
            variant="contained"
            type='submit'
            sx={{mr:1}}
          >
            <span>Update</span>
          </Button>
          <Button
            size="large"
            color='error'
            startIcon={<DeleteIcon />}
            variant="contained"
          >
            <span>Delete</span>
          </Button>
        </Box>
        
      </form>
      )}
      

    </Formik>
  )
}

export default Profile