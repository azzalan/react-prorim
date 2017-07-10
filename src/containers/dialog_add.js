import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import Snackbar from 'material-ui/Snackbar'

import { selectDialogAddIsOpen } from '../actions/index'

import FormDialog from './dialog_form'

import { addFiles, fixObjectsForSave } from '../assets/functions'
import { post, putFiles } from '../assets/api_calls'
import { add, loadingAdd } from '../assets/strings'

class DialogAdd extends Component {
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

  afterPost = (response) => {
    const formData = new FormData()
    const hasFormData = addFiles(formData, this.props.fields)
    const url = this.props.modelUrl + 'file/' + response.data.id + '/'
    if (hasFormData) putFiles(url, formData, this.afterSave)
    else this.afterSave()
  }

  submitForm = () => {
    this.setState({loadingOpen: true})
    const { modelUrl, filterData, formData } = this.props
    fixObjectsForSave(formData)
    const data = {...formData, filter: {...filterData}}
    post(modelUrl, data, this.afterPost)
    this.props.selectDialogAddIsOpen(false)
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
        />
        <Snackbar
          open={this.state.loadingOpen}
          message={loadingAdd}
          autoHideDuration={10000}
          onRequestClose={() => this.setState({loadingOpen: false})}
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
