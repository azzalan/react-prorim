import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import Formsy from 'formsy-react'

import {
  selectDialogAddAgendamentosIsOpen,
  selectDialogAddAgendamentosData,
  selectFilterData,
  selectFormData
} from '../actions/index'

import CustomTable from '../components/table'
import RowFormFields from '../components/row_form_fields'

import { estadiaUrl } from '../assets/urls'
import { cancel, add, save } from '../assets/strings'
import { agendarFields, agendarCols } from '../assets/pacientes'
import { copyObject, postData } from '../assets/functions'

class DialogAddAgendamentos extends Component {
  constructor (props) {
    super(props)
    this.state = {
      addIsdisabled: true,
      agendarData: []
    }
  }

  enableButton = () => this.setState({addIsdisabled: false})

  disableButton = () => this.setState({addIsdisabled: true})

  updateTableData = (data) => {
    this.props.selectDialogAddAgendamentosData(data)
  }

  handleCloseDialog = () => {
    this.props.selectDialogAddAgendamentosIsOpen(false)
    this.setState({agendarData: []})
    this.props.selectFormData({})
  }

  saveAgendamentos = () => {
    this.state.agendarData.forEach(
      (data) => {
        data.paciente = this.props.filterData.paciente
        data.periodo = data.periodo.id
        data.sala = data.sala.id
        postData(estadiaUrl, data)
      }
    )
    this.handleCloseDialog()
  }

  // Adiconar conteúdo do form na tabela de elementos a adicionar.
  handleAddAgendarData = () => {
    let agendarData = [...this.state.agendarData]
    agendarData.unshift(copyObject(this.props.formData))
    this.setState({agendarData})
  }

  // Remove o elemento selecionado da lista toAdd.
  handleSelectlistToAdd = (rowInfo) => {
    let agendarData = [...this.state.agendarData]
    agendarData.splice(rowInfo.index, 1)
    this.setState({agendarData})
  }

  render () {
    const actions = [
      <FlatButton
        label={this.props.cancelText || cancel}
        primary
        onTouchTap={this.handleCloseDialog}
      />,
      <FlatButton
        label={this.props.saveText || save}
        primary
        keyboardFocused
        onTouchTap={this.saveAgendamentos}
      />
    ]
    return (
      <Dialog
        title={this.props.title}
        actions={actions}
        modal={false}
        autoScrollBodyContent
        open={this.props.dialogAddAgendamentosIsOpen || false}
        onRequestClose={this.handleCloseDialog}
      >
        <Formsy.Form
          onValid={this.enableButton}
          onInvalid={this.disableButton}
          ref='form'
      >
          <RowFormFields
            fields={agendarFields}
          />
        </Formsy.Form>
        <RaisedButton
          label={this.props.addText || add}
          primary
          onTouchTap={this.handleAddAgendarData}
          disabled={this.state.addIsdisabled}
        />
        <CustomTable
          data={this.state.agendarData}
          columns={agendarCols}
          pageSize={5}
          onRowTouchTap={this.handleSelectlistToAdd}
        />
      </Dialog>
    )
  }
}

DialogAddAgendamentos.propTypes = {
  title: PropTypes.string.isRequired,
  cancelText: PropTypes.string,
  addText: PropTypes.string,
  saveText: PropTypes.string,
  // redux state
  filterData: PropTypes.object,
  formData: PropTypes.object,
  dialogAddAgendamentosIsOpen: PropTypes.bool,
  dialogAddAgendamentosData: PropTypes.array,
  // redux actions
  selectDialogAddAgendamentosIsOpen: PropTypes.func.isRequired,
  selectDialogAddAgendamentosData: PropTypes.func.isRequired,
  selectFilterData: PropTypes.func.isRequired,
  selectFormData: PropTypes.func.isRequired
}

function mapStateToProps (state) {
  return {
    filterData: state.filterData,
    formData: state.formData,
    dialogAddAgendamentosIsOpen: state.dialogAddAgendamentosIsOpen,
    dialogAddAgendamentosData: state.dialogAddAgendamentosData
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    selectDialogAddAgendamentosIsOpen,
    selectDialogAddAgendamentosData,
    selectFilterData,
    selectFormData
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DialogAddAgendamentos)
