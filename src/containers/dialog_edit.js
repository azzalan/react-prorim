import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import axios from 'axios'

import { selectDialogEditIsOpen } from '../actions/index'

import FormDialog from './dialog_form'

import { addFiles, deleteDotPath } from '../assets/functions'
import { edit } from '../assets/strings'

class DialogEdit extends Component {
  addFiles = (formData) => addFiles(formData, this.props.fields)

  saveFiles = (formData) => {
    const config = {
      headers: { 'content-type': 'multipart/form-data' }
    }
    axios.put(this.props.modelUrl + 'file/' + this.props.formData.id + '/', formData, config).then(
      this.props.fetchModelData
    ).catch(function (error) { alert(error) })
  }

  submitForm = () => {
    const data = this.props.formData
    data['csrfmiddlewaretoken'] = '{{ csrf_token }}'
    const formData = new FormData()
    let hasFormData = this.addFiles(formData)
    for (let field in data) {
      if (data[field]) {
        if (data[field].id) {
          data[field + '_data'] = data[field]
          data[field] = data[field].id
        }
      }
    }
    this.props.fields.forEach((field) => {
      if (field.type === 'file') deleteDotPath(field.accessor, data)
    })
    axios.patch(this.props.modelUrl + this.props.formData.id + '/', data).then(
      () => {
        if (hasFormData) this.saveFiles(formData)
        else this.props.fetchModelData()
      }
    ).catch(function (error) { alert(error) })
    this.handleCloseDialog()
  }

  deleteForm = () => {
    axios.delete(this.props.modelUrl + this.props.formData.id + '/').then(
      this.props.fetchModelData
    ).catch(function (error) { alert(error) })
    this.handleCloseDialog()
  }

  handleCloseDialog = () => this.props.selectDialogEditIsOpen(false)

  render () {
    return (
      <FormDialog
        {...this.props}
        dialogOpen={this.props.dialogEditIsOpen}
        handleCloseDialog={this.handleCloseDialog}
        enableDelete
        deleteAction={this.deleteForm}
        submitForm={this.submitForm}
        title={this.props.title || edit}
      />
    )
  }
}

DialogEdit.propTypes = {
  fields: PropTypes.array,
  modelUrl: PropTypes.string.isRequired,
  fetchModelData: PropTypes.func.isRequired,
  title: PropTypes.string,
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
