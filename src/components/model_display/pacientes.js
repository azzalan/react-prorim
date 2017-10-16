import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import ModelDisplayTable from '../../containers/model_display_table'
import DialogAgendamentos from '../../containers/dialog_agendamentos'
import DialogAddAgendamentos from '../../containers/dialog_add_agendamentos'

import { apiUrl } from '../../assets/urls'
import { getValueDotPath } from '../../assets/functions'
import {
  pacientesCols,
  pacientesConsultorCols,
  pacientesForm,
  pacientesFilter
} from '../../assets/pacientes'
import {
  pacientesTitle,
  titleDialogAgendamentos,
  close,
  titleDialogAddAgendamentos,
  consultor
} from '../../assets/strings'

class Pacientes extends Component {
  render () {
    const tableUrl = apiUrl + 'paciente/'
    const userType = getValueDotPath('type', this.props.userData)
    const isConsultor = userType === consultor
    const tableCols = isConsultor ? pacientesConsultorCols : pacientesCols
    return (
      <div>
        <ModelDisplayTable
          tableUrl={tableUrl}
          tableTitle={pacientesTitle}
          tableCols={tableCols}
          formFields={pacientesForm}
          filterFields={pacientesFilter}
          disableFilterInvalid
          disableEdit={isConsultor}
          disableAddButton={isConsultor}
          disableDelete
        />
        <DialogAgendamentos
          title={titleDialogAgendamentos}
          cancelText={close}
        />
        <DialogAddAgendamentos
          title={titleDialogAddAgendamentos}
          cancelText={close}
        />
      </div>
    )
  }
}

Pacientes.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Pacientes)
