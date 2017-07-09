import React, { Component } from 'react'
import ModelDisplayTable from '../../containers/model_display_table'

import { apiUrl } from '../../assets/urls'
import { manutencaoCorretivaCols, manutencaoCorretivaForm } from '../../assets/manutencao_corretiva'
import { manutencaoCorretivaTitle } from '../../assets/strings'

export default class ManutencaoCorretiva extends Component {
  render () {
    const tableUrl = apiUrl + 'manutencao-corretiva/'
    return (
      <ModelDisplayTable
        tableUrl={tableUrl}
        tableTitle={manutencaoCorretivaTitle}
        tableCols={manutencaoCorretivaCols}
        formFields={manutencaoCorretivaForm}
        disableAddButton
        disableFilter
      />
    )
  }
}
