import React from 'react'
import Cards from '../../components/Card'
import { Container, Grid } from '@mui/material'
import {fetchUserList} from '../../api'
import { useQuery } from 'react-query'
function Home() {
  const { isLoading, error, data } = useQuery('users',fetchUserList)

  if (isLoading) {
    return <div>'Loading...'</div>
  }
  if (error) {
    return <div>'An error has occurred: ' + {error.message}</div>
  }
  return (
    <div>
      <Container sx={{ marginTop: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Grid container spacing={3}>
          {
            data.map((item, index) => <Cards data={item} key={index} />)
          }
        </Grid>
      </Container>

    </div>
  )
}

export default Home