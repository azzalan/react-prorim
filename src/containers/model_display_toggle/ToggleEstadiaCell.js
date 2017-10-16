import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Toggle from 'material-ui/Toggle'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

import { post, del } from '../../assets/api_calls'
import { estadiaUrl } from '../../assets/urls'

class ContainerName extends Component {
  constructor (props) {
    super(props)
    const hasId = this.props.row.value > 0
    this.state = {
      value: hasId,
      id: this.props.row.value | null,
      confirmDialogOpen: false,
      disabled: false
    }
  }

  onToogle = (e, value) => {
    const { filterData, fetchEstadias, data } = this.props
    const row = this.props.row.row
    const sala = filterData.sala
    const periodo = row.periodo
    const paciente = row.paciente.id
    if (value === true) {
      const estadia = { data, sala, periodo, paciente }
      post(estadiaUrl, estadia, () => fetchEstadias(filterData))
    }
    if (value === false) {
      this.setState({confirmDialogOpen: true})
    }
  }

  thenDelete = (r) => {
    const { filterData, fetchEstadias } = this.props
    this.handleCloseConfirm()
    fetchEstadias(filterData)
  }

  handleDelete = () => {
    del(estadiaUrl + this.state.id + '/', this.thenDelete)
  }

  // Checa se a data do agendamento já passou, caso tenha passado, desabilita
  // a edição.
  setDisable = () => {
    let date = this.props.data
    date = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0)
    let now = new Date()
    now = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0)
    if (date.getTime() < now.getTime()) this.setState({ disabled: true })
    else this.setState({ disabled: false })
  }

  componentWillMount = () => {
    this.setDisable()
  }

  componentWillReceiveProps = (n) => {
    this.setDisable()
    if (this.props.row.value !== n.row.value) {
      const hasId = n.row.value > 0
      this.setState({
        value: hasId,
        id: n.row.value | null
      })
    }
  }

  handleCloseConfirm = () => this.setState({confirmDialogOpen: false})

  render () {
    const confirmActions = [
      <FlatButton
        label='Cancelar'
        primary
        onTouchTap={this.handleCloseConfirm}
      />,
      <FlatButton
        label='Confirmar'
        primary
        keyboardFocused
        onTouchTap={this.handleDelete}
      />
    ]
    return (
      <div className='flex-center'>
        <div className='toggle'>
          <Toggle
            toggled={this.state.value}
            disabled={this.state.disabled}
            onToggle={this.onToogle}
          />
        </div>
        <Dialog
          title='Confirmar'
          actions={confirmActions}
          modal={false}
          autoScrollBodyContent
          open={this.state.confirmDialogOpen}
          onRequestClose={this.handleCloseConfirm}
        >
          Tem certeza que deseja excluir esse agendamento com todas as informações registradas nele?
        </Dialog>
      </div>
    )
  }
}

ContainerName.propTypes = {
  row: PropTypes.object,
  data: PropTypes.any,
  fetchEstadias: PropTypes.func.isRequired,
  // redux state
  filterData: PropTypes.object
}

function mapStateToProps (state) {
  return {
    filterData: state.filterData
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ContainerName)
