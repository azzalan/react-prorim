import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'

import { selectDialogAddIsOpen } from '../../actions/index'

import ModelDisplayTable from '../../containers/model_display_table'
import DialogListPacientes from '../../containers/dialog_list_pacientes'
import EnfermeiroField from '../../containers/enfermeiro_field'

import { estadiaUrl } from '../../assets/urls'
import {
  gestaoEnfermagemCols,
  gestaoEnfermagemForm,
  gestaoEnfermagemFilter
} from '../../assets/gestao_enfermagem'
import { gestaoEnfermagemTitle, consultor } from '../../assets/strings'
import { getValueDotPath } from '../../assets/functions'

class GestaoEnfermagem extends Component {
  render () {
    const userType = getValueDotPath('type', this.props.userData)
    const isConsultor = userType === consultor
    const dialogAdd = (
      <DialogListPacientes
        dialogOpen={this.props.dialogAddIsOpen}
        handleCloseDialog={() => this.props.selectDialogAddIsOpen(false)}
      />
    )
    const enfermeiroField = (<EnfermeiroField disabled={isConsultor} />)
    return (
      <ModelDisplayTable
        tableUrl={estadiaUrl}
        tableTitle={gestaoEnfermagemTitle}
        tableCols={gestaoEnfermagemCols}
        formFields={gestaoEnfermagemForm}
        filterFields={gestaoEnfermagemFilter}
        extraFields={enfermeiroField}
        disableEdit={isConsultor}
        disableAddButton={isConsultor}
        dialogAdd={dialogAdd}
      />
    )
  }
}

GestaoEnfermagem.propTypes = {
  // redux state
  dialogAddIsOpen: PropTypes.bool,
  userData: PropTypes.object,
  // redux actions
  selectDialogAddIsOpen: PropTypes.func.isRequired
}

function mapStateToProps (state) {
  return {
    dialogAddIsOpen: state.dialogAddIsOpen,
    userData: state.userData
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    selectDialogAddIsOpen: selectDialogAddIsOpen
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GestaoEnfermagem)
