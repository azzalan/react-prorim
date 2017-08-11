import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

import { selectAlertOpen, selectAlertMessages } from '../actions/index'

import { close } from '../assets/strings'

class DialogAlert extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  handleClose = () => {
    this.props.selectAlertOpen(false)
    this.props.selectAlertMessages([])
  }

  componentDidMount = () => {
  }

  render () {
    const actions = [
      <FlatButton
        label={close}
        primary
        onTouchTap={this.handleClose}
      />
    ]
    const messages = this.props.alertMessages || []
    const open = this.props.alertOpen || false
    return (
      <Dialog
        actions={actions}
        modal={false}
        open={open}
        onRequestClose={this.handleClose}
      >
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </Dialog>
    )
  }
}

DialogAlert.propTypes = {
  // redux state
  alertMessages: PropTypes.array,
  alertOpen: PropTypes.bool,
  // redux actions
  selectAlertOpen: PropTypes.func.isRequired,
  selectAlertMessages: PropTypes.func.isRequired
}

function mapStateToProps (state) {
  return {
    alertMessages: state.alertMessages,
    alertOpen: state.alertOpen
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    selectAlertOpen,
    selectAlertMessages
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DialogAlert)
