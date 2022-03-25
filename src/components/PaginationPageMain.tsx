import { Grid } from '@mui/material'
import React from 'react'
import LoadingScreen from './LoadingScreen'

type Props = {
    children: any,
    noResultsMessage: string,
    isLoading: boolean
}

const PaginationPageMain = (props: Props) => {
    const {children, noResultsMessage, isLoading} = props;
  return (
      <main>
          <Grid container spacing={2}>
              {isLoading ?
                  <Grid item xs={12}>
                      <LoadingScreen isLoading={isLoading} />
                  </Grid>
                  : <Grid item xs={12}>
                      {children ? children : <p>{noResultsMessage}</p>}
                    </Grid>}
          </Grid>
      </main>
  )
}

export default PaginationPageMain