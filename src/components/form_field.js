import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  FormsyDate,
  FormsyTime,
  FormsySelect,
  FormsyText,
  FormsyToggle
} from 'formsy-material-ui/lib'
import RaisedButton from 'material-ui/RaisedButton'
import Clear from 'material-ui/svg-icons/content/redo'
import MenuItem from 'material-ui/MenuItem'
import VMasker from 'vanilla-masker'
import TextField from 'material-ui/TextField'

import {
  getValueDotPath,
  setValueDotPath
} from '../assets/functions'
import { apiUrl } from '../assets/urls'
import { get } from '../assets/api_calls'

export default class formField extends Component {
  constructor (props) {
    super(props)
    this.state = {
      choices: [],
      value: null
    }
  }

  setValue = (formData) => {
    const { field } = this.props
    let value = getValueDotPath(field.accessor, formData)
    switch (field.type) {
    case 'date':
      value = value ? new Date(value) : undefined
      break
    case 'time':
      value = value ? new Date(value) : undefined
      break
    case 'dateWithClear':
      value = value ? new Date(value) : undefined
      break
    case 'choice':
      value = value ? value.id : undefined
      break
    default:
      break
    }
    this.setState({value})
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

  clearField = (field) => {
    const newFormData = {...this.props.formData}
    let setValue = null
    let dotPath = field.accessor
    setValueDotPath(dotPath, newFormData, setValue)
    this.props.selectFormData(newFormData, setValue, field)
  }

  updateFormData = (field, value) => {
    const newFormData = {...this.props.formData}
    let setValue = value
    let dotPath = field.accessor
    if (!newFormData.count) newFormData.count = 0
    newFormData.count++
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
    if (field.type === 'cpf') {
      setValue = VMasker.toPattern(setValue, '999.999.999-99')
    }
    setValueDotPath(dotPath, newFormData, setValue)
    this.props.selectFormData(newFormData, setValue, field)
  }

  saveChoices = (response) => this.setState({choices: response.data})

  fetchChoices = () => {
    get(
      apiUrl + this.props.field.choicesUrl,
      this.saveChoices,
      this.props.filterData
    )
  }

  componentWillMount = () => {
    if (this.props.field.type === 'choice') this.fetchChoices()
    this.setValue(this.props.formData)
  }

  componentWillReceiveProps = (nextProps) => {
    this.setValue(nextProps.formData)
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
          value={this.state.value}
          required={!field.optional}
          onChange={(e, value) => this.updateFormData(field, value)}
          disabled={this.props.disabled}
        />
      )
    case 'dateWithClear':
      return (
        <div className='flex'>
          <FormsyDate
            name={field.accessor}
            floatingLabelText={field.header}
            DateTimeFormat={styles.DateTimeFormat}
            locale='pt'
            value={this.state.value}
            required={!field.optional}
            onChange={(e, value) => this.updateFormData(field, value)}
            disabled={this.props.disabled}
          />
          <RaisedButton
            icon={<Clear />}
            onTouchTap={() => this.clearField(field)}
          />
        </div>
      )
    case 'time':
      return (
        <FormsyTime
          name={field.accessor}
          floatingLabelText={field.header}
          value={this.state.value}
          required={!field.optional}
          onChange={(e, value) => this.updateFormData(field, value)}
          disabled={this.props.disabled}
        />
      )
    case 'text':
      return (
        <FormsyText
          name={field.accessor}
          floatingLabelText={field.header}
          value={this.state.value}
          required={!field.optional}
          onChange={(e, value) => this.updateFormData(field, value)}
          disabled={this.props.disabled}
        />
      )
    case 'textArea':
      return (
        <FormsyText
          name={field.accessor}
          floatingLabelText={field.header}
          value={this.state.value}
          required={!field.optional}
          onChange={(e, value) => this.updateFormData(field, value)}
          multiLine
          rows={2}
          fullWidth
          disabled={this.props.disabled}
        />
      )
    case 'password':
      return (
        <FormsyText
          name={field.accessor}
          floatingLabelText={field.header}
          value={this.state.value}
          required={!field.optional}
          onChange={(e, value) => this.updateFormData(field, value)}
          type='password'
          disabled={this.props.disabled}
          />
      )
    case 'textNumber':
      return (
        <FormsyText
          name={field.accessor}
          validations='isNumeric'
          validationError={errorMessages.numericError}
          floatingLabelText={field.header}
          value={this.state.value}
          required={!field.optional}
          onChange={(e, value) => this.updateFormData(field, value)}
          disabled={this.props.disabled}
          />
      )
    case 'bool':
      return (
        <FormsyToggle
          name={field.accessor}
          label={field.header}
          style={styles.switchStyle}
          labelPosition='right'
          value={this.state.value}
          onChange={(e, value) => this.updateFormData(field, value)}
          disabled={this.props.disabled}
          />
      )
    case 'choice':
      return (
        <FormsySelect
          name={field.accessor}
          floatingLabelText={field.header}
          required={!field.optional}
          value={this.state.value}
          onChange={(e, value) => this.updateFormData(field, value)}
          disabled={this.props.disabled}
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
          disabled={this.props.disabled}
        />
      )
    default:
      return (
        <TextField
          name={field.accessor}
          floatingLabelText={field.header}
          value={this.state.value || ''}
          required={!field.optional}
          onChange={(e, value) => this.updateFormData(field, value)}
          disabled={this.props.disabled}
        />
      )
    }
  }
}

formField.propTypes = {
  field: PropTypes.object.isRequired,
  formData: PropTypes.object,
  filterData: PropTypes.object,
  selectFormData: PropTypes.func.isRequired,
  disabled: PropTypes.bool
}
