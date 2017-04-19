import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import Formsy from 'formsy-react'
import MenuItem from 'material-ui/MenuItem'
import { FormsyDate, FormsySelect, FormsyText, FormsyToggle } from 'formsy-material-ui/lib';

import { selectTableData } from '../actions/index'

class FormDialog extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      canSubmit: false,
    }
  }

  enableButton = () => this.setState({canSubmit: true})

  disableButton = () => this.setState({canSubmit: false})

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

  addFieldValue = (field) => {
    if(this.props.values) return {value: this.props.values[field.accessor]}
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
            {...this.addFieldValue(field)}
          />
        )
      case 'choice':
        return(
          <FormsySelect
            name={field.accessor}
            required
            floatingLabelText={field.header}
            {...this.addFieldValue(field)}
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
            {...this.addFieldValue(field)}                                    
          />
        )
      case 'textNumber':
        return(
          <FormsyText
            name={field.accessor}
            validations="isNumeric"
            validationError={errorMessages.numericError}
            floatingLabelText={field.header}
            {...this.addFieldValue(field)}
          />
        )
      case 'bool':
        return(
          <FormsyToggle
            name={field.accessor}
            label={field.header}
            style={styles.switchStyle}
            labelPosition="right"
            {...this.addFieldValue(field)}            
          />
        )
      case 'id':
        return(
          <FormsyText
            name={field.accessor}
            validations="isNumeric"
            validationError={errorMessages.numericError}
            floatingLabelText={field.header}
            {...this.addFieldValue(field)}
          />
        )
      default:
        break
    }
  }

  addIdValue = () => {
    const {activeTableData, values} = this.props
    if(values) {
      return({value: values.id})
    } else {
      return({value: activeTableData[activeTableData.length-1].id+1})
    }
  }

  addIdField = (fields) => {
    fields.push(
      <div 
        key={'id'}
        hidden={true}
      >
        <FormsyText
          name={'id'}
          required
          floatingLabelText={'id'}
          {...this.addIdValue()}
        />
      </div>
    )
  }

  buildFields = (tableCols, styles, errorMessages) => {
    let fields = []
    this.addIdField(fields)
    tableCols.map( (field, index) => (
        fields.push(
          <div key={index}>
            {this.buildField(field, styles, errorMessages)}
          </div>
        )
    ))
    return fields
  }

  buildForm = (tableCols, styles, errorMessages) => {
    if (this.props.activeTableData) return (
      <Formsy.Form
        onValid={this.enableButton}
        onInvalid={this.disableButton}
        onValidSubmit={this.props.submitForm}
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
      wordsError: "Por favor, use apenas letras.",
      numericError: "Por favor, use apenas números.",
      urlError: "Por favor, use uma URL válida.",
    }
    const actions = [
      <FlatButton
        label="Cancelar"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Salvar"
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

function mapStateToProps (state) {
  return {
    activeTableData: state.activeTableData
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ selectTableData: selectTableData }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FormDialog)