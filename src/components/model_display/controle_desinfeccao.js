import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import ModelDisplayTable from '../../containers/model_display_table'

import { apiUrl } from '../../assets/urls'
import { getValueDotPath } from '../../assets/functions'
import { controleDesinfeccaoCols, controleDesinfeccaoForm } from '../../assets/controle_desinfeccao'
import {
  controleDesinfeccaoTitle,
  consultor
} from '../../assets/strings'

class ControleDesinfeccao extends Component {
  render () {
    const tableUrl = apiUrl + 'controle-desinfeccao/'
    const userType = getValueDotPath('type', this.props.userData)
    const isConsultor = userType === consultor
    return (
      <ModelDisplayTable
        tableUrl={tableUrl}
        tableTitle={controleDesinfeccaoTitle}
        formFields={controleDesinfeccaoForm}
        tableCols={controleDesinfeccaoCols}
        disableEdit={isConsultor}
        disableAddButton={isConsultor}
        disableFilter
      />
    )
  }
}

ControleDesinfeccao.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(ControleDesinfeccao)
