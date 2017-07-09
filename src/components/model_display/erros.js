import React, { Component } from 'react'

import ModelDisplayTable from '../../containers/model_display_table'

import { estadiaUrl } from '../../assets/urls'
import {
  errosCols,
  errosForm,
  errosFilter
} from '../../assets/erros'
import { errosTitle } from '../../assets/strings'

export default class Erros extends Component {
  render () {
    return (
      <ModelDisplayTable
        tableUrl={estadiaUrl}
        tableTitle={errosTitle}
        tableCols={errosCols}
        formFields={errosForm}
        filterFields={errosFilter}
        disableAddButton
      />
    )
  }
}
