import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { printArray, perc } from './functions'

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
    const t1 = data.total
    const t2 = data.manutencaoCorretiva
    const s = (t) => (t === 1 ? null : 's')
    const p = (t, singular, plural) => (t === 1 ? singular : plural)
    const maquinas = (
      <li>{printArray(data.maquinas, data.total, 'na máquina')}</li>
    )
    const manutencaoCorretiva = (
      <li>Dentro dele{s(t1)} {t2} ({perc(t2, t1)}) {p(t2, 'teve', 'tiveram')} a manutenção corretiva realizada.</li>
    )
    return (
      <div>
        <li>{t1} erro{s(t1)} ocorrido{s(t1)}.</li>
        {data.maquinas.length > 0 ? maquinas : null}
        {t1 > 0 ? manutencaoCorretiva : null}
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
