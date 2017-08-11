import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import {
  selectTableData,
  selectGroupInputOpen,
  selectFormData,
  selectChoices,
  selectDialogAddIsOpen,
  selectDialogEditIsOpen,
  selectFilterData
} from '../actions/index'

import Table from '../components/table'
import DialogAdd from './dialog_add'
import DialogEdit from './dialog_edit'
import DialogAlert from './dialog_alert'
import ModelToolbar from './model_toolbar'
import Filter from './filter'

import {
  setValueDotPath,
  fetchChoicesData
} from '../assets/functions'
import { get } from '../assets/api_calls'

class ModelDisplayTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      filterOpen: true
    }
  }

  toogleFilter = () => {
    let filterOpen = !this.state.filterOpen
    this.setState({filterOpen})
  }

  handleOpenDialogEdit = (rowInfo) => {
    const {
      selectGroupInputOpen,
      selectFormData,
      selectDialogEditIsOpen,
      activeTableData
    } = this.props
    selectGroupInputOpen({})
    selectFormData(activeTableData[rowInfo.index])
    selectDialogEditIsOpen(true)
  }

  handleOpenDialogAdd = () => {
    const {
      selectGroupInputOpen,
      selectFormData,
      selectDialogAddIsOpen
    } = this.props
    selectGroupInputOpen({})
    selectFormData({})
    selectDialogAddIsOpen(true)
  }

  fetchChoices = (fields, filterData = this.props.filterData) => {
    fetchChoicesData()
  }

  saveNewChoice = (field, data) => {
    let newChoices = this.props.choices ? {...this.props.choices} : {}
    setValueDotPath(field.accessor, newChoices, data)
    this.props.selectChoices(newChoices)
  }

  fetchChoices = (fields, filterData = this.props.filterData) => {
    fetchChoicesData(fields, filterData, this.saveNewChoice)
  }

  fetchTableData = (filterData = this.props.filterData) => {
    get(this.props.tableUrl, this.updateTableData, filterData)
  }

  fetchModelData = () => {
    get(this.props.tableUrl, this.updateTableData, this.props.filterData)
  }

  updateTableData = (response) => {
    this.props.selectTableData(response.data)
  }

  componentWillMount = () => {
    if (this.props.disableFilter) {
      this.setState({
        filterOpen: false
      })
    }
    this.fetchModelData()
    if (this.props.filterFields) this.fetchChoices(this.props.filterFields)
  }

  componentWillUnmount = () => {
    this.props.selectFilterData(null)
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.filterData !== nextProps.filterData) {
      this.fetchTableData(nextProps.filterData)
    }
  }

  render () {
    const dialogAdd = (
      <DialogAdd
        fields={this.props.formFields}
        choices={this.state.choices}
        modelUrl={this.props.tableUrl}
        fetchModelData={this.fetchModelData}
      />
    )
    const dialogEdit = (
      <DialogEdit
        fields={this.props.formFields}
        choices={this.state.choices}
        modelUrl={this.props.tableUrl}
        fetchModelData={this.fetchModelData}
        disabled={this.props.disableEdit}
      />
    )
    return (
      <div>
        <ModelToolbar
          modelTitle={this.props.tableTitle}
          handleOpenDialogAdd={this.handleOpenDialogAdd}
          hideAddButton={this.props.disableAddButton}
          toogleFilter={this.toogleFilter}
          showFilterToogle={this.props.filterFields}
          tableCols={this.props.tableCols}
        />
        <Filter
          filterOpen={this.state.filterOpen}
          filterFields={this.props.filterFields}
          choices={this.state.choices}
          disableInvalid={this.props.disableFilterInvalid}
          initialFilter={this.props.initialFilter}
        />
        <Table
          data={this.props.activeTableData}
          columns={this.props.tableCols}
          onRowTouchTap={this.handleOpenDialogEdit}
        />
        {this.props.dialogAdd || dialogAdd}
        {this.props.dialogEdit || dialogEdit}
        <DialogAlert />
      </div>
    )
  }
}

ModelDisplayTable.propTypes = {
  tableCols: PropTypes.array.isRequired,
  formFields: PropTypes.array,
  filterFields: PropTypes.array,
  disableAddButton: PropTypes.bool,
  disableFilter: PropTypes.bool,
  disableFilterInvalid: PropTypes.bool,
  tableTitle: PropTypes.string.isRequired,
  tableUrl: PropTypes.string.isRequired,
  initialFilter: PropTypes.object,
  disableEdit: PropTypes.bool,
  // redux state
  activeTableData: PropTypes.array,
  filterData: PropTypes.object,
  choices: PropTypes.object,
  dialogAdd: PropTypes.any,
  dialogEdit: PropTypes.any,
  // redux actions
  selectTableData: PropTypes.func.isRequired,
  selectGroupInputOpen: PropTypes.func.isRequired,
  selectFormData: PropTypes.func.isRequired,
  selectChoices: PropTypes.func.isRequired,
  selectDialogEditIsOpen: PropTypes.func.isRequired,
  selectDialogAddIsOpen: PropTypes.func.isRequired,
  selectFilterData: PropTypes.func.isRequired
}

function mapStateToProps (state) {
  return {
    activeTableData: state.activeTableData,
    filterData: state.filterData,
    choices: state.choices
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    selectTableData,
    selectGroupInputOpen,
    selectFormData,
    selectChoices,
    selectDialogEditIsOpen,
    selectDialogAddIsOpen,
    selectFilterData
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ModelDisplayTable)
