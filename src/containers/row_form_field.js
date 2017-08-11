import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'

import { selectFormData } from '../actions/index'

import FormField from '../components/form_field'

class RowFormField extends Component {
  updateFormData = (newFormData, value, field) => {
    this.props.selectFormData(newFormData)
  }

  render () {
    return (
      <FormField
        field={this.props.field}
        formData={this.props.formData}
        filterData={this.props.filterData}
        selectFormData={this.updateFormData}
        disabled={this.props.disabled}
      />
    )
  }
}

RowFormField.propTypes = {
  field: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
  // redux state
  formData: PropTypes.object,
  filterData: PropTypes.object,
  // redux actions
  selectFormData: PropTypes.func.isRequired
}

function mapStateToProps (state) {
  return {
    formData: state.formData,
    filterData: state.filterData
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    selectFormData
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RowFormField)
