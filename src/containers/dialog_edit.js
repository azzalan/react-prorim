import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'

import { selectDialogEditIsOpen } from '../actions/index'

import FormDialog from './dialog_form'

import { addFiles, deleteDotPath, fixObjectsForSave } from '../assets/functions'
import { patch, putFiles, del } from '../assets/api_calls'
import { edit } from '../assets/strings'

class DialogEdit extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  afterSave = () => {
    this.props.selectDialogEditIsOpen(false)
    this.props.fetchModelData()
  }

  afterPatch = () => {
    const formData = new FormData()
    const hasFormData = addFiles(formData, this.props.fields)
    const url = this.props.modelUrl + 'file/' + this.props.formData.id + '/'
    if (hasFormData) {
      putFiles(url, formData, this.afterSave)
    } else {
      this.afterSave()
    }
  }

  submitForm = () => {
    let { modelUrl, formData } = this.props
    const url = modelUrl + this.props.formData.id + '/'
    const saveData = fixObjectsForSave(formData)
    this.props.fields.forEach((field) => {
      if (field.type === 'file') deleteDotPath(field.accessor, saveData)
    })
    patch(url, saveData, this.afterPatch)
  }

  deleteForm = () => {
    const url = this.props.modelUrl + this.props.formData.id + '/'
    del(url, this.props.fetchModelData)
    this.props.selectDialogEditIsOpen(false)
  }

  render () {
    return (
      <div>
        <FormDialog
          {...this.props}
          dialogOpen={this.props.dialogEditIsOpen}
          handleCloseDialog={() => this.props.selectDialogEditIsOpen(false)}
          enableDelete
          disableDelete={this.props.disableDelete}
          deleteAction={this.deleteForm}
          submitForm={this.submitForm}
          title={this.props.title || edit}
          disabled={this.props.disabled}
        />
      </div>
    )
  }
}

DialogEdit.propTypes = {
  fields: PropTypes.array,
  modelUrl: PropTypes.string.isRequired,
  fetchModelData: PropTypes.func.isRequired,
  title: PropTypes.string,
  disabled: PropTypes.bool,
  disableDelete: PropTypes.bool,
  // redux state
  formData: PropTypes.object,
  dialogEditIsOpen: PropTypes.bool,
  // redux actions
  selectDialogEditIsOpen: PropTypes.func.isRequired
}

function mapStateToProps (state) {
  return {
    formData: state.formData,
    dialogEditIsOpen: state.dialogEditIsOpen
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    selectDialogEditIsOpen
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DialogEdit)
