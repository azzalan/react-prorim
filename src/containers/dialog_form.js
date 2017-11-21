import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import Formsy from 'formsy-react'

import { selectGroupInputOpen } from '../actions/index'

import DeleteAction from '../components/delete_action'
import RowFormFields from '../components/row_form_fields'

class FormDialog extends Component {
  constructor (props) {
    super(props)
    this.state = {
      canSubmit: false,
      confirmDialogOpen: false
    }
  }

  enableButton = () => this.setState({canSubmit: true})

  disableButton = () => this.setState({canSubmit: false})

  handleCloseConfirm = () => this.setState({confirmDialogOpen: false})

  handleDelete = () => {
    this.handleCloseConfirm()
    this.props.deleteAction()
  }

  openConfirmDialog = () => { this.setState({confirmDialogOpen: true}) }

  notifyFormError = (data) => {
    console.error('Form error:', data)
  }

  componentDidMount = () => {
    this.props.selectGroupInputOpen({})
  }

  render () {
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
      />
    ]
    const deleteAction = (
      <DeleteAction
        enableDelete={this.props.enableDelete}
        openConfirmDialog={this.openConfirmDialog}
      />
    )
    const saveAction = (
      <FlatButton
        label='Salvar'
        primary
        keyboardFocused
        disabled={!this.state.canSubmit || this.props.sending}
        onTouchTap={() => { this.refs.form.submit() }}
      />
    )
    if (!this.props.disabled) {
      if (!this.props.disableDelete) actions.push(deleteAction)
      actions.push(saveAction)
    }
    return (
      <div>
        <Dialog
          title={this.props.title}
          actions={actions}
          modal={false}
          autoScrollBodyContent
          open={this.props.dialogOpen || false}
          onRequestClose={this.props.handleCloseDialog}
        >
          <Formsy.Form
            onValid={this.enableButton}
            onInvalid={this.disableButton}
            onValidSubmit={this.props.submitForm}
            onInvalidSubmit={this.notifyFormError}
            ref='form'
          >
            <RowFormFields
              fields={this.props.fields}
              disabled={this.props.disabled}
            />
          </Formsy.Form>
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
  deleteAction: PropTypes.func,
  disableDelete: PropTypes.bool,
  enableDelete: PropTypes.bool,
  disabled: PropTypes.bool,
  submitForm: PropTypes.func.isRequired,
  dialogOpen: PropTypes.bool,
  handleCloseDialog: PropTypes.func.isRequired,
  fields: PropTypes.array,
  title: PropTypes.string.isRequired,
  sending: PropTypes.bool,
  // redux actions
  selectGroupInputOpen: PropTypes.func.isRequired
}

function mapStateToProps (state) {
  return {
    activeTableData: state.activeTableData
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    selectGroupInputOpen: selectGroupInputOpen
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FormDialog)
