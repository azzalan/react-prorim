import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import AppBar from 'material-ui/AppBar'

import { selectMenuLeftOpen } from '../actions/index'

import AppBarRight from './app_bar_right'
import MenuLeft from './menu_left'
import Display from './display'
import { prorim } from '../assets/strings'

class Logged extends Component {
  handleToggle = () => this.props.selectMenuLeftOpen(!this.props.menuLeftOpen)

  render () {
    return (
      <div>
        <AppBar title={prorim}
          onLeftIconButtonTouchTap={this.handleToggle}
          iconElementRight={<AppBarRight />}
        />
        <MenuLeft />
        <Display />
      </div>
    )
  }
}

Logged.propTypes = {
  menuLeftOpen: PropTypes.bool,
  selectMenuLeftOpen: PropTypes.func.isRequired
}

function mapStateToProps (state) {
  return {
    menuLeftOpen: state.menuLeftOpen
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    selectMenuLeftOpen: selectMenuLeftOpen
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Logged)
