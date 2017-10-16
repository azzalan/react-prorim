import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { printArray } from './functions'

class ContainerName extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount = () => {
  }

  render () {
    const { data } = this.props
    console.log(data)
    const t1 = data.total
    const s = (t) => (t === 1 ? null : 's')
    const periodos = (
      <li>{printArray(data.periodos, data.total, 'no período')}</li>
    )
    const salas = (
      <li>{printArray(data.salas, data.total, 'na sala')}</li>
    )
    const status = (
      <li>{printArray(data.status, data.total, 'com status')}</li>
    )
    return (
      <div>
        <li>{t1} atendimento{s(t1)}.</li>
        {data.periodos.length > 0 ? periodos : null}
        {data.salas.length > 0 ? salas : null}
        {data.status.length > 0 ? status : null}
      </div>
    )
  }
}

ContainerName.propTypes = {
  data: PropTypes.object
}

function mapStateToProps (state) {
  return {
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ContainerName)
