import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import GroupInputToggle from './group_input_toggle'
import RowFormField from '../containers/row_form_field'

import { getValueDotPath } from '../assets/functions'

class RowFormFields extends Component {
  renderCheck = (field, index, fields, styles, errorMessages) => {
    fields.push(
      <div key={field.accessor + index}>
        {this.buildField(field, styles, errorMessages)}
      </div>
    )
  }

  buildFields = (fields) => (
    fields.map((field, index) => {
      if (field.fields) {
        let fieldGroup = []
        fieldGroup.push(
          <GroupInputToggle
            field={field}
            key={'group' + index}
          />
        )
        if (getValueDotPath(field.accessor, this.props.groupInputOpen)) {
          fieldGroup.push(this.buildFields(field.fields))
        }
        return fieldGroup
      } else {
        return (
          <div key={field.accessor + index}>
            <RowFormField
              field={field}
              disabled={this.props.disabled}
            />
          </div>
        )
      }
    })
  )

  render () {
    const { fields } = this.props
    return <div>{this.buildFields(fields)}</div>
  }
}

RowFormFields.propTypes = {
  fields: PropTypes.array.isRequired,
  disabled: PropTypes.bool,
  // redux state
  groupInputOpen: PropTypes.object
}

function mapStateToProps (state) {
  return {
    groupInputOpen: state.groupInputOpen
  }
}

export default connect(mapStateToProps)(RowFormFields)
