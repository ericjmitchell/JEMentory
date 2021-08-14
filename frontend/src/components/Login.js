import React from "react"
import { DataGrid } from '@material-ui/data-grid'
import { updatePerson } from '../store/people/personSlice'
import { connect } from "react-redux"
import ListHeader from './ListHeader'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      columns: [
        { field: 'email', headerName: 'Email', flex: 1 },
        { field: 'password', headerName: 'Password', width: 100 }
      ]
    }
  }

  setSelection(row) {
    console.log(row.data)
    this.props.onUpdate(row.data)
  }

  render() {
    return (
      <div className="login-wrapper">
        <h1>Please Log In</h1>
        <form>
          <label>
            <p>Username</p>
            <input type="text" />
          </label>
          <label>
            <p>Password</p>
            <input type="password" />
          </label>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    people: state.people,
    congress: state.congress
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdate: (person) => dispatch(updatePerson(person))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List)