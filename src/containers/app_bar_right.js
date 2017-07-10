import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import MenuItem from 'material-ui/MenuItem'
import IconMenu from 'material-ui/IconMenu'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import IconButton from 'material-ui/IconButton'

import { selectAuthToken, selectUserData } from '../actions/index'

import {
  logout,
  admin,
  consultor,
  enfermeiro,
  tecnico,
  visualizeAs
} from '../assets/strings'

class AppBarRight extends Component {
  handleLogout = () => {
    localStorage.removeItem('prorimToken')
    this.props.selectAuthToken(null)
    this.props.selectUserData(null)
  }

  handleVisualizeAs = (type) => {
    let userData = {...this.props.userData}
    userData.isAdmin = true
    userData.type = type
    this.props.selectUserData(userData)
  }

  buildVisualizeAs = () => {
    if (this.props.userData.type === admin || this.props.userData.isAdmin) {
      return (
        <div>
          <MenuItem
            primaryText={visualizeAs.admin}
            onTouchTap={() => this.handleVisualizeAs(admin)}
          />
          <MenuItem
            primaryText={visualizeAs.consultor}
            onTouchTap={() => this.handleVisualizeAs(consultor)}
          />
          <MenuItem
            primaryText={visualizeAs.enfermeiro}
            onTouchTap={() => this.handleVisualizeAs(enfermeiro)}
          />
          <MenuItem
            primaryText={visualizeAs.tecnico}
            onTouchTap={() => this.handleVisualizeAs(tecnico)}
          />
        </div>
      )
    }
  }

  render () {
    return (
      <IconMenu
        iconButtonElement={
          <IconButton><MoreVertIcon color='white' /></IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        {this.buildVisualizeAs()}
        <MenuItem primaryText={logout} onTouchTap={this.handleLogout} />
      </IconMenu>
    )
  }
}

AppBarRight.propTypes = {
  userData: PropTypes.object,
  // redux actions
  selectAuthToken: PropTypes.func.isRequired,
  selectUserData: PropTypes.func.isRequired
}

function mapStateToProps (state) {
  return {
    userData: state.userData
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    selectAuthToken,
    selectUserData
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AppBarRight)
