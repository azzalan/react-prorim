import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { selectTableData } from '../actions/index'

import {
  searchFormFields,
  searchListCols,
  listToAddCols
} from '../assets/pacientes'
import { pacienteUrl, estadiaUrl } from '../assets/urls'
import DialogList from '../components/dialog_list'
import { adicionarPacientes } from '../assets/strings'
import { get, post, defaultCatch } from '../assets/api_calls'

class DialogListPacientes extends Component {
  fetchModelData = () => {
    get(estadiaUrl, this.updateTableData, this.props.filterData)
  }

  updateTableData = (response) => {
    this.props.selectTableData(response.data)
  }

  catchSave = (error) => {
    this.fetchModelData()
    defaultCatch(error)
  }

  saveList = (list, index) => {
    const { filterData } = this.props
    const paciente = list[index]
    let data = {
      data: filterData.data,
      periodo: filterData.periodo,
      sala: filterData.sala,
      paciente: paciente.id
    }
    if (index === list.length - 1) {
      post(estadiaUrl, data, this.fetchModelData, this.catchSave)
    } else {
      const saveNext = () => this.saveList(list, index + 1)
      const catchNext = (error) => {
        defaultCatch(error)
        saveNext()
      }
      post(estadiaUrl, data, saveNext, catchNext)
    }
  }

  handleSave = () => {
    const { listToAddData } = this.props
    this.saveList(listToAddData, 0)
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

DialogListPacientes.propTypes = {
  handleCloseDialog: PropTypes.func.isRequired,
  dialogOpen: PropTypes.bool,
  // redux state
  filterData: PropTypes.object,
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

export default connect(mapStateToProps, mapDispatchToProps)(DialogListPacientes)
