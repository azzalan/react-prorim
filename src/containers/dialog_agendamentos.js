import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

import {
  selectDialogAgendamentosIsOpen,
  selectDialogAgendamentosData,
  selectFilterData
} from '../actions/index'

import CustomTable from '../components/table'

import { estadiaUrl } from '../assets/urls'
import { cancel } from '../assets/strings'
import { listToRemoveCols } from '../assets/pacientes'
import { get } from '../assets/api_calls'

class DialogAgendamentos extends Component {
  updateModelData = (response) => {
    let data = response.data
    let returnData = []
    data.forEach((estadia) => {
      if (estadia.secao) {
        let date = new Date(estadia.secao.data)
        date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0)
        let now = new Date()
        now = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0)
        if (date.getTime() >= now.getTime()) returnData.push(estadia)
      } else {
        console.log('Estadia não tem seção.')
      }
    })
    this.props.selectDialogAgendamentosData(returnData)
  }

  handleCloseDialog = () => this.props.selectDialogAgendamentosIsOpen(false)

  fetchModelData = (filterData = this.props.filterData) => {
    get(estadiaUrl, this.updateModelData, filterData)
  }

  componentWillMount = () => {
    this.fetchModelData()
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.filterData !== nextProps.filterData) {
      this.fetchModelData(nextProps.filterData)
    }
  }

  componentWillUnmount = () => this.props.selectFilterData(null)

  render () {
    const actions = [
      <FlatButton
        label={this.props.cancelText || cancel}
        primary
        onTouchTap={this.handleCloseDialog}
      />
    ]
    return (
      <Dialog
        title={this.props.title}
        actions={actions}
        modal={false}
        autoScrollBodyContent
        open={this.props.dialogAgendamentosIsOpen || false}
        onRequestClose={this.handleCloseDialog}
      >
        <CustomTable
          data={this.props.dialogAgendamentosData}
          columns={listToRemoveCols}
          pageSize={5}
        />
      </Dialog>
    )
  }
}

DialogAgendamentos.propTypes = {
  title: PropTypes.string.isRequired,
  cancelText: PropTypes.string,
  // redux state
  filterData: PropTypes.object,
  dialogAgendamentosIsOpen: PropTypes.bool,
  dialogAgendamentosData: PropTypes.array,
  // redux actions
  selectDialogAgendamentosIsOpen: PropTypes.func.isRequired,
  selectDialogAgendamentosData: PropTypes.func.isRequired,
  selectFilterData: PropTypes.func.isRequired
}

function mapStateToProps (state) {
  return {
    filterData: state.filterData,
    dialogAgendamentosIsOpen: state.dialogAgendamentosIsOpen,
    dialogAgendamentosData: state.dialogAgendamentosData
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    selectDialogAgendamentosIsOpen,
    selectDialogAgendamentosData,
    selectFilterData
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DialogAgendamentos)
