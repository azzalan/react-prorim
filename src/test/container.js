import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class ContainerName extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount = () => {
  }

  render () {
    return (
      <div>
      </div>
    )
  }
}

ContainerName.propTypes = {
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
