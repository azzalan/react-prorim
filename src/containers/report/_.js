import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar'
import RaisedButton from 'material-ui/RaisedButton'
import RefreshIcon from 'react-material-icons/icons/navigation/refresh'
import PrintIcon from 'react-material-icons/icons/action/print'

import Filtro from './../filter'

import { reportFilter } from '../../assets/report'
import { get } from '../../assets/api_calls'
import { reportUrl, controleFinanceiroUrl } from '../../assets/urls'

import Text from './Text'
import ControleFinanceiroReport from './ControleFinanceiro'

import { controleFinanceiroCols } from '../../assets/controle_financeiro'
import { copyObject } from '../../assets/functions'

class Report extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: null,
      controleFinanceiro: null,
      cols: copyObject(controleFinanceiroCols),
      print: false,
      resetAfterPrint: false
    }
  }

  updateData = (response) => {
    this.setState({data: response.data})
  }

  updateControleFinanceiro = (response) => {
    this.setState({controleFinanceiro: response.data})
  }

  fetchData = () => {
    const anoFilter = {
      ano: this.props.filterData.inicial.getFullYear()
    }
    get(reportUrl, this.updateData, this.props.filterData)
    get(controleFinanceiroUrl, this.updateControleFinanceiro, anoFilter)
  }

  setPrintStyle = () => {
    const cols = copyObject(controleFinanceiroCols)
    cols.forEach((col) => {
      col.minWidth = 50
      col.maxWidth = 50
      col.className = 'reportCol'
    })
    this.setState({cols})
  }

  resetPrintStyle = () => {
    const cols = copyObject(controleFinanceiroCols)
    cols.forEach((col) => {
      col.minWidth = 100
      col.maxWidth = 200
      col.className = 'reportCol'
    })
    this.setState({cols})
  }

  printReport = () => {
    this.setPrintStyle()
    this.setState({print: true})
  }

  componentDidMount = () => {
  }

  componentDidUpdate = (pp, ps) => {
    if (this.state.print) {
      window.print()
      this.setState({ resetAfterPrint: true, print: false })
    }
    if (this.state.resetAfterPrint) {
      this.resetPrintStyle()
      this.setState({ resetAfterPrint: false })
    }
  }

  render () {
    return (
      <div className='flex-col fill'>
        <div className=''>
          <Toolbar>
            <ToolbarTitle text='Relatório referente ao período de:' />
            <ToolbarGroup>
              <RaisedButton
                icon={<RefreshIcon />}
                primary
                onTouchTap={this.fetchData}
                disabled={this.props.disableAddButton}
              />
              <RaisedButton
                icon={<PrintIcon />}
                primary
                onTouchTap={this.printReport}
              />
            </ToolbarGroup>
          </Toolbar>
          <Filtro
            filterFields={reportFilter}
            filterOpen
          />
        </div>
        <div className='report'>
          <Text data={this.state.data} />
          <ControleFinanceiroReport
            data={this.state.controleFinanceiro}
            cols={this.state.cols}
          />
        </div>
      </div>
    )
  }
}

Report.propTypes = {
  // redux state
  disableAddButton: PropTypes.bool,
  filterData: PropTypes.object
}

function mapStateToProps (state) {
  return {
    disableAddButton: state.disableAddButton,
    filterData: state.filterData
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Report)
