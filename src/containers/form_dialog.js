import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import Toggle from 'material-ui/Toggle'
import Formsy from 'formsy-react'
import MenuItem from 'material-ui/MenuItem'
import { FormsyDate, FormsySelect, FormsyText, FormsyToggle } from 'formsy-material-ui/lib'

class FormDialog extends Component {
  constructor (props) {
    super(props)
    this.state = {
      canSubmit: false,
      confirmDialogOpen: false,
      optionalOpen: {}
    }
  }

  enableButton = () => this.setState({canSubmit: true})

  disableButton = () => this.setState({canSubmit: false})

  notifyFormError = (data) => {
    console.error('Form error:', data)
  }

  handleCloseConfirm = () => this.setState({confirmDialogOpen: false})

  handleDelete = () => {
    this.handleCloseConfirm()
    this.props.deleteAction()
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

  getValueInDepth = (dotPath, value) => {
    if (dotPath) return dotPath.split('.').reduce((o, i) => o[i], value)
  }

  getValue = (field) => {
    const {values} = this.props
    if (field.depth) {
      let dotPath = field.accessor.split('.')
      if (values[dotPath[0]]) {
        return this.getValueInDepth(field.accessor, values)
      }
    } else return values[field.accessor]
  }

  addFieldValue = (field) => {
    if (this.props.values) {
      let value = this.getValue(field)
      if (value) return {value}
    }
  }

  addFieldDateValue = (field) => {
    if (this.props.values) {
      let value = this.getValue(field)
      if (value) return {value: new Date(value)}
    }
  }

  addObjFieldValue = (field) => {
    if (this.props.values) {
      let value = this.getValue(field)
      if (value) return {value: value.id}
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
          locale='pt'
          {...this.addFieldDateValue(field)}
          />
      )
    case 'text':
      return (
        <FormsyText
          name={field.accessor}
          required
          floatingLabelText={field.header}
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
          {...this.addFieldValue(field)}
          />
      )
    case 'obj':
      return (
        <FormsySelect
          name={field.accessor}
          required
          floatingLabelText={field.header}
          {...this.addObjFieldValue(field)}
          >
          {this.buildChoices(field)}
        </FormsySelect>
      )
    default:
      break
    }
  }

  renderCheck = (field, index, fields, styles, errorMessages) => {
    if (!field.hideForm) {
      fields.push(
        <div key={field.accessor + index}>
          {this.buildField(field, styles, errorMessages)}
        </div>
        )
    }
  }

  optionalFieldToogle = (event, checked) => {
    let optionalOpen = {...this.state.optionalOpen}
    console.log(event.target)
    this.setState({optionalOpen})
  }

  buildFields = (tableCols, styles, errorMessages) => {
    let fields = []
    tableCols.map((field, index) => {
      if (field.columns) {
        let subFields = this.buildFields(field.columns, styles, errorMessages)
        if (field.optional) {
          const optionalToggle = [
            <Toggle
              name={field.accessor}
              key={'optional' + field.accessor}
              label={field.header}
              labelPosition='right'
              style={styles.switchStyle}
              toggled={this.state.optionalOpen[field.accessor]}
              onToggle={(event, checked) => {
                let optionalOpen = {...this.state.optionalOpen}
                optionalOpen[field.accessor] = checked
                this.setState({optionalOpen})
              }}
            />
          ]
          fields = [
            ...fields,
            ...optionalToggle
          ]
          if (this.state.optionalOpen[field.accessor]) {
            subFields = this.buildFields(field.columns, styles, errorMessages)
            fields = [
              ...fields,
              ...subFields
            ]
          }
        } else {
          subFields = this.buildFields(field.columns, styles, errorMessages)
          fields = [
            ...fields,
            ...subFields
          ]
        }
      } else {
        this.renderCheck(field, index, fields, styles, errorMessages)
      }
      return null
    })
    return fields
  }

  buildForm = (tableCols, styles, errorMessages) => {
    if (this.props.activeTableData) {
      return (
        <Formsy.Form
          onValid={this.enableButton}
          onInvalid={this.disableButton}
          onValidSubmit={this.props.submitForm}
          onInvalidSubmit={this.notifyFormError}
          ref='form'
      >
          {this.buildFields(tableCols, styles, errorMessages)}
        </Formsy.Form>
      )
    }
  }

  addDelete = () => {
    if (this.props.enableDelete) {
      return (
        <FlatButton
          label='Excluir'
          primary
          onTouchTap={() => { this.setState({confirmDialogOpen: true}) }}
      />
      )
    }
  }

  componentDidMount = () => {
    this.setState({
      open: this.props.dialogOpen
    })
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
      DateTimeFormat
    }
    const errorMessages = {
      wordsError: 'Por favor, use apenas letras.',
      numericError: 'Por favor, use apenas números.',
      urlError: 'Por favor, use uma URL válida.'
    }
    const confirmActions = [
      <FlatButton
        label='Cancelar'
        primary
        onTouchTap={this.handleCloseConfirm}
      />,
      <FlatButton
        label='Confirmar'
        primary
        keyboardFocused
        onTouchTap={this.handleDelete}
      />
    ]
    const actions = [
      <FlatButton
        label='Cancelar'
        primary
        onTouchTap={this.props.handleCloseDialog}
      />,
      this.addDelete(),
      <FlatButton
        label='Salvar'
        primary
        keyboardFocused
        disabled={!this.state.canSubmit}
        onTouchTap={() => { this.refs.form.submit() }}
      />
    ]

    return (
      <div>
        <Dialog
          title={this.props.title}
          actions={actions}
          modal={false}
          autoScrollBodyContent
          open={this.props.dialogOpen}
          onRequestClose={this.props.handleCloseDialog}
        >
          {this.buildForm(this.props.tableCols, styles, errorMessages)}
          <Dialog
            title='Confirmar'
            actions={confirmActions}
            modal={false}
            autoScrollBodyContent
            open={this.state.confirmDialogOpen}
            onRequestClose={this.handleCloseConfirm}
          >
            Tem certeza que deseja excluir esse elemento?
          </Dialog>
        </Dialog>
      </div>
    )
  }
}

FormDialog.propTypes = {
  choices: PropTypes.object,
  values: PropTypes.object,
  activeTableData: PropTypes.array,
  deleteAction: PropTypes.func,
  enableDelete: PropTypes.bool,
  submitForm: PropTypes.func.isRequired,
  dialogOpen: PropTypes.bool.isRequired,
  handleCloseDialog: PropTypes.func.isRequired,
  tableCols: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired
}

function mapStateToProps (state) {
  return {
    activeTableData: state.activeTableData
  }
}

export default connect(mapStateToProps)(FormDialog)
