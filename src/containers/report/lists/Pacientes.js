import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// import { perc } from './functions'

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
    const t1 = data.created
    const s = (t) => (t === 1 ? null : 's')
    return (
      <div>
        <li>{data.created} paciente{s(t1)} adiconado{s(t1)}.</li>
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
