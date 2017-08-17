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
        <h4>{this.props.header}</h4>
        <ul>
          {this.props.list}
        </ul>
      </div>
    )
  }
}

ContainerName.propTypes = {
  header: PropTypes.string.isRequired,
  list: PropTypes.any
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
