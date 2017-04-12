import React from 'react'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table'
import Toggle from 'material-ui/Toggle'
import RaisedButton from 'material-ui/RaisedButton'
import Add from 'react-material-icons/icons/content/add'

const staticTableType = [
  {
    header: 'Data da realização',
    type: 'date',
  },
  {
    header: 'Exame',
    type: 'choice',
  },
  {
    header: 'Data do envio',
    type: 'date',
  },
  {
    header: 'Data do resultado',
    type: 'date',
  },
  {
    header: 'Resultado',
    type: 'text',
  },
  {
    header: 'Número do laudo',
    type: 'text',
  },
  {
    header: 'Realizado',
    type: 'bool',
  },
]

const staticTableData = [
  [
    '11/11/11',
    'choice',
    '11/11/11',
    '11/11/11',
    'resultado',
    '1',
    true,
  ],
  [
    '11/11/11',
    'choice',
    '11/11/11',
    '11/11/11',
    'resultado',
    '2',
    false,
  ],
]

const buttonStyle = {
  width: '50%',
  margin: '0 0 15px 0',
}

export default class TableControleColeta extends React.Component {

  handleChange = (event, index, value) => this.setState({value})

  constructor(props) {
    super(props)
    this.state = {
      fixedHeader: true,
      fixedFooter: true,
      stripedRows: false,
      showRowHover: true,
      selectable: false,
      multiSelectable: true,
      enableSelectAll: true,
      deselectOnClickaway: true,
      showCheckboxes: false,
      value: 1,
      rows: [],
      tableType: [],
      tableData: [],
    }
  }

  handleToggle = (event, toggled) => {
    this.setState({
      [event.target.name]: toggled,
    })
  }

  handleChange = (event) => {
    this.setState({height: event.target.value})
  }

  buildCol = (field, index, tableType) => {
    if(tableType[index].type==='bool') {
          return(
            <TableRowColumn>
              <Toggle
                defaultToggled={field}
                disabled={true}
              />
            </TableRowColumn>
          )
      } else {
        return(<TableRowColumn>{field}</TableRowColumn>)
    }
  }

  buildCols = (row, tableType) => {
    let cols = []
    row.map( (field, index)=> (
      cols.push(<TableRowColumn>{this.buildCol(field, index, tableType)}</TableRowColumn>)      
    ))
    return cols
  }

  buildRows = (tableData, tableType) => {
    let rows = []
    tableData.map( (row, index) => (
      rows.push(
      <TableRow key={index} selected={row.selected}>
        {this.buildCols(row, tableType)}
      </TableRow>
      )
    ))
    return rows
  }

  componentDidMount = () => {
    this.setState({
      tableType: staticTableType,
      tableData: staticTableData,
    })
    let rows = this.buildRows(staticTableData, staticTableType)
    this.setState({rows})
  }

  render() {
    return (
      <div>
        <Table
          fixedHeader={this.state.fixedHeader}
          fixedFooter={this.state.fixedFooter}
          selectable={this.state.selectable}
          multiSelectable={this.state.multiSelectable}
        >
          <TableHeader
            displaySelectAll={this.state.showCheckboxes}
            adjustForCheckbox={this.state.showCheckboxes}
            enableSelectAll={this.state.enableSelectAll}
          >
            <TableRow>
              <TableHeaderColumn colSpan={this.state.tableType.length} style={{textAlign: 'center'}}>
                <h1>Controle de coleta</h1>
                <RaisedButton
                  label="Adicionar"
                  style={buttonStyle}
                  icon={<Add />}
                />
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              {this.state.tableType.map( (col, index) => (
                <TableHeaderColumn>{col.header}</TableHeaderColumn>
                ))
              }
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={this.state.showCheckboxes}
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}
          >
            {this.state.rows}
          </TableBody>
        </Table>
      </div>
    );
  }
}
