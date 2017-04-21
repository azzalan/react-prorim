import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Toggle from 'material-ui/Toggle'
// import IconButton from 'material-ui/IconButton'
// import EditIcon from 'react-material-icons/icons/editor/border-color'
import ReactTable from 'react-table'
import 'react-table/react-table.css'

import { selectTableData } from '../actions/index'

import DialogAdd from './dialog_add'
import DialogEdit from './dialog_edit'
import TableToolbar from '../components/table_toolbar'
// import {styles} from '../assets/styles'

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

  componentDidMount = () => {
    this.setState({
      tableCols: this.buildCols(this.props.tableCols),
    })
    this.props.selectTableData(this.props.tableData)
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
