import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

import FormList from '../containers/form_list'
import { save, cancel } from '../assets/strings'

export default class DialogList extends Component {
  render () {
    const saveAction = (
      <FlatButton
        label={this.props.saveText || cancel}
        primary
        onTouchTap={this.props.handleCloseDialog}
      />
    )
    const cancelAction = (
      <FlatButton
        label={this.props.cancelText || save}
        primary
        keyboardFocused
        onTouchTap={this.props.handleSave}
      />
    )
    let actions = []
    if (!this.props.disableSave) actions.push(saveAction)
    if (!this.props.disableCancel) actions.push(cancelAction)
    return (
      <Dialog
        title={this.props.title}
        actions={actions}
        modal={false}
        autoScrollBodyContent
        open={this.props.dialogOpen || false}
        onRequestClose={this.props.handleCloseDialog}
      >
        <FormList
          modelUrl={this.props.modelUrl}
          searchFormFields={this.props.searchFormFields}
          searchListCols={this.props.searchListCols}
          listToAddCols={this.props.listToAddCols}
        />
      </Dialog>
    )
  }
}

DialogList.propTypes = {
  modelUrl: PropTypes.string.isRequired,
  dialogOpen: PropTypes.bool,
  handleCloseDialog: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  saveText: PropTypes.string,
  cancelText: PropTypes.string,
  searchFormFields: PropTypes.array,
  searchListCols: PropTypes.array,
  listToAddCols: PropTypes.array,
  disableSave: PropTypes.bool,
  disableCancel: PropTypes.bool
}
