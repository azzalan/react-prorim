import React, { Component } from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
// import getMuiTheme from 'material-ui/styles/getMuiTheme'

// import {
//     red500, red600,
//     grey100, grey300, grey400, grey500,
//     white, darkBlack, fullBlack, redA700,
// } from 'material-ui/styles/colors'
import Logged from './components/logged.jsx'

// const muiTheme = getMuiTheme({
//     fontFamily: 'Roboto, sans-serif',
//     palette: {
//         primary1Color: redA700,
//         primary2Color: red600,
//         primary3Color: grey400,
//         accent1Color: grey500,
//         accent2Color: grey100,
//         accent3Color: grey500,
//         textColor: darkBlack,
//         alternateTextColor: white,
//         canvasColor: white,
//         borderColor: grey300,
//         pickerHeaderColor: red500,
//         shadowColor: fullBlack,
//     },
// })

injectTapEventPlugin()

export default class App extends Component {
  render () {
    return (
      <MuiThemeProvider>
        <div>
          <Logged />
        </div>
      </MuiThemeProvider>
    )
  }
}
