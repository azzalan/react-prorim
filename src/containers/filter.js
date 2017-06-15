import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import {
  selectFilterData,
  enableAddButton,
  disableAddButton
} from '../actions/index'

import Formsy from 'formsy-react'
import MenuItem from 'material-ui/MenuItem'
import { FormsyDate, FormsySelect, FormsyText, FormsyToggle } from 'formsy-material-ui/lib'

class Filter extends Component {
  constructor (props) {
    super(props)
    this.state = {
      newFilter: false
    }
  }

  buildChoices = (field) => {
    let returnChoices = []
    const {choices} = this.props
    if (choices) {
      let fieldChoices = choices[field.accessor]
      if (choices[field.accessor]) {
        fieldChoices.map((choice, index) => {
          if (!choice.desativado) {
            returnChoices.push(
              <MenuItem
                value={choice['id']}
                primaryText={choice[field.show]}
                key={index}
            />
          )
          }
          return null
        })
      }
    }
    return returnChoices
  }

  updateTableData = () => {
    if (this.state.newFilter) {
      this.props.fetchTableData()
      this.setState({newFilter: false})
    }
  }

  updateFilterData = (type, accessor, value) => {
    let data = {...this.props.filterData}
    data[accessor] = value
    this.props.selectFilterData(data)
    this.setState({newFilter: true})
  }

  getValue = (field) => {
    return this.props.filterData[field.accessor]
  }

  addFieldValue = (field) => {
    if (this.props.filterData) {
      let value = this.getValue(field)
      if (value) return {value}
    }
  }

  buildField = (field, styles, errorMessages) => {
    switch (field.type) {
    case 'date':
      return (
        <FormsyDate
          name={field.accessor}
          required
          floatingLabelText={field.header}
          DateTimeFormat={styles.DateTimeFormat}
          container='inline'
          locale='pt'
          onChange={(e, value) => this.updateFilterData(field.type, field.accessor, value)}
          {...this.addFieldValue(field)}
          />
      )
    case 'text':
      return (
        <FormsyText
          name={field.accessor}
          required
          floatingLabelText={field.header}
          onChange={(e, value) => this.updateFilterData(field.type, field.accessor, value)}
          {...this.addFieldValue(field)}
          />
      )
    case 'textNumber':
      return (
        <FormsyText
          name={field.accessor}
          validations='isNumeric'
          validationError={errorMessages.numericError}
          floatingLabelText={field.header}
          onChange={(e, value) => this.updateFilterData(field.type, field.accessor, value)}
          {...this.addFieldValue(field)}
          />
      )
    case 'bool':
      return (
        <FormsyToggle
          name={field.accessor}
          label={field.header}
          style={styles.switchStyle}
          labelPosition='right'
          onChange={(e, value) => this.updateFilterData(field.type, field.accessor, value)}
          {...this.addFieldValue(field)}
          />
      )
    case 'obj':
      return (
        <FormsySelect
          name={field.accessor}
          required
          floatingLabelText={field.header}
          onChange={(e, value) => this.updateFilterData(field.type, field.accessor, value)}
          {...this.addFieldValue(field)}
          >
          {this.buildChoices(field)}
        </FormsySelect>
      )
    default:
      break
    }
  }

  buildFields = (tableCols, styles, errorMessages) => {
    let fields = []
    tableCols.forEach((field, index) => {
      if (field.columns) {
        let subFields = this.buildFields(field.columns, styles, errorMessages)
        fields = [...fields, ...subFields]
      } else {
        if (field.filter) {
          fields.push(
            <div key={field.accessor + index}>
              {this.buildField(field, styles, errorMessages)}
            </div>
        )
        }
      }
    })
    return fields
  }

  buildForm = (tableCols, styles, errorMessages) => {
    if (this.props.filterOpen) {
      return (
        <Formsy.Form
          onValid={this.props.enableAddButton}
          onInvalid={this.props.disableAddButton}
          ref='filter_form'
          style={styles.form}
      >
          {this.buildFields(tableCols, styles, errorMessages)}
        </Formsy.Form>
      )
    }
  }

  componentDidMount = () => {
    this.props.selectFilterData(null)
  }

  componentDidUpdate = () => {
    this.updateTableData()
  }

  componentWillUnmount = () => {
    this.props.enableAddButton()
  }

  render () {
    const IntlPolyfill = require('intl')
    let DateTimeFormat = IntlPolyfill.DateTimeFormat
    require('intl/locale-data/jsonp/pt-BR')
    const styles = {
      switchStyle: {
        marginTop: 25
      },
      submitStyle: {
        marginTop: 32
      },
      DateTimeFormat,
      form: {
        marginLeft: '1.5em',
        paddingBottom: 30
      },
      wrapper: {background: 'rgba(0,0,0,0.04)'}
    }
    const errorMessages = {
      wordsError: 'Por favor, use apenas letras.',
      numericError: 'Por favor, use apenas números.',
      urlError: 'Por favor, use uma URL válida.'
    }
    return (
      <div style={styles.wrapper}>
        {this.buildForm(this.props.tableCols, styles, errorMessages)}
      </div>
    )
  }
}

Filter.propTypes = {
  choices: PropTypes.object.isRequired,
  filterData: PropTypes.object,
  selectFilterData: PropTypes.func.isRequired,
  fetchTableData: PropTypes.func.isRequired,
  filterOpen: PropTypes.bool.isRequired,
  enableAddButton: PropTypes.func,
  disableAddButton: PropTypes.func,
  tableCols: PropTypes.array.isRequired
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
