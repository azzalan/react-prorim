import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// import ModelDisplayTable from '../../containers/model_display_table'
import ModelDisplayCards from '../../containers/model_display_cards'

import { apiUrl } from '../../assets/urls'
import { getValueDotPath } from '../../assets/functions'
import { maquinasForm } from '../../assets/maquinas'
import {
  maquinasTitle,
  consultor
} from '../../assets/strings'

class Maquinas extends Component {
  render () {
    const modelUrl = apiUrl + 'maquina/'
    const userType = getValueDotPath('type', this.props.userData)
    const isConsultor = userType === consultor
    return (
      <ModelDisplayCards
        modelUrl={modelUrl}
        modelTitle={maquinasTitle}
        formFields={maquinasForm}
        disableEdit={isConsultor}
        disableAddButton={isConsultor}
        hideAddButton={isConsultor}
        disableFilter
      />
    )
  }
}

Maquinas.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Maquinas)
