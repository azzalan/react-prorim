import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import FormDialog from './form_dialog'
import { selectTableData } from '../actions/index'

class DialogEdit extends React.Component {

  submitForm = (data) => {
    let newTableData = [...this.props.activeTableData]
    newTableData[this.props.index] = data
    this.props.selectTableData(newTableData)
    this.props.handleCloseDialog()
  }

  render() {
    return (
      <FormDialog
        {...this.props}
        submitForm={this.submitForm}
      />
    )
  }
}

function mapStateToProps (state) {
  return {
    activeTableData: state.activeTableData
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ selectTableData: selectTableData }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DialogEdit)
