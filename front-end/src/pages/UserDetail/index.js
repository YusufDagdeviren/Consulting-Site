import { useState } from 'react'
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
  Divider,
  Box,
  TextField,
  Button,
  FormControl,
  Input,
  FormHelperText,
  LinearProgress
} from '@mui/material';
import Comments from '../../components/Comments';
import { red } from '@mui/material/colors';
import { useAuth } from '../../contexts/AuthContext';
import { fetchComment } from '../../api';
function UserDetail() {
  const { loggedIn,user } = useAuth();
  const { userid } = useParams();
  const [comment, setComment] = useState("");
  const handleComment = (e) => {
    setComment(e.target.value);
  }
   const  handleSubmit = async () => {
    const commentResponse = await fetchComment(userid,{commentText:comment});
  }
  const { isLoading, error, data } = useQuery(['user', userid], () => fetchUserDetail(userid))
  if (isLoading) {
    return(
      <Box sx={{ width: '100%' }}>
          <LinearProgress />
      </Box>
    )
  }
  if (error) {
    return <div>{`An error has occurred:  + ${error.message}`}</div>
  }
  return (
    <Container sx={{ marginTop: 2, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 2 }}>
      <Grid container sx={{ display: "flex" }}>
        <Grid item md={8} sx={{ display: "flex", justifyContent: "center" }}>
          <Card sx={{ maxWidth: 500, backgroundColor: "#1e71a2", color: "white" }}>
            <CardHeader
              color="white"
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  {data.name.charAt(0)}
                </Avatar>
              }
              title={
                <>
                  <Typography>
                    {data.name}
                  </Typography>
                  <Typography variant='body3'>
                    {data.address}
                  </Typography>
                </>

              }

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
              <Typography variant="body1" color="">
                {data.title}
              </Typography>
              <Typography variant='body3'>
                İletisim Bilgisi: {data.email}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={4} sx={{ marginTop: 1 }}>
          <Grid container >
            <Grid item xs={12}>
              <List sx={{ width: "100%", maxWidth: 360, backgroundColor: "#a24f1e", borderRadius: 2, flexGrow: 1 }}>
                {data.comments.map((item, index) => (
                  <Box key={index}>
                    <Comments data={item} />
                    <Divider variant="inset" component="li" sx={{ backgroundColor: "white" }} />
                  </Box>
                ))}
              </List>
            </Grid>
            <Grid item xs={12} sx={{ marginTop: 1, display: "flex", justifyContent: "left", alignItems: "center" }} >
              {loggedIn && user._id !==userid && (
                <>
                  <TextField id="outlined-basic" label="Yorum Yaz" variant="outlined" onChange={handleComment} value={comment} />
                  <Button variant="contained" sx={{ marginLeft: 1 }} onClick={handleSubmit}>Yorum</Button>
                </>
              )}
              {
                !loggedIn && (
                  <>
                    <FormControl disabled variant="standard">
                      <Input id="component-disabled" defaultValue="Please sign" />
                      <FormHelperText>Please sign in to post a comment</FormHelperText>
                    </FormControl>
                  </>
                )
              }

            </Grid>
          </Grid>
        </Grid>
      </Grid>

    </Container>
  )
}

export default UserDetail