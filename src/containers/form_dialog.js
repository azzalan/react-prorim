import React from 'react'
import { connect } from 'react-redux'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import Formsy from 'formsy-react'
import MenuItem from 'material-ui/MenuItem'
import { FormsyDate, FormsySelect, FormsyText, FormsyToggle } from 'formsy-material-ui/lib';

class FormDialog extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      canSubmit: false,
      confirmDialogOpen: false,
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

  addFieldDateValue = (field) => {
    if(this.props.values) return {value: new Date(this.props.values[field.accessor])}
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
            {...this.addFieldDateValue(field)}
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
      case 'obj':
        return(
          <FormsySelect
            name={field.accessor}
            required
            floatingLabelText={field.header}
            value={2}
          >
            <MenuItem value={'1'} primaryText={'erro1'} key={1} />
            <MenuItem value={'2'} primaryText={'erro2'} key={2} />
            <MenuItem value={'3'} primaryText={'erro3'} key={3} />
          </FormsySelect>
        )
      default:
        break
    }
  }

  readOnlyCheck = (field, index, fields, styles, errorMessages) => {
      if (!field.readOnly) {
        fields.push(
          <div key={index}>
            {this.buildField(field, styles, errorMessages)}
          </div>
        )
      }
  }

  buildFields = (tableCols, styles, errorMessages) => {
    let fields = []
    tableCols.map( (field, index) => this.readOnlyCheck(field, index, fields, styles, errorMessages))
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

  addDelete = () => {
    if (this.props.enableDelete) {
      return (
      <FlatButton
        label="Excluir"
        primary={true}
        onTouchTap={()=>{this.setState({confirmDialogOpen: true})}}
      />
      )
    }
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
    const confirmActions = [
      <FlatButton
        label="Cancelar"
        primary={true}
        onTouchTap={this.handleCloseConfirm}
      />,
      <FlatButton
        label="Confirmar"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleDelete}
      />,
    ]
    const actions = [
      <FlatButton
        label="Cancelar"
        primary={true}
        onTouchTap={this.props.handleCloseDialog}
      />,
      this.addDelete(),
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
          title={this.props.title}
          actions={actions}
          modal={false}
          autoScrollBodyContent={true}
          open={this.props.dialogOpen}
          onRequestClose={this.props.handleCloseDialog}
        >
          {this.buildForm(this.props.tableCols, styles, errorMessages)}
          <Dialog
            title="Confirmar"
            actions={confirmActions}
            modal={false}
            autoScrollBodyContent={true}
            open={this.state.confirmDialogOpen}
            onRequestClose={this.handleCloseConfirm}
          >
            Tem certeza que deseja excluir esse elemento?
          </Dialog>
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

export default connect(mapStateToProps)(FormDialog)