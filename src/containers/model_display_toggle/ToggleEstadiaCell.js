import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Toggle from 'material-ui/Toggle'

import { post, del } from '../../assets/api_calls'
import { estadiaUrl } from '../../assets/urls'

class ContainerName extends Component {
  constructor (props) {
    super(props)
    const hasId = this.props.row.value > 0
    this.state = {
      value: hasId,
      id: this.props.row.value | null
    }
  }

  onToogle = (e, value) => {
    const { filterData, fetchEstadias, data } = this.props
    const row = this.props.row.row
    const sala = filterData.sala
    const periodo = row.periodo
    const paciente = row.paciente.id
    if (value === true) {
      const estadia = { data, sala, periodo, paciente }
      post(estadiaUrl, estadia, () => fetchEstadias(filterData))
    }
    if (value === false) {
      del(estadiaUrl + this.state.id + '/', () => fetchEstadias(filterData))
    }
  }

  componentDidMount = () => {
  }

  componentWillReceiveProps = (n) => {
    if (this.props.row.value !== n.row.value) {
      const hasId = n.row.value > 0
      this.setState({
        value: hasId,
        id: n.row.value | null
      })
    }
  }

  render () {
    return (
      <div className='flex-center'>
        <div className='toggle'>
          <Toggle
            toggled={this.state.value}
            disabled={this.props.disabled || false}
            onToggle={this.onToogle}
          />
        </div>
      </div>
    )
  }
}

ContainerName.propTypes = {
  row: PropTypes.object,
  data: PropTypes.any,
  disabled: PropTypes.bool,
  fetchEstadias: PropTypes.func.isRequired,
  // redux state
  filterData: PropTypes.object
}

function mapStateToProps (state) {
  return {
    filterData: state.filterData
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ContainerName)
