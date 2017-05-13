import React from 'react'
import axios from 'axios'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Toggle from 'material-ui/Toggle'
// import IconButton from 'material-ui/IconButton'
// import EditIcon from 'react-material-icons/icons/editor/border-color'
import ReactTable from 'react-table'
import 'react-table/react-table.css'

import { selectTableData } from '../actions/index'

import DialogAdd from '../components/dialog_add'
import DialogEdit from '../components/dialog_edit'
import TableToolbar from '../components/table_toolbar'

class CustomTable extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      tableCols: [],
      dialogAddOpen: false,
      dialogEditOpen: false,
      dialogEditValues: null,
      dialogEditIndex: null
    }
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
    switch(col.type) {
      case 'date':
        let date = new Date(value)
        let day = date.getDate()
        let month = date.getMonth()+1
        let year = date.getFullYear()
        let stringDate = day + '/' + month + '/' + year
        return stringDate
      case 'bool':
        return (
          <Toggle
            id={index}
            onTouchTap={this.handleOpenDialogEdit}
            toggled={value}
          />
        )
      case 'obj':
        return value[col.show]
      default:
        return value
    }
  }

  buildCols = (cols) => {
    let renderCols = cols
    renderCols.map( (col) => {
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
      return null
    })
    return renderCols
  }

  renderDialogEdit = () => {
    if (this.state.dialogEditValues) {
      return (
        <DialogEdit
          dialogOpen={this.state.dialogEditOpen}
          handleCloseDialog={() => this.setState({dialogEditOpen: false})}
          tableCols={this.state.tableCols}
          values={this.state.dialogEditValues}
          index={this.state.dialogEditIndex} 
          tableUrl={this.props.tableUrl}
          fetchTableData={this.fetchTableData}
        />
      )
    }
  }

  renderTable = () => {
    if(this.props.activeTableData) return (
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

  fetchTableData = () => {
    axios.get(this.props.tableUrl).then(
      this.updateTableData
    ).catch(function(error){
      alert(error)
    });
  }

  updateTableData = (response) => {
    this.props.selectTableData(response.data)
  }

  componentDidMount = () => {
    this.setState({
      tableCols: this.buildCols(this.props.tableCols),
    })
    // this.props.selectTableData(this.props.tableData)
    // fetch('http://127.0.0.1:8000/test.json', {}).then(function(response){
    //   console.log(response)
    // }).catch(function(err) {
    //   console.log(err)
    // })
    // post put get delete
    this.fetchTableData()
  }

  render() {
    const {tableCols} = this.state
    return (
      <div>
        <TableToolbar
          tableTitle={this.props.tableTitle}
          handleOpenDialogAdd={this.handleOpenDialogAdd}
          disableAddButton={this.props.disableAddButton}
        />
        {this.renderTable()}
        <DialogAdd
          dialogOpen={this.state.dialogAddOpen}
          handleCloseDialog={() => this.setState({dialogAddOpen: false})}
          tableCols={tableCols}
          tableUrl={this.props.tableUrl}
          fetchTableData={this.fetchTableData}
        />
        {this.renderDialogEdit()}
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    activeTableData: state.activeTableData
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ selectTableData: selectTableData }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomTable)
