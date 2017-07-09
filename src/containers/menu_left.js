import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Drawer from 'material-ui/Drawer'
import AppBar from 'material-ui/AppBar'
import MenuItem from 'material-ui/MenuItem'

import { selectMenuLeftOpen, selectModelDisplay } from '../actions/index'

import {
  controleAguaTitle,
  controleColetaTitle,
  controleDesinfeccaoTitle,
  controleFinanceiroTitle,
  manutencaoCorretivaTitle,
  manutencaoPreventivaTitle,
  maquinasTitle,
  gestaoEnfermagemTitle,
  errosTitle,
  pacientesTitle
} from '../assets/strings'

class MenuLeft extends Component {
  handleToggle = () => this.props.selectMenuLeftOpen(!this.props.menuLeftOpen)

  handleOpenModelDisplay = (model) => {
    this.props.selectModelDisplay(model)
    this.props.selectMenuLeftOpen(false)
  }

  componentWillMount = () => this.props.selectMenuLeftOpen(true)

  render () {
    return (
      <Drawer
        open={this.props.menuLeftOpen}
        docked={false}
        onRequestChange={this.props.selectMenuLeftOpen}
      >
        <AppBar title='Menu' onLeftIconButtonTouchTap={this.handleToggle} />
        <MenuItem onTouchTap={() => this.handleOpenModelDisplay('ControleAgua')}>
          {controleAguaTitle}
        </MenuItem>
        <MenuItem onTouchTap={() => this.handleOpenModelDisplay('ControleColeta')}>
          {controleColetaTitle}
        </MenuItem>
        <MenuItem onTouchTap={() => this.handleOpenModelDisplay('ControleDesinfeccao')}>
          {controleDesinfeccaoTitle}
        </MenuItem>
        <MenuItem onTouchTap={() => this.handleOpenModelDisplay('ControleFinanceiro')}>
          {controleFinanceiroTitle}
        </MenuItem>
        <MenuItem onTouchTap={() => this.handleOpenModelDisplay('Pacientes')}>
          {pacientesTitle}
        </MenuItem>
        <MenuItem onTouchTap={() => this.handleOpenModelDisplay('GestaoEnfermagem')}>
          {gestaoEnfermagemTitle}
        </MenuItem>
        <MenuItem onTouchTap={() => this.handleOpenModelDisplay('Erros')}>
          {errosTitle}
        </MenuItem>
        <MenuItem onTouchTap={() => this.handleOpenModelDisplay('ManutencaoCorretiva')}>
          {manutencaoCorretivaTitle}
        </MenuItem>
        <MenuItem onTouchTap={() => this.handleOpenModelDisplay('ManutencaoPreventiva')}>
          {manutencaoPreventivaTitle}
        </MenuItem>
        <MenuItem onTouchTap={() => this.handleOpenModelDisplay('Maquinas')}>
          {maquinasTitle}
        </MenuItem>
      </Drawer>
    )
  }
}

MenuLeft.propTypes = {
  menuLeftOpen: PropTypes.bool,
  selectMenuLeftOpen: PropTypes.func.isRequired,
  selectModelDisplay: PropTypes.func.isRequired
}

function mapStateToProps (state) {
  return {
    menuLeftOpen: state.menuLeftOpen
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    selectMenuLeftOpen: selectMenuLeftOpen,
    selectModelDisplay: selectModelDisplay
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuLeft)
