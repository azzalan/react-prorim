import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import Snackbar from 'material-ui/Snackbar'

import { selectDialogEditIsOpen } from '../actions/index'

import FormDialog from './dialog_form'

import { addFiles, deleteDotPath, fixObjectsForSave } from '../assets/functions'
import { patch, putFiles, del } from '../assets/api_calls'
import { edit, loadingEdit } from '../assets/strings'

class DialogEdit extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loadingOpen: false
    }
  }

  afterSave = () => {
    this.setState({loadingOpen: false})
    this.props.fetchModelData()
  }

  afterPatch = () => {
    const formData = new FormData()
    const hasFormData = addFiles(formData, this.props.fields)
    const url = this.props.modelUrl + 'file/' + this.props.formData.id + '/'
    if (hasFormData) putFiles(url, formData, this.afterSave)
    else this.afterSave()
  }

  submitForm = () => {
    this.setState({loadingOpen: true})
    let { modelUrl, formData } = this.props
    const url = modelUrl + this.props.formData.id + '/'
    fixObjectsForSave(formData)
    this.props.fields.forEach((field) => {
      if (field.type === 'file') deleteDotPath(field.accessor, formData)
    })
    patch(url, formData, this.afterPatch)
    this.props.selectDialogEditIsOpen(false)
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
          deleteAction={this.deleteForm}
          submitForm={this.submitForm}
          title={this.props.title || edit}
        />
        <Snackbar
          open={this.state.loadingOpen}
          message={loadingEdit}
          autoHideDuration={10000}
          onRequestClose={() => this.setState({loadingOpen: false})}
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
