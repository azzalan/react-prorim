import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Formsy from 'formsy-react'

import {
  selectFilterData,
  enableAddButton,
  disableAddButton
} from '../actions/index'

import FormField from '../components/form_field'

import { setValueDotPath } from '../assets/functions'

class Filter extends Component {
  updateFormData = (newFormData, value, field) => {
    if (field.type === 'choice') {
      setValueDotPath(field.accessor, newFormData, value)
    }
    this.props.selectFilterData(newFormData)
  }
  buildFields = () => {
    return this.props.filterFields.map((field, index) => (
      <div key={field.accessor + index}>
        <FormField
          field={field}
          formData={this.props.filterData}
          selectFormData={this.updateFormData}
        />
      </div>
    ))
  }

  buildForm = () => {
    if (this.props.filterFields && this.props.filterOpen) {
      const styleForm = {
        marginLeft: '1.5em',
        paddingBottom: 30
      }
      const { disableInvalid, disableAddButton } = this.props
      return (
        <Formsy.Form
          onValid={this.props.enableAddButton}
          onInvalid={disableInvalid ? undefined : disableAddButton}
          ref='filter_form'
          style={styleForm}
      >
          {this.buildFields()}
        </Formsy.Form>
      )
    }
  }

  componentWillMount = () => {
    if (this.props.initialFilter) {
      this.props.selectFilterData(this.props.initialFilter)
    }
  }

  componentWillUnmount = () => {
    this.props.enableAddButton()
  }

  render () {
    const styles = {
      wrapper: {background: 'rgba(0,0,0,0.04)'}
    }
    return (
      <div style={styles.wrapper}>
        {this.buildForm()}
      </div>
    )
  }
}

Filter.propTypes = {
  filterFields: PropTypes.array,
  filterOpen: PropTypes.bool.isRequired,
  disableInvalid: PropTypes.bool,
  initialFilter: PropTypes.object,
  // redux state
  filterData: PropTypes.object,
  // redux actions
  enableAddButton: PropTypes.func.isRequired,
  disableAddButton: PropTypes.func.isRequired,
  selectFilterData: PropTypes.func.isRequired
}

function mapStateToProps (state) {
  return {
    filterData: state.filterData
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    selectFilterData: selectFilterData,
    disableAddButton: disableAddButton,
    enableAddButton: enableAddButton
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter)
