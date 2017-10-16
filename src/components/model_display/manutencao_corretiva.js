import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import ModelDisplayTable from '../../containers/model_display_table'

import { apiUrl } from '../../assets/urls'
import { getValueDotPath } from '../../assets/functions'
import { manutencaoCorretivaCols, manutencaoCorretivaForm } from '../../assets/manutencao_corretiva'
import {
  manutencaoCorretivaTitle,
  consultor
} from '../../assets/strings'

class ManutencaoCorretiva extends Component {
  render () {
    const tableUrl = apiUrl + 'manutencao-corretiva/'
    const userType = getValueDotPath('type', this.props.userData)
    const isConsultor = userType === consultor
    return (
      <ModelDisplayTable
        tableUrl={tableUrl}
        tableTitle={manutencaoCorretivaTitle}
        tableCols={manutencaoCorretivaCols}
        formFields={manutencaoCorretivaForm}
        disableAddButton
        disableFilter
        disableEdit={isConsultor}
        disableDelete
      />
    )
  }
}

ManutencaoCorretiva.propTypes = {
  // redux state
  userData: PropTypes.object
}

function mapStateToProps (state) {
  return {
    userData: state.userData
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ManutencaoCorretiva)
