import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import MenuItem from 'material-ui/MenuItem'
import IconMenu from 'material-ui/IconMenu'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import IconButton from 'material-ui/IconButton'

import { logout } from '../actions/index'

class AppBarRight extends Component {
  render () {
    return (
      <IconMenu
        iconButtonElement={
          <IconButton><MoreVertIcon /></IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem primaryText='Sair' onTouchTap={this.props.logout} />
      </IconMenu>
    )
  }
}

AppBarRight.propTypes = {
  logout: PropTypes.func.isRequired
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    logout: logout
  }, dispatch)
}

export default connect(mapDispatchToProps)(AppBarRight)
