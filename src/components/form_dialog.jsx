import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Formsy from 'formsy-react';
import MenuItem from 'material-ui/MenuItem';
import { FormsyDate, FormsySelect, FormsyText, FormsyToggle } from 'formsy-material-ui/lib';

export default class FormDialog extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      canSubmit: false,
    }
  }

  enableButton = () => {
    this.setState({
      canSubmit: true,
    })
  }

  disableButton = () => {
    this.setState({
      canSubmit: false,
    })
  }

  submitForm = (data) => {
    console.log(data)
    // alert(JSON.stringify(data, null, 4))
  }

  notifyFormError = (data) => {
    console.error('Form error:', data)
  }

  handleClose = () => {
    this.props.handleCloseDialog()
  }

  buildChoices = (choices) => {
    let returnChoices = []
    choices.map( (choice, index) => (
      returnChoices.push(<MenuItem value={choice} primaryText={choice} key={index} />)
    ))
    return returnChoices
  }

  buildFieldWithValue = (field, styles, errorMessages) => {
    switch(field.type) {
      case 'date':
        return(
          <FormsyDate
            name={field.accessor}
            required
            floatingLabelText={field.header}
            DateTimeFormat={styles.DateTimeFormat}
            locale="pt"
            value={this.props.values[field.accessor]}
          />
        )
      case 'choice':
        return(
          <FormsySelect
            name={field.accessor}
            required
            floatingLabelText={field.header}
            value={this.props.values[field.accessor]}
          >
            {this.buildChoices(field.choices)}
          </FormsySelect>
        )
      case 'text':
        return(
          <FormsyText
            name={field.accessor}
            required
            floatingLabelText={field.header}
            value={this.props.values[field.accessor]}                                    
          />
        )
      case 'textNumber':
        return(
          <FormsyText
            name={field.accessor}
            validations="isNumeric"
            validationError={errorMessages.numericError}
            floatingLabelText={field.header}
            value={this.props.values[field.accessor]}
          />
        )
      case 'bool':
        return(
          <FormsyToggle
            name={field.accessor}
            label={field.header}
            style={styles.switchStyle}
            labelPosition="right"
            value={this.props.values[field.accessor]}            
          />
        )
      default:
        break
    }
  }

  buildField = (field, styles, errorMessages) => {
    switch(field.type) {
      case 'date':
        return(
          <FormsyDate
            name={field.accessor}
            required
            floatingLabelText={field.header}
            DateTimeFormat={styles.DateTimeFormat}
            locale="pt"
          />
        )
      case 'choice':
        return(
          <FormsySelect
            name={field.accessor}
            required
            floatingLabelText={field.header}
          >
            {this.buildChoices(field.choices)}
          </FormsySelect>
        )
      case 'text':
        return(
          <FormsyText
            name={field.accessor}
            required
            floatingLabelText={field.header}
          />
        )
      case 'textNumber':
        return(
          <FormsyText
            name={field.accessor}
            validations="isNumeric"
            validationError={errorMessages.numericError}
            floatingLabelText={field.header}
          />
        )
      case 'bool':
        return(
          <FormsyToggle
            name={field.accessor}
            label={field.header}
            style={styles.switchStyle}
            labelPosition="right"
          />
        )
      default:
        break
    }
  }

  buildFields = (tableCols, styles, errorMessages) => {
    let fields = []
    if (this.props.values) {
      tableCols.map( (field, index) => (
          fields.push(<div key={index}>{this.buildFieldWithValue(field, styles, errorMessages)}</div>)
      ))
    } else {
      tableCols.map( (field, index) => (
          fields.push(<div key={index}>{this.buildField(field, styles, errorMessages)}</div>)
      ))
    }
    return fields
  }

  buildForm = (tableCols, styles, errorMessages) => {
    return (
      <Formsy.Form
        onValid={this.enableButton}
        onInvalid={this.disableButton}
        onValidSubmit={this.submitForm}
        onInvalidSubmit={this.notifyFormError}
        ref="form"
      >
        {this.buildFields(tableCols, styles, errorMessages)}
      </Formsy.Form>
    )
  }

  componentDidMount = () => {
    this.setState({
      open: this.props.dialogOpen,
    })
  }
  

  render() {
    const IntlPolyfill = require('intl')
    let DateTimeFormat = IntlPolyfill.DateTimeFormat
    require('intl/locale-data/jsonp/pt-BR')
    const styles = {
      switchStyle: {
        marginTop: 25,
      },
      submitStyle: {
        marginTop: 32,
      },
      DateTimeFormat,
    }
    const errorMessages = {
      wordsError: "Please only use letters",
      numericError: "Please provide a number",
      urlError: "Please provide a valid URL",
    }
    const actions = [
      <FlatButton
        label="Cancelar"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Enviar"
        primary={true}
        keyboardFocused={true}
        disabled={!this.state.canSubmit}
        onTouchTap={() => {this.refs.form.submit()}}
      />,
    ]

    return (
      <div>
        <Dialog
          title="Dialog With Actions"
          actions={actions}
          modal={false}
          autoScrollBodyContent={true}
          open={this.props.dialogOpen}
          onRequestClose={this.handleClose}
        >
          {this.buildForm(this.props.tableCols, styles, errorMessages)}
        </Dialog>
      </div>
    );
  }
}