import React from 'react'
import Grid from '@material-ui/core/Grid'

export default function StyledListItemText(props) {
  return <Grid
    container
    direction="row"
    justify="flex-start"
    alignItems="center"
  >
    <Grid item xs={1}>
      <h1 className="App-light-weight">List</h1>
    </Grid>
    <Grid item xs={1}>
      <h1 className="App-light-weight">/</h1>
    </Grid>
    <Grid item xs={1}>
      <h1 className="App-text">{props.congress}</h1>
    </Grid>
  </Grid>
}