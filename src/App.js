import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { cyan500 } from 'material-ui/styles/colors'

import Logged from './components/logged'
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

  renderApp = () => {
    const { log } = this.props
    if (log) {
      if (!log.status) return this.renderLogged()
      else return this.renderLogin()
    } else return this.renderLogin()
  }

  componentDidMount = () => {
    if(this.props.log===null) this.props.newLogin()
  }

  render () {
    return (
      <MuiThemeProvider>
        {this.renderApp()}
      </MuiThemeProvider>
    )
  }
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