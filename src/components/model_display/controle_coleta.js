import React, { Component } from 'react'
import ModelDisplayTable from '../../containers/model_display_table'

import { apiUrl } from '../../assets/urls'
import { controleColetaCols, controleColetaForm } from '../../assets/controle_coleta'
import { controleColetaTitle } from '../../assets/strings'

export default class ControleColeta extends Component {
  render () {
    const tableUrl = apiUrl + 'controle-coleta/'
    return (
      <ModelDisplayTable
        tableUrl={tableUrl}
        tableTitle={controleColetaTitle}
        tableCols={controleColetaCols}
        formFields={controleColetaForm}
        disableAddButton={false}
        disableFilter
      />
    )
  }
}
