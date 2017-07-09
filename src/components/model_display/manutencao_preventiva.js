import React, { Component } from 'react'
import ModelDisplayTable from '../../containers/model_display_table'

import { apiUrl } from '../../assets/urls'
import { manutencaoPreventivaCols, manutencaoPreventivaForm } from '../../assets/manutencao_preventiva'
import { manutencaoPreventivaTitle } from '../../assets/strings'

export default class ManutencaoPreventiva extends Component {
  render () {
    const tableUrl = apiUrl + 'manutencao-preventiva/'
    return (
      <ModelDisplayTable
        tableUrl={tableUrl}
        tableTitle={manutencaoPreventivaTitle}
        tableCols={manutencaoPreventivaCols}
        formFields={manutencaoPreventivaForm}
        disableAddButton
        disableFilter
      />
    )
  }
}
