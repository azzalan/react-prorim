import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import ModelDisplayTable from '../../containers/model_display_table'

import { controleFinanceiroUrl } from '../../assets/urls'
import { getValueDotPath } from '../../assets/functions'
import {
  controleFinanceiroCols,
  controleFinanceiroForm,
  controleFinanceiroFilter
} from '../../assets/controle_financeiro'
import {
  controleFinanceiroTitle,
  consultor
} from '../../assets/strings'

class ControleFinanceiro extends Component {
  render () {
    const currentDate = new Date()
    const userType = getValueDotPath('type', this.props.userData)
    const isConsultor = userType === consultor
    return (
      <ModelDisplayTable
        tableUrl={controleFinanceiroUrl}
        tableTitle={controleFinanceiroTitle}
        formFields={controleFinanceiroForm}
        filterFields={controleFinanceiroFilter}
        tableCols={controleFinanceiroCols}
        initialFilter={{ano: currentDate.getFullYear()}}
        disableEdit={isConsultor}
        disableAddButton={isConsultor}
      />
    )
  }
}

ControleFinanceiro.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(ControleFinanceiro)
