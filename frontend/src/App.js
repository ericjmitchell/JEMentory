import './App.css'
import Selection from './components/Selection'
import List from './components/List'
import Grid from '@material-ui/core/Grid'
import Info from './components/Info'

function App() {
  return (
    <div className="App">
      <Grid
        container
        spacing={2}
        direction="row"
        alignItems="center"
      >
      <Grid item xs={12}>
        <h1 className="App-header" >Who's My Representative?</h1>
      </Grid>
        <Grid item xs={12}>
          <Selection />
        </Grid>
        <Grid item xs={5}>
          <List />
        </Grid>
        <Grid item xs={5}>
          <Info />
        </Grid>
      </Grid>
    </div>
  )
}

export default App
