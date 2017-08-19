import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { selectTableData } from '../../actions/index'

import {
  searchFormFields,
  searchListCols,
  listToAddCols
} from '../../assets/pacientes'
import { pacienteUrl } from '../../assets/urls'
import DialogList from '../../components/dialog_list'
import { adicionarPacientes } from '../../assets/strings'
import { copyObject } from '../../assets/functions'

import addPacienteUnique from './functions/addPacienteUnique'

class DialogAddPacientesToTable extends Component {
  updateTableData = (response) => {
    this.props.selectTableData(response.data)
  }

  handleSave = () => {
    const { listToAddData, selectExtraPacientes } = this.props
    const list = copyObject(this.props.extraPacientes)
    listToAddData.forEach((paciente) => {
      addPacienteUnique(list, paciente)
    })
    selectExtraPacientes(list)
    this.props.handleCloseDialog()
  }

  render () {
    return (
      <DialogList
        modelUrl={pacienteUrl}
        dialogOpen={this.props.dialogOpen}
        handleCloseDialog={this.props.handleCloseDialog}
        handleSave={this.handleSave}
        title={adicionarPacientes}
        searchFormFields={searchFormFields}
        searchListCols={searchListCols}
        listToAddCols={listToAddCols}
      />
    )
  }
}

DialogAddPacientesToTable.propTypes = {
  extraPacientes: PropTypes.array,
  selectExtraPacientes: PropTypes.func.isRequired,
  handleCloseDialog: PropTypes.func.isRequired,
  dialogOpen: PropTypes.bool,
  // redux state
  listToAddData: PropTypes.array,
  // redux actions
  selectTableData: PropTypes.func.isRequired
}

function mapStateToProps (state) {
  return {
    listToAddData: state.listToAddData,
    filterData: state.filterData
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    selectTableData
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DialogAddPacientesToTable)
