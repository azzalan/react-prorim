import React from 'react'
import Toggle from 'material-ui/Toggle'
import RaisedButton from 'material-ui/RaisedButton'
import Add from 'react-material-icons/icons/content/add'
import DialogAdd from './dialog_add'
import {Table, Column, Cell} from 'fixed-data-table'
import IconButton from 'material-ui/IconButton'
import EditIcon from 'react-material-icons/icons/editor/border-color'
import 'fixed-data-table/dist/fixed-data-table.css'

const staticTableType = [
  {
    key: 'edit',
    label: '',
    type: 'edit',
    width: 60,
  },
  {
    key: 'dataRealizacao',
    label: 'Data da realização',
    type: 'date',
    width: 100,
  },
  {
    key: 'exame',
    label: 'Exame',
    type: 'choice',
    choices: ['Choice1', 'Choice2', 'Choice3'],
    width: 100,
  },
  {
    key: 'dataEnvio',
    label: 'Data do envio',
    type: 'date',
    width: 100,
  },
  {
    key: 'dataResultado',
    label: 'Data do resultado',
    type: 'date',
    width: 100,
  },
  {
    key: 'resultado',
    label: 'Resultado',
    type: 'text',
    width: 100,
  },
  {
    key: 'numeroLaudo',
    label: 'Número do laudo',
    type: 'textNumber',
    width: 100,
  },
  {
    key: 'realizado',
    label: 'Realizado',
    type: 'bool',
    width: 100,
  },
]

const staticTableData = [
  {
    dataRealizacao: '11/11/11',
    exame: 'choice',
    dataEnvio: '11/11/11',
    dataResultado: '11/11/11',
    resultado: 'resultado resultado resultado resultado resultado ',
    numeroLaudo: '1',
    realizado: true,
  },
  {
    dataRealizacao: '11/11/11',
    exame: 'choice',
    dataEnvio: '11/11/11',
    dataResultado: '11/11/11',
    resultado: 'resultado resultado resultado resultado resultado ',
    numeroLaudo: '1',
    realizado: true,
  },
]

const buttonStyle = {
  margin: '0 0 15px 0',
}

const propContainer = {
  width: '100%',
}

const tableStyle = {
  width: '100%',
  overflow: 'auto',
}

export default class CustomTable extends React.Component {

  handleChange = (event, index, value) => this.setState({value})

  constructor(props) {
    super(props)
    this.state = {
      tableType: [],
      tableData: [],
      dialogOpen: false,
    }
  }

  handleOpenDialog = () => {
    this.setState({
      dialogOpen: true,
    })
  }

  handleChange = (event) => {
    this.setState({height: event.target.value})
  }

  buildCol = (tableData, col) => {
    if(col.type==='bool') {
      return(
        <Column
          columnKey={col.key}
          isResizable={true}
          header={<Cell>{col.label}</Cell>}              
          width={col.width}
          cell={
            props => (
              <Cell {...props}>
                <Toggle
                  toggled={tableData[props.rowIndex][col.key]}
                /> 
              </Cell>
            )
          }
        />
      )
    } else if (col.type==='edit') {
      return(
        <Column
          columnKey={col.key}
          isResizable={true}
          header={<Cell>{col.label}</Cell>}              
          width={col.width}
          cell={
            props => (
              <Cell {...props}>
                <IconButton>
                    <EditIcon/>
                  </IconButton>
              </Cell>
            )
          }
        />
      )
    } else {
      return(
        <Column
          columnKey={col.key}
          isResizable={true}
          header={<Cell>{col.label}</Cell>}
          flexGrow={1}    
          width={col.width}
          cell={
            props => (
              <Cell {...props}>
                {this.state.tableData[props.rowIndex][col.key]}
              </Cell>
            )
          }
        />
      )
    }
  }

  // buildCols = (row, tableType) => {
  //   let cols = []
  //   row.map( (field, index)=> (
  //     cols.push(<TableRowColumn key={index}>{this.buildCol(field, index, tableType)}</TableRowColumn>)      
  //   ))
  //   return cols
  // }

      // <TableRow 
      //   key={index} 
      //   selected={row.selected}
      //   onTouchTap={this.handleOpenDialog}
      // >
      //   {this.buildCols(row, tableType)}
      // </TableRow>

  buildCols = (tableData, tableType) => {
    let cols = []
    tableType.map( (col, index) => (
      cols.push(this.buildCol(tableData, col))
    ))
    return cols
  }

  _onColumnResizeEndCallback = (newColumnWidth, columnKey) => {
    let newTableType = this.state.tableType
    const colIndex = newTableType.findIndex(
      (col) => {return col.key===columnKey}
    )
    newTableType[colIndex].width = newColumnWidth
    this.setState({
      tableType: newTableType
    })
  }

  componentDidMount = () => {
    this.setState({
      tableType: staticTableType,
      tableData: staticTableData,
    })
    // let rows = this.buildRows(staticTableData, staticTableType)
    // this.setState({rows})
  }

  render() {
    var {tableData, tableType} = this.state;
    return (
      <div style={tableStyle}>
        <Table
          rowHeight={50}
          rowsCount={tableData.length}
          width={1500}
          height={500}
          headerHeight={50}
          onColumnResizeEndCallback={this._onColumnResizeEndCallback}
          isColumnResizing={false}
          >
          {this.buildCols(tableData, tableType)}
        </Table>
        <DialogAdd 
          dialogOpen={this.state.dialogOpen} 
          handleCloseDialog={() => this.setState({dialogOpen: false})}
          tableType={tableType}
        />
      </div>
    );
  }
}
