import React, { Component } from 'react'
import axios from 'axios'
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

class DialogListPacientes extends Component {
  fetchModelData = (filterData = this.props.filterData) => {
    axios.get(estadiaUrl, {
      params: {...filterData}
    }).then(
      this.updateTableData
    ).catch(function (error) {
      alert(error)
    })
  }

  updateTableData = (response) => {
    this.props.selectTableData(response.data)
  }

  handleSave = () => {
    const { listToAddData, filterData } = this.props
    listToAddData.forEach(
      (paciente, index) => {
        let data = {
          data: filterData.data,
          periodo: filterData.periodo,
          sala: filterData.sala,
          paciente: paciente.id
        }
        data['csrfmiddlewaretoken'] = '{{ csrf_token }}'
        axios.post(estadiaUrl, data).then(
          (response) => {
            if (index === listToAddData.length - 1) this.fetchModelData()
          }
        ).catch(function (error) { alert(error) })
      }
    )
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
