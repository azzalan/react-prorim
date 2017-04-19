import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import FormDialog from './form_dialog'
import { selectTableData } from '../actions/index'

class DialogAdd extends React.Component {

  submitForm = (data) => {
    this.props.selectTableData([...this.props.activeTableData, data])
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

export default connect(mapStateToProps, mapDispatchToProps)(DialogAdd)
