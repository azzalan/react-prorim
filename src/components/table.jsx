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
      dialogAddOpen: false,
      dialogEditOpen: false,
      dialogEditValues: null
    }
  }

  handleOpenDialogEdit = (e) => {
    this.setState({
      dialogEditValues: this.state.tableData[e.target.id],
      dialogEditOpen: true
    })
  }

  handleOpenDialogAdd = () => {
    this.setState({
      dialogAddOpen: true
    })
  }

 buildCols = (cols) => {
    let renderCols = cols
    renderCols.map( (col) => {
      if (col.type==='date') {
        Object.assign(col, {
          render: row => (
            <span 
              id={row.index}
              onTouchTap={this.handleOpenDialogEdit}
            >
              {row.value.toLocaleDateString()}
            </span>
          )
        })
      } else if (col.type==='bool') {
        Object.assign(col, {
          render: row => (
            <Toggle
              toggled={row.value}
            />)
        })
      }
    })
    return renderCols
  }

renderDialogEdit = () => {
  if (this.state.dialogEditValues) {
    console.log(this.state.dialogEditOpen)
    return (
      <DialogEdit
        dialogOpen={this.state.dialogEditOpen}
        handleCloseDialog={() => this.setState({dialogEditOpen: false})}
        tableCols={this.state.tableCols}
        values={this.state.dialogEditValues}
      />
    )
  }
}

  componentDidMount = () => {
    this.setState({
      tableCols: this.buildCols(staticTableCols),
      tableData: staticTableData,
    })
  }

  render() {
    var {tableData, tableCols} = this.state;
    return (
      <div>
        <TableToolbar 
          handleOpenDialogAdd={this.handleOpenDialogAdd}
        />
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
          dialogOpen={this.state.dialogAddOpen}
          handleCloseDialog={() => this.setState({dialogAddOpen: false})}
          tableCols={tableCols}
        />
        {this.renderDialogEdit()}
      </div>
    )
  }
}
