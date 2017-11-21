import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'

import { selectDialogAddIsOpen } from '../actions/index'

import FormDialog from './dialog_form'

import { addFiles, fixObjectsForSave } from '../assets/functions'
import { post, putFiles } from '../assets/api_calls'
import { add } from '../assets/strings'

class DialogAdd extends Component {
  constructor (props) {
    super(props)
    this.state = {
      sending: false
    }
  }

  isSending = () => this.setState({sending: true})

  finishedSending = () => this.setState({sending: false})

  afterSave = () => {
    this.finishedSending()
    this.props.fetchModelData()
    this.props.selectDialogAddIsOpen(false)
  }

  afterPost = (response) => {
    const formData = new FormData()
    const hasFormData = addFiles(formData, this.props.fields)
    const url = this.props.modelUrl + 'file/' + response.data.id + '/'
    if (hasFormData) putFiles(url, formData, this.afterSave)
    else this.afterSave()
  }

  submitForm = () => {
    this.isSending()
    const { modelUrl, filterData, formData } = this.props
    const saveData = {...fixObjectsForSave(formData), filter: {...filterData}}
    post(modelUrl, saveData, this.afterPost)
  }

  render () {
    return (
      <div>
        <FormDialog
          {...this.props}
          dialogOpen={this.props.dialogAddIsOpen}
          handleCloseDialog={() => this.props.selectDialogAddIsOpen(false)}
          submitForm={this.submitForm}
          title={this.props.title || add}
          sending={this.state.sending}
        />
      </div>
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
