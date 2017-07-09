import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import axios from 'axios'
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
    axios.delete(estadiaUrl + index + '/').then(
      this.fetchModelData
    ).catch(function (error) { alert(error) })
  }

  updateModelData = (response) => {
    this.props.selectDialogAgendamentosData(response.data)
  }

  fetchModelData = () => {
    axios.get(estadiaUrl, {
      params: {...this.props.filterData}
    }).then(
      this.updateModelData
    ).catch(function (error) {
      alert(error)
    })
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
