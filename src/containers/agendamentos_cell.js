import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ListIcon from 'react-material-icons/icons/action/assignment'
import AddIcon from 'react-material-icons/icons/action/assignment-turned-in'
import DeleteIcon from 'react-material-icons/icons/action/highlight-off'

import {
  selectFilterData,
  selectDialogAgendamentosIsOpen,
  selectDialogAgendamentosData,
  selectDialogAddAgendamentosIsOpen
} from '../actions/index'

import { estadiaUrl } from '../assets/urls'
import { get, del } from '../assets/api_calls'

class AgendamentoCell extends Component {
  handleOpenDialogAgendamentos = () => {
    const paciente = this.props.row.row
    this.updateFilterData(paciente.id)
    this.props.selectDialogAgendamentosIsOpen(true)
  }

  handleOpenDialogAddAgendamentos = () => {
    const paciente = this.props.row.row
    this.updateFilterData(paciente.id)
    this.props.selectDialogAddAgendamentosIsOpen(true)
  }

  handleDeleteAgendamento = () => {
    const estadia = this.props.row.row
    this.handleDeleteInstance(estadia.id)
  }

  updateFilterData = (value) => {
    let data = {...this.props.filterData}
    data.paciente = value
    this.props.selectFilterData(data)
  }

  handleDeleteInstance = (index) => {
    del(estadiaUrl + index + '/', this.fetchModelData)
  }

  updateModelData = (response) => {
    let data = response.data
    let returnData = []
    data.forEach((estadia) => {
      if (estadia.secao) {
        let date = new Date(estadia.secao.data)
        date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0)
        let now = new Date()
        now = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0)
        if (date.getTime() >= now.getTime()) returnData.push(estadia)
      } else {
        console.log('Estadia não tem seção.')
      }
    })
    this.props.selectDialogAgendamentosData(returnData)
  }

  fetchModelData = () => {
    get(estadiaUrl, this.updateModelData, this.props.filterData)
  }

  render () {
    switch (this.props.type) {
    case 'list':
      return (
        <div className={'text-center'} id={this.props.row.id}>
          <ListIcon onTouchTap={this.handleOpenDialogAgendamentos} />
        </div>
      )
    case 'add':
      return (
        <div className={'text-center'} id={this.props.row.id}>
          <AddIcon onTouchTap={this.handleOpenDialogAddAgendamentos} />
        </div>
      )
    case 'remove':
      return (
        <div className={'text-center'} id={this.props.row.id}>
          <DeleteIcon onTouchTap={this.handleDeleteAgendamento} />
        </div>
      )
    default:
      return null
    }
  }
}

AgendamentoCell.propTypes = {
  row: PropTypes.object,
  type: PropTypes.string.isRequired,
  // redux state
  filterData: PropTypes.object,
  // redux actions
  selectFilterData: PropTypes.func.isRequired,
  selectDialogAgendamentosIsOpen: PropTypes.func.isRequired,
  selectDialogAgendamentosData: PropTypes.func.isRequired,
  selectDialogAddAgendamentosIsOpen: PropTypes.func.isRequired
}

function mapStateToProps (state) {
  return {
    filterData: state.filterData
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    selectDialogAgendamentosIsOpen,
    selectFilterData,
    selectDialogAgendamentosData,
    selectDialogAddAgendamentosIsOpen
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AgendamentoCell)
