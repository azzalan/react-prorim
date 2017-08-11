import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Snackbar from 'material-ui/Snackbar'

class ContainerName extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount = () => {
  }

  render () {
    const open = this.props.snackbarOpen || false
    const message = this.props.snackbarMessage || ''
    return (
      <Snackbar
        open={open}
        message={message}
      />
    )
  }
}

ContainerName.propTypes = {
  // redux state
  snackbarOpen: PropTypes.bool,
  snackbarMessage: PropTypes.string
}

function mapStateToProps (state) {
  return {
    snackbarOpen: state.snackbarOpen,
    snackbarMessage: state.snackbarMessage
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ContainerName)
