import React from 'react'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table'
import Toggle from 'material-ui/Toggle'
import DatePicker from 'material-ui/DatePicker'
import MenuItem from 'material-ui/MenuItem'
import SelectField from 'material-ui/SelectField'
import IconButton from 'material-ui/IconButton'
import Edit from 'react-material-icons/icons/editor/border-color'
import Add from 'react-material-icons/icons/content/add'
import areIntlLocalesSupported from 'intl-locales-supported'

let DateTimeFormat;

/**
 * Use the native Intl.DateTimeFormat if available, or a polyfill if not.
 */
if (areIntlLocalesSupported(['fr', 'fa-IR'])) {
  DateTimeFormat = global.Intl.DateTimeFormat;
} else {
  const IntlPolyfill = require('intl');
  DateTimeFormat = IntlPolyfill.DateTimeFormat;
  require('intl/locale-data/jsonp/pt-BR');
}

const tableData = [
  {
    data: '11/11/11',
    teste: 'choice',
    resultado: true,
  },
  {
    data: '11/11/11',
    teste: 'choice',
    resultado: false,
  }
]

export default class TableControleAgua extends React.Component {

  handleChange = (event, index, value) => this.setState({value});

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
              <TableHeaderColumn colSpan="4" style={{textAlign: 'center'}}>
                <h1>Controle de água</h1>
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn>Data</TableHeaderColumn>
              <TableHeaderColumn>Teste</TableHeaderColumn>
              <TableHeaderColumn>Resultado</TableHeaderColumn>
              <TableHeaderColumn></TableHeaderColumn>
            </TableRow>
          </TableHeader>          
          <TableBody
            displayRowCheckbox={this.state.showCheckboxes}
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}
          >          
          <TableRow>
              <TableRowColumn><DatePicker DateTimeFormat={DateTimeFormat} hintText="Data" container="inline" mode="landscape" locale="pt"/></TableRowColumn>
              <TableRowColumn>
                <SelectField
                  value={this.state.value}
                  onChange={this.handleChange}
                >
                  <MenuItem value={1} primaryText="Teste1" />
                  <MenuItem value={2} primaryText="Teste2" />
                  <MenuItem value={3} primaryText="Teste3" />
                </SelectField>
              </TableRowColumn>
              <TableRowColumn>
                <Toggle
                  defaultToggled={false}
                />
              </TableRowColumn>
              <TableRowColumn>
                <IconButton>
                  <Add/>
                </IconButton>
              </TableRowColumn>
            </TableRow>
            {tableData.map( (row, index) => (
              <TableRow key={index} selected={row.selected}>
                <TableRowColumn>{row.data}</TableRowColumn>
                <TableRowColumn>{row.teste}</TableRowColumn>
                <TableRowColumn>
                  <Toggle
                    defaultToggled={row.resultado}
                    disabled={true}
                  />
                </TableRowColumn>
                <TableRowColumn>
                  <IconButton>
                    <Edit/>
                  </IconButton>
                </TableRowColumn>
              </TableRow>
              ))
            }            
          </TableBody>
        </Table>
      </div>
    );
  }
}
