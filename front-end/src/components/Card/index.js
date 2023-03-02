import React from 'react'
import { Grid, Card, CardContent, CardMedia, Typography, CardActionArea } from '@mui/material'
import { Link } from 'react-router-dom';
function Cards({ data }) {
  return (
    <Grid item xs={6} md={3}>
      <Link to={`/user/${data._id}`}>
        <CardActionArea>
          <Card sx={{ maxWidth: 345, minHeight: 360 }}>
            <CardMedia
              component="img"
              height="180"
              image="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {data.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {data.title}
              </Typography>
            </CardContent>

          </Card>
        </CardActionArea>
      </Link>
    </Grid>
  )
}

export default Cards