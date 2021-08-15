import React from "react"
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { updatePeople } from '../store/people/peopleSlice'
import { updateCongress } from '../store/people/congressSlice'
import { getList } from '../services/people'
import { connect } from "react-redux"
import Alert from '@material-ui/lab/Alert'
import IconButton from '@material-ui/core/IconButton'
import Collapse from '@material-ui/core/Collapse'
import CloseIcon from '@material-ui/icons/Close'

class Selection extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      congressOptions: [
        'Representatives', 'Senators'
      ],
      statesOptions: ['AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'],
      selectedCongress: null,
      selectedState: null,
      open: false
    }
  }

  setOpen(value) {
    this.setState(state => ({
      ...state,
      open: value
    }))
  }

  congressChange(selector) {
    this.setState(state => ({
      ...state,
      selectedCongress: selector.value
    }))
  }

  stateChange(selector) {
    this.setState(state => ({
      ...state,
      selectedState: selector.value
    }))
  }

  submit() {
    if (this.state.selectedCongress && this.state.selectedState) {
      this.setOpen(false)
      getList(this.state.selectedCongress, this.state.selectedState).then((resp) => {
        this.props.onUpdateCongress(this.state.selectedCongress)
        this.props.onUpdatePeople(resp.results)
      })
    } else {
      this.setOpen(true)
    }
  }

  render() {
    return (
      <Grid
        container
        direction="row"
        alignItems="center"
        spacing={2}
      >

        <Grid item xs={3}>
          <Dropdown
            options={this.state.congressOptions}
            onChange={this.congressChange.bind(this)}
            placeholder="Select a congress house"
          />
        </Grid>
        <Grid item xs={2}>
          <Dropdown
            options={this.state.statesOptions}
            onChange={this.stateChange.bind(this)}
            placeholder="Select a state"
          />
        </Grid>
        <Grid item xs={2}>
          <Button variant="contained" color="primary" onClick={() => this.submit()}>
            Submit
        </Button>
        </Grid>
        <Grid item xs={8}>
          <Collapse in={this.state.open}>
            <Alert
              severity="warning"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    this.setOpen(false)
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              Must select congress house and state!
        </Alert>
          </Collapse>
        </Grid>
      </Grid>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdatePeople: (people) => dispatch(updatePeople(people)),
    onUpdateCongress: (congress) => dispatch(updateCongress(congress))
  }
}

export default connect(null, mapDispatchToProps)(Selection)