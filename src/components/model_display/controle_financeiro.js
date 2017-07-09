import React, { Component } from 'react'

import ModelDisplayTable from '../../containers/model_display_table'

import { controleFinanceiroUrl } from '../../assets/urls'
import {
  controleFinanceiroCols,
  controleFinanceiroForm,
  controleFinanceiroFilter
} from '../../assets/controle_financeiro'
import { controleFinanceiroTitle } from '../../assets/strings'

export default class ControleFinanceiro extends Component {
  render () {
    const currentDate = new Date()
    return (
      <ModelDisplayTable
        tableUrl={controleFinanceiroUrl}
        tableTitle={controleFinanceiroTitle}
        formFields={controleFinanceiroForm}
        filterFields={controleFinanceiroFilter}
        tableCols={controleFinanceiroCols}
        initialFilter={{ano: currentDate.getFullYear()}}
      />
    )
  }
}
