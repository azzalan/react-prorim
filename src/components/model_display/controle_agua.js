import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import ModelDisplayTable from '../../containers/model_display_table'

import { apiUrl } from '../../assets/urls'
import { getValueDotPath } from '../../assets/functions'
import { controleAguaCols, controleAguaForm, controleAguaFilter } from '../../assets/controle_agua'
import {
  controleAguaTitle,
  consultor
} from '../../assets/strings'

class ControleAgua extends Component {
  render () {
    const tableUrl = apiUrl + 'controle-agua/'
    const userType = getValueDotPath('type', this.props.userData)
    const isConsultor = userType === consultor
    return (
      <ModelDisplayTable
        tableUrl={tableUrl}
        tableTitle={controleAguaTitle}
        tableCols={controleAguaCols}
        formFields={controleAguaForm}
        filterFields={controleAguaFilter}
        disableEdit={isConsultor}
        disableAddButton={isConsultor}
        disableFilterInvalid
      />
    )
  }
}

ControleAgua.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(ControleAgua)
