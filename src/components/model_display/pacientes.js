import React, { Component } from 'react'

import ModelDisplayTable from '../../containers/model_display_table'
import DialogAgendamentos from '../../containers/dialog_agendamentos'
import DialogAddAgendamentos from '../../containers/dialog_add_agendamentos'

import { apiUrl } from '../../assets/urls'
import {
  pacientesCols,
  pacientesForm,
  pacientesFilter
} from '../../assets/pacientes'
import {
  pacientesTitle,
  titleDialogAgendamentos,
  close,
  titleDialogAddAgendamentos
} from '../../assets/strings'

export default class pacientes extends Component {
  render () {
    const tableUrl = apiUrl + 'paciente/'
    return (
      <div>
        <ModelDisplayTable
          tableUrl={tableUrl}
          tableTitle={pacientesTitle}
          tableCols={pacientesCols}
          formFields={pacientesForm}
          filterFields={pacientesFilter}
          disableFilterInvalid
        />
        <DialogAgendamentos
          title={titleDialogAgendamentos}
          cancelText={close}
        />
        <DialogAddAgendamentos
          title={titleDialogAddAgendamentos}
          cancelText={close}
        />
      </div>
    )
  }
}
