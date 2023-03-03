import React from 'react'
import {
  Avatar,
  Typography,
  ListItem,
  ListItemText,
  ListItemAvatar,
  
}
  from '@mui/material'
import { red } from '@mui/material/colors';

function Comments({data}) {
  return (
    <ListItem alignItems='flex-start'>
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
          D
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography variant="h6" gutterBottom color={"white"}>
            {new Date(data.commentDate).toLocaleDateString('tr-TR')}
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
              {data.commenterEmail}
            </Typography>
            <Typography variant="caption" display="block" color={"white"} gutterBottom>
              {data.commentText}
            </Typography>
          </>
        }
      >
      </ListItemText>
    </ListItem>


  )
}

export default Comments