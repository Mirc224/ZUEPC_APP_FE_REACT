import { Grid, Typography } from '@mui/material'
import React from 'react'

type Props = {
    title: string,
    children: any
}

const ItemPreviewWithTitile = (props: Props) => {
    const {title, children} = props;
  return (
      <Grid container direction="column">
          <Grid item xs>
              <Typography component="h6" variant="h6">
                  {title}
              </Typography>
          </Grid>
          <Grid item xs>
              {children}
          </Grid>
      </Grid>
  )
}

export default ItemPreviewWithTitile