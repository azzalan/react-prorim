import React, { Component } from 'react'

import DialogListPacientes from './containers/dialog_list_pacientes'

export default class Test extends Component {
  render () {
    return (
      <DialogListPacientes
        dialogOpen
        handleCloseDialog={() => console.log('close')}
      />
    )
  }
}
