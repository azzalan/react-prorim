import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  FormsyDate,
  FormsyTime,
  FormsySelect,
  FormsyText,
  FormsyToggle
} from 'formsy-material-ui/lib'
import MenuItem from 'material-ui/MenuItem'

import {
  getValueDotPath,
  setValueDotPath,
  fetchData
} from '../assets/functions'
import { apiUrl } from '../assets/urls'

export default class formField extends Component {
  constructor (props) {
    super(props)
    this.state = {
      choices: []
    }
  }

  getDateValue = (field) => {
    const value = getValueDotPath(field.accessor, this.props.formData)
    return value ? new Date(value) : undefined
  }

  getChoiceValue = (field) => {
    const value = getValueDotPath(field.accessor, this.props.formData)
    return value ? value.id : undefined
  }

  buildChoices = (field) => {
    const { choices } = this.state
    if (choices) {
      return choices.map((choice, index) => {
        if (!choice.desativado) {
          return (
            <MenuItem
              value={choice.id}
              primaryText={getValueDotPath(field.show, choice)}
              key={index}
            />
          )
        }
        return null
      })
    }
    return null
  }

  updateFormData = (field, value) => {
    const newFormData = {...this.props.formData}
    let setValue = value
    let dotPath = field.accessor
    if (field.type === 'choice') {
      this.state.choices.forEach(
        (choice) => {
          if (setValue === choice.id) {
            let showValue = getValueDotPath(field.show, choice)
            setValueDotPath(dotPath + '.' + field.show, newFormData, showValue)
          }
        }
      )
      dotPath = dotPath + '.id'
    }
    if (field.type === 'date') {
      let date = new Date(value)
      let newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0)
      let oldValue = getValueDotPath(dotPath, this.props.formData)
      if (!oldValue) oldValue = new Date(0, 0, 0, 0, 0, 0, 0)
      setValue = new Date(oldValue)
      setValue.setDate(newDate.getDate())
      setValue.setMonth(newDate.getMonth())
      setValue.setFullYear(newDate.getFullYear())
    }
    if (field.type === 'time') {
      let date = new Date(value)
      let newDate = new Date(0, 0, 0, date.getHours(), date.getMinutes(), 0, 0)
      let oldValue = getValueDotPath(dotPath, this.props.formData)
      if (!oldValue) oldValue = new Date(0, 0, 0, 0, 0, 0, 0)
      setValue = new Date(oldValue)
      setValue.setMinutes(newDate.getMinutes())
      setValue.setHours(newDate.getHours())
    }
    setValueDotPath(dotPath, newFormData, setValue)
    this.props.selectFormData(newFormData, setValue, field)
  }

  saveChoices = (response) => this.setState({choices: response.data})

  fetchChoices = () => {
    fetchData(
      apiUrl + this.props.field.choicesUrl,
      this.props.filterData,
      this.saveChoices
    )
  }
  componentWillMount = () => {
    if (this.props.field.type === 'choice') this.fetchChoices()
  }

  render () {
    const IntlPolyfill = require('intl')
    let DateTimeFormat = IntlPolyfill.DateTimeFormat
    require('intl/locale-data/jsonp/pt-BR')
    const styles = {
      switchStyle: {
        marginTop: 25
      },
      DateTimeFormat
    }
    const errorMessages = {
      wordsError: 'Por favor, use apenas letras.',
      numericError: 'Por favor, use apenas números.',
      urlError: 'Por favor, use uma URL válida.'
    }
    const { field } = this.props
    switch (field.type) {
    case 'date':
      return (
        <FormsyDate
          name={field.accessor}
          floatingLabelText={field.header}
          DateTimeFormat={styles.DateTimeFormat}
          locale='pt'
          value={this.getDateValue(field)}
          required={!field.optional}
          onChange={(e, value) => this.updateFormData(field, value)}
        />
      )
    case 'time':
      return (
        <FormsyTime
          name={field.accessor}
          floatingLabelText={field.header}
          value={this.getDateValue(field)}
          required={!field.optional}
          onChange={(e, value) => this.updateFormData(field, value)}
        />
      )
    case 'text':
      return (
        <FormsyText
          name={field.accessor}
          floatingLabelText={field.header}
          value={getValueDotPath(field.accessor, this.props.formData)}
          required={!field.optional}
          onChange={(e, value) => this.updateFormData(field, value)}
          />
      )
    case 'textNumber':
      return (
        <FormsyText
          name={field.accessor}
          validations='isNumeric'
          validationError={errorMessages.numericError}
          floatingLabelText={field.header}
          value={getValueDotPath(field.accessor, this.props.formData)}
          required={!field.optional}
          onChange={(e, value) => this.updateFormData(field, value)}
          />
      )
    case 'bool':
      return (
        <FormsyToggle
          name={field.accessor}
          label={field.header}
          style={styles.switchStyle}
          labelPosition='right'
          value={getValueDotPath(field.accessor, this.props.formData)}
          onChange={(e, value) => this.updateFormData(field, value)}
          />
      )
    case 'choice':
      return (
        <FormsySelect
          name={field.accessor}
          floatingLabelText={field.header}
          required={!field.optional}
          value={this.getChoiceValue(field)}
          onChange={(e, value) => this.updateFormData(field, value)}
          >
          {this.buildChoices(field)}
        </FormsySelect>
      )
    case 'file':
      return (
        <input
          style={styles.switchStyle}
          id={field.accessor}
          type='file'
        />
      )
    default:
      return null
    }
  }
}

formField.propTypes = {
  field: PropTypes.object.isRequired,
  formData: PropTypes.object,
  filterData: PropTypes.object,
  selectFormData: PropTypes.func.isRequired
}
