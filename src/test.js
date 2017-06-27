import React, { Component } from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Maquinas from './components/maquinas'
import {apiUrl} from './assets/urls'

injectTapEventPlugin()

export default class Test extends Component {
  render () {
    const modelUrl = apiUrl + 'maquina/'
    return (
      <MuiThemeProvider>
        <Maquinas
          modelUrl={modelUrl}
        />
      </MuiThemeProvider>
    )
  }
}
