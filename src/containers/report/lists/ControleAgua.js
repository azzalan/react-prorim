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
    const t1 = data.created.total
    const t2 = data.realizados
    const t3 = data.enviados
    const t4 = data.resultados.total
    const s = (t) => (t === 1 ? null : 's')
    return (
      <div>
        <li>
          {t1} exame{s(t1)} adicionado{s(t1)}. {printArray(data.created.exames, t1)}
        </li>
        <li>
          {t2} exame{s(t2)} realizado{s(t2)}.
        </li>
        <li>
          {t3} exame{s(t3)} enviado{s(t3)}.
        </li>
        <li>
          {t4} resultado{s(t4)} obtido{s(t4)}, {printArray(data.resultados.status, t4)}
        </li>
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
