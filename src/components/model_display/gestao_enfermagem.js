import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'

import { selectDialogAddIsOpen } from '../../actions/index'

import ModelDisplayTable from '../../containers/model_display_table'
import DialogListPacientes from '../../containers/dialog_list_pacientes'

import { estadiaUrl } from '../../assets/urls'
import {
  gestaoEnfermagemCols,
  gestaoEnfermagemForm,
  gestaoEnfermagemFilter
} from '../../assets/gestao_enfermagem'
import { gestaoEnfermagemTitle } from '../../assets/strings'

class GestaoEnfermagem extends Component {
  render () {
    const dialogAdd = (
      <DialogListPacientes
        dialogOpen={this.props.dialogAddIsOpen}
        handleCloseDialog={() => this.props.selectDialogAddIsOpen(false)}
      />
    )
    return (
      <ModelDisplayTable
        tableUrl={estadiaUrl}
        tableTitle={gestaoEnfermagemTitle}
        tableCols={gestaoEnfermagemCols}
        formFields={gestaoEnfermagemForm}
        filterFields={gestaoEnfermagemFilter}
        disableAddButton={false}
        dialogAdd={dialogAdd}
      />
    )
  }
}

GestaoEnfermagem.propTypes = {
  // redux state
  dialogAddIsOpen: PropTypes.bool,
  // redux actions
  selectDialogAddIsOpen: PropTypes.func.isRequired
}

function mapStateToProps (state) {
  return {
    dialogAddIsOpen: state.dialogAddIsOpen
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    selectDialogAddIsOpen: selectDialogAddIsOpen
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GestaoEnfermagem)
