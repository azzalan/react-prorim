import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { cyan500 } from 'material-ui/styles/colors'

// import Test from './test'
import Logged from './containers/logged'
import Login from './containers/login'
import { newLogin } from './actions/index'

injectTapEventPlugin()

class App extends Component {
  renderLogin = () => {
    document.body.style.backgroundColor = cyan500
    return (<Login />)
  }

  renderLogged = () => {
    document.body.style.backgroundColor = null
    return (<Logged />)
  }

  // renderApp = () => {
  //   const { log } = this.props
  //   if (log) {
  //     if (log.status) return this.renderLogged()
  //   }
  //   return this.renderLogin()
  // }
  renderApp = () => {
    // return (<Test />)
    return this.renderLogged()
  }

  componentDidMount = () => {
    if (this.props.log === null) this.props.newLogin()
  }

  render () {
    return (
      <MuiThemeProvider>
        {this.renderApp()}
      </MuiThemeProvider>
    )
  }
}

App.propTypes = {
  log: PropTypes.object,
  newLogin: PropTypes.func.isRequired
}

function mapStateToProps (state) {
  return {
    log: state.log
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ newLogin: newLogin }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
