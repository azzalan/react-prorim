import React, { Component } from 'react'
// import ModelDisplayTable from '../../containers/model_display_table'
import ModelDisplayCards from '../../containers/model_display_cards'
import { apiUrl } from '../../assets/urls'
import { maquinasForm } from '../../assets/maquinas'
import { maquinasTitle } from '../../assets/strings'

export default class Maquinas extends Component {
  render () {
    const modelUrl = apiUrl + 'maquina/'
    return (
      <ModelDisplayCards
        modelUrl={modelUrl}
        modelTitle={maquinasTitle}
        formFields={maquinasForm}
        disableAddButton={false}
        disableFilter
      />
    )
  }
}
