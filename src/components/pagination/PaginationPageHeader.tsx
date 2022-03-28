import { Grid } from '@mui/material'
import React, { ReactElement } from 'react'

type Props = {
  title: string
  children?: any
}

const PaginationPageHeader = (props: Props) => {
  const {title, children} = props;

  return (
    <header>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h1>{title}</h1>
        </Grid>
        {children}
      </Grid>
    </header>
  )
}

export default PaginationPageHeader