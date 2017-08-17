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
import { reportUrl } from '../../assets/urls'

import Text from './Text'

class ContainerName extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: null
    }
  }

  updateData = (response) => {
    this.setState({data: response.data})
  }

  fetchData = () => {
    get(reportUrl, this.updateData, this.props.filterData)
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
        </div>
      </div>
    )
  }
}

ContainerName.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(ContainerName)
