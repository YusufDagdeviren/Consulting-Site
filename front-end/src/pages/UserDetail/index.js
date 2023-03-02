import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query';
import { fetchUserDetail } from '../../api';
import {
  Container,
  Grid,
  Card,
  CardHeader,
  Avatar,
  CardMedia,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
} from '@mui/material';
import { red } from '@mui/material/colors';

function UserDetail() {
  const { userid } = useParams();
  const { isLoading, error, data } = useQuery(['user', userid], () => fetchUserDetail(userid))
  if (isLoading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>{`An error has occurred:  + ${error.message}`}</div>
  }
  console.log(data);
  return (
    <Container sx={{ marginTop: 2, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 2 }}>
      <Grid container>
        <Grid item xs={12} md={8} sx={{ display: "flex", justifyContent: "center" }}>
          <Card sx={{ maxWidth: 500, backgroundColor: "#093b58", color: "white" }}>
            <CardHeader
              color="white"
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  {data.name.charAt(0)}
                </Avatar>
              }
              title={data.name}
              subheader={data.job}
              subheaderTypographyProps={{ color: '#7aede4' }}
            />
            <CardMedia
              component={"img"}
              height="400"
              image='https://www.pngitem.com/pimgs/m/287-2876223_no-profile-picture-available-hd-png-download.png'
              alt='Profile Photo'
            />
            <CardContent>
              <Typography variant="body2" color="">
                {data.title}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <List sx={{ width: "100%", maxWidth: 360, backgroundColor: "#093b58", borderRadius: 1 }}>
            <ListItem alignItems='flex-start'>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  D
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="h6" gutterBottom color={"white"}>
                    12-02-2023
                  </Typography>
                }
                secondary={
                  <>
                    <Typography
                      sx={{ display: 'block' }}
                      component="span"
                      variant='body1'
                      color="white"
                    >
                      Örnek İsim
                    </Typography>
                    <Typography variant="caption" display="block" color={"white"} gutterBottom>
                      Örnek yorum metini
                    </Typography>
                  </>
                }
              >

              </ListItemText>
            </ListItem>
          </List>
          
        </Grid>
      </Grid>

    </Container>
  )
}

export default UserDetail