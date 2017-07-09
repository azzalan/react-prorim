import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import axios from 'axios'

import { selectDialogAddIsOpen } from '../actions/index'

import FormDialog from './dialog_form'

import { addFiles, postData } from '../assets/functions'
import { add } from '../assets/strings'

class DialogAdd extends Component {
  addFiles = (formData) => addFiles(formData, this.props.fields)

  saveFiles = (formData, id) => {
    const config = {
      headers: { 'content-type': 'multipart/form-data' }
    }
    axios.put(this.props.modelUrl + 'file/' + id + '/', formData, config).then(
      this.props.fetchModelData
    ).catch(function (error) { alert(error) })
  }

  afterPostData = (response) => {
    const formData = new FormData()
    let hasFormData = this.addFiles(formData)
    if (hasFormData) this.saveFiles(formData, response.data.id)
    else this.props.fetchModelData()
  }

  submitForm = () => {
    const { modelUrl, filterData, formData } = this.props
    const data = {...formData, filter: {...filterData}}
    data['csrfmiddlewaretoken'] = '{{ csrf_token }}'
    postData(modelUrl, data, this.afterPostData)
    this.handleCloseDialog()
  }

  handleCloseDialog = () => this.props.selectDialogAddIsOpen(false)

  render () {
    return (
      <FormDialog
        {...this.props}
        dialogOpen={this.props.dialogAddIsOpen}
        handleCloseDialog={this.handleCloseDialog}
        submitForm={this.submitForm}
        title={this.props.title || add}
      />
    )
  }
}

DialogAdd.propTypes = {
  fields: PropTypes.array.isRequired,
  modelUrl: PropTypes.string.isRequired,
  fetchModelData: PropTypes.func.isRequired,
  title: PropTypes.string,
  // redux state
  dialogAddIsOpen: PropTypes.bool,
  formData: PropTypes.object,
  filterData: PropTypes.object,
  // redux actions
  selectDialogAddIsOpen: PropTypes.func.isRequired
}

function mapStateToProps (state) {
  return {
    dialogAddIsOpen: state.dialogAddIsOpen,
    formData: state.formData,
    filterData: state.filterData
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    selectDialogAddIsOpen: selectDialogAddIsOpen
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DialogAdd)
