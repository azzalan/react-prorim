import React, { Component } from 'react'
import ModelDisplayTable from '../../containers/model_display_table'

import { apiUrl } from '../../assets/urls'
import { controleDesinfeccaoCols, controleDesinfeccaoForm } from '../../assets/controle_desinfeccao'
import { controleDesinfeccaoTitle } from '../../assets/strings'

export default class ControleDesinfeccao extends Component {
  render () {
    const tableUrl = apiUrl + 'controle-desinfeccao/'
    return (
      <ModelDisplayTable
        tableUrl={tableUrl}
        tableTitle={controleDesinfeccaoTitle}
        formFields={controleDesinfeccaoForm}
        tableCols={controleDesinfeccaoCols}
        disableAddButton={false}
        disableFilter
      />
    )
  }
}
