import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import ModelDisplayTable from '../../containers/model_display_table'

import { estadiaUrl } from '../../assets/urls'
import { getValueDotPath } from '../../assets/functions'
import {
  errosCols,
  errosForm,
  errosFilter
} from '../../assets/erros'
import {
  errosTitle,
  consultor
} from '../../assets/strings'

class Erros extends Component {
  render () {
    const userType = getValueDotPath('type', this.props.userData)
    const isConsultor = userType === consultor
    return (
      <ModelDisplayTable
        tableUrl={estadiaUrl}
        tableTitle={errosTitle}
        tableCols={errosCols}
        formFields={errosForm}
        filterFields={errosFilter}
        disableAddButton
        disableEdit={isConsultor}
        disableDelete
      />
    )
  }
}

Erros.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Erros)
