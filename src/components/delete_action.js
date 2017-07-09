import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FlatButton from 'material-ui/FlatButton'

export default class deleteAction extends Component {
  render () {
    if (this.props.enableDelete) {
      return (
        <FlatButton
          label='Excluir'
          primary
          onTouchTap={this.props.openConfirmDialog}
        />
      )
    }
    return null
  }
}

deleteAction.propTypes = {
  enableDelete: PropTypes.bool,
  openConfirmDialog: PropTypes.func.isRequired
}
