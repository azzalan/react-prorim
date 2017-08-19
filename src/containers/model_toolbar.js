import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more'
import RaisedButton from 'material-ui/RaisedButton'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import Workbook from './workbook'

import {
  add,
  filter,
  options,
  exportTable
} from '../assets/strings'
import { getValueDotPath } from '../assets/functions'

class ModelToolbar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      exportTableData: []
    }
  }

  handleChange = (event, index, value) => this.setState({value});

  renderOptions = () => {
    const arrow = (
      <IconMenu
        iconButtonElement={
          <IconButton touch>
            <NavigationExpandMoreIcon />
          </IconButton>
        }
      >
        <Workbook
          element={<MenuItem primaryText={exportTable} />}
          filename='export.xlsx'
          data={this.state.exportTableData}
          cols={this.props.tableCols}
        />
      </IconMenu>
    )
    const addButton = (
      <RaisedButton
        label={add}
        primary
        onTouchTap={this.props.handleOpenDialogAdd}
        disabled={this.props.disableAddButton}
      />
    )
    return (
      <ToolbarGroup>
        <ToolbarTitle text={options} />
        <FontIcon className='muidocs-icon-custom-sort' />
        <ToolbarSeparator />
        {this.props.hideAddButton ? null : addButton}
        {this.props.hideArrow ? null : arrow}
      </ToolbarGroup>
    )
  }

  renderFilter = () => {
    if (this.props.showFilterToogle) {
      return (
        <ToolbarGroup firstChild>
          <ToolbarTitle text={filter} />
          <IconButton onTouchTap={this.props.toogleFilter}>
            <NavigationExpandMoreIcon />
          </IconButton>
        </ToolbarGroup>
      )
    }
  }

  getFieldStringValue = (field, data) => {
    let value = getValueDotPath(field.accessor, data)
    const lang = navigator.language
    if (value) {
      switch (field.type) {
      case 'date':
        return new Intl.DateTimeFormat().format(new Date(value))
      case 'time':
        const options = {hour: 'numeric', minute: 'numeric'}
        let time = new Date(value)
        return new Intl.DateTimeFormat(lang, options).format(time)
      case 'money':
        const currency = {style: 'currency', currency: 'BRL'}
        return new Intl.NumberFormat(lang, currency).format(value)
      case 'bool':
        return 'X'
      default:
        return value
      }
    }
    return null
  }

  buildExportTableData = (data) => {
    const exportTableData = data.map((line, index) => {
      const exportLine = {}
      this.props.tableCols.forEach((field) => {
        if (field.columns) {
          field.columns.forEach((fieldField) => {
            exportLine[fieldField.accessor] = this.getFieldStringValue(
              fieldField,
              data[index]
            )
          })
        } else {
          exportLine[field.accessor] = this.getFieldStringValue(
            field,
            data[index]
          )
        }
      })
      return exportLine
    })
    this.setState({exportTableData})
  }

  componentWillMount = () => {
    if (this.props.data) {
      this.buildExportTableData(this.props.data)
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.data) {
      this.buildExportTableData(nextProps.data)
    }
  }

  render () {
    const { modelTitle } = this.props
    return (
      <Toolbar>
        <ToolbarTitle text={modelTitle} />
        {this.renderFilter()}
        {this.renderOptions()}
      </Toolbar>
    )
  }
}

ModelToolbar.propTypes = {
  hideAddButton: PropTypes.bool,
  hideArrow: PropTypes.bool,
  handleOpenDialogAdd: PropTypes.func.isRequired,
  showFilterToogle: PropTypes.array,
  toogleFilter: PropTypes.func,
  modelTitle: PropTypes.string.isRequired,
  tableCols: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  // redux state
  disableAddButton: PropTypes.bool
}

function mapStateToProps (state) {
  return {
    disableAddButton: state.disableAddButton
  }
}

export default connect(mapStateToProps)(ModelToolbar)
