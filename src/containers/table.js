import React, { Component } from 'react'
import axios from 'axios'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
// import Toggle from 'material-ui/Toggle'
// import IconButton from 'material-ui/IconButton'
import CheckIcon from 'react-material-icons/icons/navigation/check'
import FileIcon from 'react-material-icons/icons/file/file-download'
import ReactTable from 'react-table'
import 'react-table/react-table.css'

import { selectTableData } from '../actions/index'

import DialogAdd from '../components/dialog_add'
import DialogEdit from '../components/dialog_edit'
import TableToolbar from './table_toolbar'
import Filter from './filter'
import { apiUrl } from '../assets/urls'

class CustomTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tableCols: [],
      choices: {},
      dialogAddOpen: false,
      dialogEditOpen: false,
      dialogEditValues: null,
      dialogEditIndex: null,
      dialogAddValues: null,
      filterOpen: true
    }
  }

  toogleFilter = () => {
    let filterOpen = !this.state.filterOpen
    this.setState({filterOpen})
  }

  handleOpenDialogEdit = (e) => {
    this.setState({
      dialogEditValues: this.props.activeTableData[e.target.id],
      dialogEditOpen: true,
      dialogEditIndex: e.target.id
    })
  }

  handleOpenDialogAdd = () => {
    this.setState({
      dialogAddOpen: true
    })
  }

  buildCell = (col, value, index) => {
    if (value) {
      switch (col.type) {
      case 'date':
        let date = new Date(value)
        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()
        let stringDate = day + '/' + month + '/' + year
        return stringDate
      case 'bool':
        if (value) {
          return (
            <div id={index} className={'text-center'}>
              <CheckIcon id={index} />
            </div>
          )
        }
        break
      case 'obj':
        return value[col.show]
      case 'file':
        return (
          <div id={index} className={'text-center'}>
            <a href={value} download><FileIcon /></a>
          </div>
        )
      default:
        return value
      }
    } else return null
  }

  deleteHidden = (cols) => {
    let returnCols = []
    cols.forEach((col, index) => {
      if (!col.hideTable) {
        returnCols.push(col)
      }
    })
    return returnCols
  }

  buildChoices = (cols) => {
    cols.forEach((col, index) => {
      if (col.columns) this.buildChoices(col.columns)
      else if (col.choicesUrl) {
        axios.get(apiUrl + col.choicesUrl).then(function (response) {
          let choices = {...this.state.choices}
          choices[col.accessor] = response.data
          this.setState({choices})
        }.bind(this)).catch(function (error) { alert(error) })
      }
    })
  }

  buildCols = (cols) => {
    const copyCols = JSON.parse(JSON.stringify(cols))
    let renderCols = this.deleteHidden(copyCols)
    renderCols.forEach((col, index) => {
      if (col.columns) {
        col.columns = this.buildCols(col.columns)
      } else {
        Object.assign(col, {
          render: row => (
            <span
              id={row.index}
              onTouchTap={this.handleOpenDialogEdit}
            >
              {this.buildCell(col, row.value, row.index)}
            </span>
          )
        })
      }
    })
    return renderCols
  }

  renderDialogEdit = () => {
    if (this.state.dialogEditValues) {
      return (
        <DialogEdit
          dialogOpen={this.state.dialogEditOpen}
          handleCloseDialog={() => this.setState({dialogEditOpen: false})}
          tableCols={this.props.tableCols}
          choices={this.state.choices}
          values={this.state.dialogEditValues}
          index={this.state.dialogEditIndex}
          tableUrl={this.props.tableUrl}
          fetchTableData={this.fetchTableData}
        />
      )
    }
  }

  renderTable = () => {
    if (this.props.activeTableData) {
      return (
        <ReactTable
          key='table'
          previousText={'Anterior'}
          nextText={'Próximo'}
          loadingText={'Carregando...'}
          noDataText={'Nenhum elemento encontrado'}
          pageText={'Página'}
          ofText={'de'}
          rowsText={'linhas'}
          data={this.props.activeTableData}
          columns={this.state.tableCols}
      />
      )
    }
  }

  fetchTableData = () => {
    axios.get(this.props.tableUrl, {
      params: {...this.props.filterData}
    }).then(
      this.updateTableData
    ).catch(function (error) {
      alert(error)
    })
  }

  updateTableData = (response) => {
    this.props.selectTableData(response.data)
  }

  componentDidMount = () => {
    this.setState({
      tableCols: this.buildCols(this.props.tableCols)
    })
    if (this.props.disableFilter) {
      this.setState({
        filterOpen: false
      })
    }
    this.fetchTableData()
    this.buildChoices(this.props.tableCols)
  }

  render () {
    const {choices} = this.state
    return (
      <div>
        <TableToolbar
          tableTitle={this.props.tableTitle}
          handleOpenDialogAdd={this.handleOpenDialogAdd}
          hideAddButton={this.props.disableAddButton}
          toogleFilter={this.toogleFilter}
          disableFilter={this.props.disableFilter}
        />
        <Filter
          filterOpen={this.state.filterOpen}
          tableCols={this.props.tableCols}
          choices={choices}
          fetchTableData={this.fetchTableData}
        />
        {this.renderTable()}
        <DialogAdd
          dialogOpen={this.state.dialogAddOpen}
          handleCloseDialog={() => this.setState({dialogAddOpen: false})}
          tableCols={this.props.tableCols}
          choices={choices}
          tableUrl={this.props.tableUrl}
          fetchTableData={this.fetchTableData}
          filterValues={this.props.filterData}
        />
        {this.renderDialogEdit()}
      </div>
    )
  }
}

CustomTable.propTypes = {
  activeTableData: PropTypes.array,
  tableCols: PropTypes.array.isRequired,
  disableAddButton: PropTypes.bool,
  disableFilter: PropTypes.bool,
  tableTitle: PropTypes.string.isRequired,
  tableUrl: PropTypes.string.isRequired,
  filterData: PropTypes.array,
  selectTableData: PropTypes.func.isRequired
}

function mapStateToProps (state) {
  return {
    activeTableData: state.activeTableData,
    filterData: state.filterData
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ selectTableData: selectTableData }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomTable)
