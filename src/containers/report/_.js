import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar'
import RaisedButton from 'material-ui/RaisedButton'
import RefreshIcon from 'react-material-icons/icons/navigation/refresh'

import Filtro from './../filter'

import { reportFilter } from '../../assets/report'
import { get } from '../../assets/api_calls'
import { reportUrl, controleFinanceiroUrl } from '../../assets/urls'

import Text from './Text'
import ControleFinanceiroReport from './ControleFinanceiro'

class Report extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: null,
      controleFinanceiro: null
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

  componentDidMount = () => {
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
            </ToolbarGroup>
          </Toolbar>
          <Filtro
            filterFields={reportFilter}
            filterOpen
          />
        </div>
        <div className='report'>
          <Text data={this.state.data} />
          <ControleFinanceiroReport data={this.state.controleFinanceiro} />
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
