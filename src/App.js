import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { cyan500 } from 'material-ui/styles/colors'
import 'react-table/react-table.css'

import { selectUserData, selectAuthToken } from './actions/index'

// import Test from './test'
import Logged from './containers/logged'
import Login from './containers/login'
import DialogAlert from './containers/dialog_alert'
import Snackbar from './containers/snackbar'
// import { newLogin } from './actions/index'

import { userUrl } from './assets/urls'
import { get } from './assets/api_calls'
import {
  master,
  admin,
  consultor,
  enfermeiro,
  tecnico,
  erroNoUserType
} from './assets/strings'

injectTapEventPlugin()

class App extends Component {
  getUserType = (user) => {
    for (let i in user.groups) {
      let group = user.groups[i].name
      if (group === master) return master
      if (group === admin) return admin
      if (group === consultor) return consultor
      if (group === enfermeiro) return enfermeiro
      if (group === tecnico) return tecnico
    }
  }

  errorLogin = (error) => {
    if (error.response) {
      console.log(error.response)
      console.log(error.response.data)
      if (error.response.status === 401) {
        console.log('401')
      }
    } else if (error.request) {
      console.log(error.request)
    }
    this.props.selectUserData({invalid: true})
    this.props.selectAuthToken(null)
    localStorage.removeItem('prorimToken')
  }

  handleLogin = () => {
    get(userUrl, (response) => {
      let user = response.data
      user.type = this.getUserType(user)
      if (!user.type) alert(erroNoUserType)
      this.props.selectUserData(user)
    }, {}, this.errorLogin)
  }

  renderLogin = () => {
    document.body.style.backgroundColor = cyan500
    return (<Login />)
  }

  renderLogged = () => {
    document.body.style.backgroundColor = null
    return (<Logged />)
  }

  renderApp = () => {
    if (this.props.userData) {
      if (this.props.userData.invalid) return this.renderLogin()
      return this.renderLogged()
    } else if (localStorage.getItem('prorimToken')) return (<div />)
    return this.renderLogin()
  }
  // renderApp = () => {
  //   // return (<Test />)
  //   return this.renderLogin()
  // }

  componentWillMount = () => {
    const { userData, authToken, selectAuthToken } = this.props
    const localToken = localStorage.getItem('prorimToken')
    if (!userData) {
      if (authToken) this.handleLogin()
      else if (localToken) selectAuthToken(localToken)
    }
  }

  componentWillReceiveProps = (nextProps) => {
    const { userData, authToken } = nextProps
    const hasUser = userData && !userData.invalid
    if (!hasUser && authToken) return this.handleLogin()
  }

  render () {
    return (
      <MuiThemeProvider>
        <div>
          {this.renderApp()}
          <DialogAlert />
          <Snackbar />
        </div>
      </MuiThemeProvider>
    )
  }
}

App.propTypes = {
  // redux state
  authToken: PropTypes.string,
  userData: PropTypes.object,
  // redux actions
  selectUserData: PropTypes.func.isRequired,
  selectAuthToken: PropTypes.func.isRequired
}

function mapStateToProps (state) {
  return {
    authToken: state.authToken,
    userData: state.userData
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    selectUserData,
    selectAuthToken
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
