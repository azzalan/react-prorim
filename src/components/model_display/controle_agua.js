import React, { Component } from 'react'
import ModelDisplayTable from '../../containers/model_display_table'

import { apiUrl } from '../../assets/urls'
import { controleAguaCols, controleAguaForm, controleAguaFilter } from '../../assets/controle_agua'
import { controleAguaTitle } from '../../assets/strings'

export default class ControleAgua extends Component {
  render () {
    const tableUrl = apiUrl + 'controle-agua/'
    return (
      <ModelDisplayTable
        tableUrl={tableUrl}
        tableTitle={controleAguaTitle}
        tableCols={controleAguaCols}
        formFields={controleAguaForm}
        filterFields={controleAguaFilter}
        disableFilterInvalid
      />
    )
  }
}
