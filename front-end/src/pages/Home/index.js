import React from 'react'
import Cards from '../../components/Card'
import { Container, Grid, Box } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton';

import { fetchUserList } from '../../api'
import { useInfiniteQuery } from 'react-query'
function Home() {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery("users", fetchUserList, {
    getNextPageParam: (lastGroup, allGroups) => {
      const morePagesExist = lastGroup?.length === 12;
      if (!morePagesExist) {
        return;
      }
      return allGroups.length + 1;
    },

  })
  if (status === "loading") {
    return 'Loading....'
  }
  if (status === "error") {
    return 'An error has occurred: ' + error.message
  }
  console.log(data)
  return (
    <div>
      <Container sx={{ marginTop: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Grid container spacing={3}>
          {
            data.pages.map((group, i) => {
              return (
                <React.Fragment key={i}>
                  {
                    group.map((item,index) => {
                      return(
                        <Cards data={item} key={index} />
                      )
                    })
                  }
                </React.Fragment>
              )
            })
          }
        </Grid>  
      </Container>
      <Box sx={{display:"flex", justifyContent:"center",mt:2,mb:2}}>
        <LoadingButton
            variant='contained'
            sx={{display:"block"}}
            onClick={() => fetchNextPage()}
            loading={isFetchingNextPage}
            disabled={!hasNextPage || isFetchingNextPage}
          >
            {hasNextPage
                ? 'Load More'
                : 'Nothing more to load'}
          </LoadingButton>
        </Box>  

    </div>
  )
}

export default Home