import React from 'react'
import axios from 'axios'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
// import Toggle from 'material-ui/Toggle'
// import IconButton from 'material-ui/IconButton'
import CheckIcon from 'react-material-icons/icons/navigation/check'
import ReactTable from 'react-table'
import 'react-table/react-table.css'

import { selectTableData } from '../actions/index'

import DialogAdd from '../components/dialog_add'
import DialogEdit from '../components/dialog_edit'
import TableToolbar from '../components/table_toolbar'
import { apiUrl } from '../assets/urls'

class CustomTable extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      tableCols: [],
      choices: {},
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
    if(value) {
      switch(col.type) {
        case 'date':
          let date = new Date(value)
          let day = date.getDate()
          let month = date.getMonth()+1
          let year = date.getFullYear()
          let stringDate = day + '/' + month + '/' + year
          return stringDate
        case 'bool':
          if(value) return (
            <div id={index} className={'text-center'}>
              <CheckIcon id={index}/>
            </div>
          )
          break
        case 'obj':
          if (value) return value[col.show]
          break
        default:
          return value
      }
    } else return null

  }

  buildCols = (cols) => {
    let renderCols = cols
    renderCols.map( (col) => {
      if (col.choicesUrl) {
        axios.get(apiUrl+col.choicesUrl).then(function(response){
          let choices = {...this.state.choices}
          choices[col.accessor] = response.data
          this.setState({choices})
        }.bind(this)).catch(function(error){alert(error)})
      }
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
    this.fetchTableData()
  }

  render() {
    const {tableCols, choices} = this.state
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
          choices={choices}
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
