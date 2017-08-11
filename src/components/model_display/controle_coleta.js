import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import ModelDisplayTable from '../../containers/model_display_table'

import { apiUrl } from '../../assets/urls'
import { getValueDotPath } from '../../assets/functions'
import { controleColetaCols, controleColetaForm } from '../../assets/controle_coleta'
import {
  controleColetaTitle,
  consultor
} from '../../assets/strings'

class ControleColeta extends Component {
  render () {
    const tableUrl = apiUrl + 'controle-coleta/'
    const userType = getValueDotPath('type', this.props.userData)
    const isConsultor = userType === consultor
    return (
      <ModelDisplayTable
        tableUrl={tableUrl}
        tableTitle={controleColetaTitle}
        tableCols={controleColetaCols}
        formFields={controleColetaForm}
        disableEdit={isConsultor}
        disableAddButton={isConsultor}
        disableFilter
      />
    )
  }
}

ControleColeta.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(ControleColeta)
