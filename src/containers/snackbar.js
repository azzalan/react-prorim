import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Snackbar from 'material-ui/Snackbar'

class ContainerName extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: []
    }
  }

  buildArray = (object) => {
    const array = []
    for (let key in object) {
      array.push(object[key])
    }
    return array
  }

  buildData = (snackbar) => {
    const data = this.buildArray(snackbar)
    data.sort((a, b) => (a.created - b.created))
    this.setState({data})
  }

  renderSnackbars = () => (
    this.state.data.map((instance, index) => (
      <Snackbar
        key={index}
        message={instance.message}
        open
      />
    ))
  )

  componentDidMount = () => {
    this.buildData(this.props.snackbarMessage)
  }

  componentWillReceiveProps = (nextProps) => {
    this.buildData(nextProps.snackbarMessage)
  }

  render () {
    return (<div>{this.renderSnackbars()}</div>)
  }
}

ContainerName.propTypes = {
  // redux state
  snackbarMessage: PropTypes.object
}

function mapStateToProps (state) {
  return {
    snackbarMessage: state.snackbarMessage
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ContainerName)
