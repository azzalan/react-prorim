import React from 'react'
import Toggle from 'material-ui/Toggle'
// import IconButton from 'material-ui/IconButton'
// import EditIcon from 'react-material-icons/icons/editor/border-color'
import ReactTable from 'react-table'
import 'react-table/react-table.css'

import DialogAdd from './dialog_add'
import DialogEdit from './dialog_edit'
import TableToolbar from './table_toolbar'
import {staticTableCols} from '../assets/static_table_cols'
import {staticTableData} from '../assets/static_table_data'
// import {styles} from '../assets/styles'

export default class CustomTable extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      tableCols: [],
      tableData: [],
      newTableData: [],
      dialogAddOpen: false,
      dialogEditOpen: false,
      dialogEditValues: null,
      dialogEditIndex: null,
      forceChange: false
    }
  }

  forceChange = () => {
    let forceChange = !this.state.forceChange
    this.setState({
      forceChange
    })
  }

  handleOpenDialogEdit = (e) => {
    this.setState({
      dialogEditValues: this.state.tableData[e.target.id],
      dialogEditOpen: true,
      dialogEditIndex: e.target.id
    })
  }

  handleOpenDialogAdd = () => {
    this.setState({
      dialogAddOpen: true
    })
  }

  buildCell = (type, value, index) => {
    switch(type) {
      case 'date':
        return value.toLocaleDateString()
      case 'bool':
        return (
          <Toggle
            id={index}
            onTouchTap={this.handleOpenDialogEdit}
            toggled={value}
          />
        )
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
            {this.buildCell(col.type, row.value, row.index)}
          </span>
        )
      })
    })
    return renderCols
  }

updateTableData = () => {
  let tableData = this.state.newTableData
  this.setState({tableData})
}

updateNewTableData = (newTableData) => this.setState({newTableData})

renderDialogEdit = () => {
  if (this.state.dialogEditValues) {
    return (
      <DialogEdit
        key='dialogEdit'
        dialogOpen={this.state.dialogEditOpen}
        handleCloseDialog={() => this.setState({dialogEditOpen: false})}
        tableCols={this.state.tableCols}
        tableData={this.state.tableData}
        values={this.state.dialogEditValues}
        index={this.state.dialogEditIndex}
        updateTableData={this.updateTableData}  
        updateNewTableData={this.updateNewTableData}
      />
    )
  }
}

  componentDidMount = () => {
    console.log('didmount')
    this.setState({
      tableCols: this.buildCols(staticTableCols),
      tableData: staticTableData,
    })
  }

  render() {
    var {tableData, tableCols} = this.state;
    console.log('table render')
    console.log(tableData)
    return (
      <div>
        <TableToolbar 
          handleOpenDialogAdd={this.handleOpenDialogAdd}
        />
        <div onTouchTap={this.forceChange}>a</div>
        <ReactTable
          previousText={'Anterior'}
          nextText={'Próximo'}
          loadingText={'Carregando...'}
          noDataText={'Nenhum elemento encontrado'}
          pageText={'Página'}
          ofText={'de'}
          rowsText={'linhas'}
          data={tableData}
          columns={tableCols}
        />
        <DialogAdd
          key='dialogAdd'
          dialogOpen={this.state.dialogAddOpen}
          handleCloseDialog={() => this.setState({dialogAddOpen: false})}
          tableCols={tableCols}
          tableData={tableData}
          updateTableData={tableData => this.setState({tableData})}
        />
        {this.renderDialogEdit()}
      </div>
    )
  }
}
