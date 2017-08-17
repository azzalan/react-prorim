import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { perc } from './functions'

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
    const t2 = data.created.realizados
    const s = (t) => (t === 1 ? null : 's')
    const p = (t, singular, plural) => (t === 1 ? singular : plural)
    return (
      <div>
        <li>
          {t1} adicionado{s(t1)}, dentro deles {t2} ({perc(t1, t2)}) {p(t2, 'foi', 'foram')} realizado{s(t2)}.
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
