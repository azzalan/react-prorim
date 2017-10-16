import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  selectChoices,
  selectFilterData
} from '../../actions/index'

import ModelToolbar from '../model_toolbar'
import Filter from '../filter'
import DialogAlert from '../dialog_alert'
import DialogAddPacientesToTable from './dialog_add_pacientes_to_table'
import ToggleEstadiaCell from './ToggleEstadiaCell'
import TablePeriodo from './TablePeriodo'

import {
  setValueDotPath,
  fetchChoicesData
} from '../../assets/functions'
import { get } from '../../assets/api_calls'
import { turnoUrl, estadiaUrl } from '../../assets/urls'

import addPacienteUnique from './functions/addPacienteUnique'

class ContainerName extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tablesData: {},
      turnos: [],
      tableCols: [],
      extraPacientes: [],
      filterOpen: true,
      dialogAddOpen: false
    }
  }

  fetchTurnos = () => {
    get(turnoUrl, (r) => this.setState({turnos: r.data}))
  }

  buildCols = (filterData) => {
    let i = new Date(filterData.inicial)
    const dates = []
    const end = filterData.final
    const cols = []
    cols.push({
      header: 'Nome',
      accessor: 'paciente.nome',
      type: 'text'
    })
    while (i.getTime() <= end.getTime()) {
      const data = new Date(i)
      const string = new Intl.DateTimeFormat().format(data)
      const col = {
        header: string,
        accessor: string,
        clickable: true,
        render: row => (
          <span
          >
            <ToggleEstadiaCell
              row={row}
              data={data}
              fetchEstadias={this.fetchEstadias}
            />
          </span>
        )
      }
      dates.push(string)
      cols.push(col)
      i.setDate(i.getDate() + 1)
    }
    this.setState({tableCols: cols})
    return dates
  }

  buildPacientes = (estadias) => {
    const { extraPacientes } = this.state
    const pacientes = []
    extraPacientes.forEach((paciente) => {
      addPacienteUnique(pacientes, paciente)
    })
    estadias.forEach((estadia) => {
      addPacienteUnique(pacientes, estadia.paciente)
    })
    this.setState({pacientes})
    return pacientes
  }

  initiateTableData = (pacientes, dates) => {
    const { turnos } = this.state
    const tablesData = {}
    turnos.forEach((turno) => {
      tablesData[turno.id] = []
      pacientes.forEach((paciente) => {
        tablesData[turno.id].push({paciente})
      })
    })
    turnos.forEach((turno) => {
      tablesData[turno.id].forEach((row) => {
        row.periodo = turno.id
        dates.forEach((date) => {
          row[date] = 0
        })
      })
    })
    return tablesData
  }

  applyDates = (tablesData, estadias) => {
    estadias.forEach((estadia) => {
      const turno = estadia.secao.periodo.id
      tablesData[turno].forEach((row) => {
        if (row.paciente.id === estadia.paciente.id) {
          const date = new Intl.DateTimeFormat().format(new Date(estadia.secao.data))
          row[date] = estadia.id
        }
      })
    })
  }

  setTables = (r, filterData) => {
    const dates = this.buildCols(filterData)
    const pacientes = this.buildPacientes(r.data)
    const tablesData = this.initiateTableData(pacientes, dates)
    this.applyDates(tablesData, r.data)
    this.setState({tablesData})
  }

  fetchEstadias = (filterData) => {
    if (filterData) {
      const has = (prop) => (filterData.hasOwnProperty(prop))
      if (has('inicial') && has('final') && has('sala')) {
        get(estadiaUrl, (r) => this.setTables(r, filterData), filterData)
      }
    }
  }

  saveNewChoice = (field, data) => {
    let newChoices = this.props.choices ? {...this.props.choices} : {}
    setValueDotPath(field.accessor, newChoices, data)
    this.props.selectChoices(newChoices)
  }

  fetchChoices = (fields) => {
    fetchChoicesData(fields, this.props.filterData, this.saveNewChoice)
  }

  componentWillMount = () => {
    if (this.props.disableFilter) {
      this.setState({
        filterOpen: false
      })
    }
    this.fetchTurnos()
    if (this.props.filterFields) this.fetchChoices(this.props.filterFields)
  }

  componentWillReceiveProps = (n) => {
    if (this.props.filterData !== n.filterData) {
      this.fetchEstadias(n.filterData)
    }
  }

  componentDidUpdate = (pp, ps) => {
    if (this.state.extraPacientes !== ps.extraPacientes) {
      this.fetchEstadias(this.props.filterData)
    }
  }

  componentWillUnmount = () => {
    this.props.selectFilterData(null)
  }

  render () {
    const renderTablesPeriodos = () => (
      this.state.turnos.map((turno, index) => (
        <div key={index}>
          <TablePeriodo
            data={this.state.tablesData[turno.id]}
            cols={this.state.tableCols}
            title={turno.nome}
          />
        </div>
      ))
    )
    return (
      <div>
        <ModelToolbar
          modelTitle={this.props.title}
          handleOpenDialogAdd={() => this.setState({dialogAddOpen: true})}
          hideAddButton={this.props.disableAddButton}
          toogleFilter={this.toogleFilter}
          showFilterToggle={this.props.filterFields}
          tableCols={this.state.tableCols || []}
          data={this.state.data || []}
          hideArrow
        />
        <Filter
          filterOpen={this.state.filterOpen}
          filterFields={this.props.filterFields}
          choices={this.props.choices}
          disableInvalid={this.props.disableFilterInvalid}
          initialFilter={this.props.initialFilter}
        />
        {this.state.tableCols.length > 0 ? renderTablesPeriodos() : null}
        <DialogAddPacientesToTable
          dialogOpen={this.state.dialogAddOpen}
          handleCloseDialog={() => this.setState({dialogAddOpen: false})}
          extraPacientes={this.state.extraPacientes}
          selectExtraPacientes={(d) => this.setState({extraPacientes: d})}
        />
        <DialogAlert />
      </div>
    )
  }
}

ContainerName.propTypes = {
  title: PropTypes.string.isRequired,
  filterFields: PropTypes.array,
  disableAddButton: PropTypes.bool,
  disableFilter: PropTypes.bool,
  disableFilterInvalid: PropTypes.bool,
  initialFilter: PropTypes.object,
  // redux state
  filterData: PropTypes.object,
  choices: PropTypes.object,
  // redux actions
  selectChoices: PropTypes.func.isRequired,
  selectFilterData: PropTypes.func.isRequired
}

function mapStateToProps (state) {
  return {
    filterData: state.filterData,
    choices: state.choices
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    selectChoices,
    selectFilterData
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ContainerName)
