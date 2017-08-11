import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import ModelDisplayTable from '../../containers/model_display_table'

import { apiUrl } from '../../assets/urls'
import { getValueDotPath } from '../../assets/functions'
import {
  manutencaoPreventivaCols,
  manutencaoPreventivaForm
} from '../../assets/manutencao_preventiva'
import {
  manutencaoPreventivaTitle,
  consultor
} from '../../assets/strings'

class ManutencaoPreventiva extends Component {
  render () {
    const tableUrl = apiUrl + 'manutencao-preventiva/'
    const userType = getValueDotPath('type', this.props.userData)
    const isConsultor = userType === consultor
    return (
      <ModelDisplayTable
        tableUrl={tableUrl}
        tableTitle={manutencaoPreventivaTitle}
        tableCols={manutencaoPreventivaCols}
        formFields={manutencaoPreventivaForm}
        disableAddButton
        disableFilter
        disableEdit={isConsultor}
      />
    )
  }
}

ManutencaoPreventiva.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(ManutencaoPreventiva)
