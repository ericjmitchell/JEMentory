import React from "react"
import { connect } from "react-redux"
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import MyListItemText from './MyListItemText'

class Info extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  firstName() {
    if (this.props.person && this.props.person.name) {
      return this.props.person.name.split(' ')[0]
    } else {
      return "Firstname"
    }
  }

  lastName() {
    if (this.props.person && this.props.person.name) {
      return this.props.person.name.split(' ')[1]
    } else {
      return "Lastname"
    }
  }

  district() {
    if (this.props.person && this.props.person.district) {
      return this.props.person.district
    } else {
      return "District"
    }
  }

  phone() {
    if (this.props.person && this.props.person.phone) {
      return this.props.person.phone
    } else {
      return "Phone"
    }
  }

  office() {
    if (this.props.person && this.props.person.office) {
      return this.props.person.office
    } else {
      return "Office"
    }
  }

  render() {
    return (
      <div style={{ height: 400, width: '100%' }}>
        <h1 style={{ fontWeight: 500 }}>Info</h1>
        <List>
          <ListItem style={{ padding: 0 }}>
            <MyListItemText primary={this.firstName()} />
          </ListItem>
          <ListItem style={{ padding: 0 }}>
            <MyListItemText primary={this.lastName()} />
          </ListItem>
          <ListItem style={{ padding: 0 }}>
            <MyListItemText primary={this.district()} />
          </ListItem>
          <ListItem style={{ padding: 0 }}>
            <MyListItemText primary={this.phone()} />
          </ListItem>
          <ListItem style={{ padding: 0 }}>
            <MyListItemText primary={this.office()} />
          </ListItem>
        </List>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { person: state.person }
}

export default connect(mapStateToProps)(Info)