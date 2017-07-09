import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

import { selectGroupInputOpen } from '../actions/index'

import DeleteAction from '../components/delete_action'
import Formsy from 'formsy-react'
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
      />,
      <DeleteAction
        enableDelete={this.props.enableDelete}
        openConfirmDialog={this.openConfirmDialog}
      />,
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
  enableDelete: PropTypes.bool,
  submitForm: PropTypes.func.isRequired,
  dialogOpen: PropTypes.bool,
  handleCloseDialog: PropTypes.func.isRequired,
  fields: PropTypes.array,
  title: PropTypes.string.isRequired,
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
