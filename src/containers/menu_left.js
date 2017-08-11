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
  pacientesTitle,
  master,
  admin,
  consultor,
  enfermeiro,
  tecnico
} from '../assets/strings'

class MenuLeft extends Component {
  handleToggle = () => this.props.selectMenuLeftOpen(!this.props.menuLeftOpen)

  handleOpenModelDisplay = (model) => {
    this.props.selectModelDisplay(model)
    this.props.selectMenuLeftOpen(false)
  }

  buildMenuItems = (items) => {
    let menuItems = []
    items.forEach((item, index) => {
      switch (item) {
      case 'ControleAgua':
        menuItems.push(
          <MenuItem key={index} onTouchTap={() => this.handleOpenModelDisplay('ControleAgua')}>
            {controleAguaTitle}
          </MenuItem>
          )
        break
      case 'ControleColeta':
        menuItems.push(
          <MenuItem key={index} onTouchTap={() => this.handleOpenModelDisplay('ControleColeta')}>
            {controleColetaTitle}
          </MenuItem>
          )
        break
      case 'ControleDesinfeccao':
        menuItems.push(
          <MenuItem key={index} onTouchTap={() => this.handleOpenModelDisplay('ControleDesinfeccao')}>
            {controleDesinfeccaoTitle}
          </MenuItem>
          )
        break
      case 'ControleFinanceiro':
        menuItems.push(
          <MenuItem key={index} onTouchTap={() => this.handleOpenModelDisplay('ControleFinanceiro')}>
            {controleFinanceiroTitle}
          </MenuItem>
          )
        break
      case 'Pacientes':
        menuItems.push(
          <MenuItem key={index} onTouchTap={() => this.handleOpenModelDisplay('Pacientes')}>
            {pacientesTitle}
          </MenuItem>
          )
        break
      case 'GestaoEnfermagem':
        menuItems.push(
          <MenuItem key={index} onTouchTap={() => this.handleOpenModelDisplay('GestaoEnfermagem')}>
            {gestaoEnfermagemTitle}
          </MenuItem>
          )
        break
      case 'Erros':
        menuItems.push(
          <MenuItem key={index} onTouchTap={() => this.handleOpenModelDisplay('Erros')}>
            {errosTitle}
          </MenuItem>
          )
        break
      case 'ManutencaoCorretiva':
        menuItems.push(
          <MenuItem key={index} onTouchTap={() => this.handleOpenModelDisplay('ManutencaoCorretiva')}>
            {manutencaoCorretivaTitle}
          </MenuItem>
          )
        break
      case 'ManutencaoPreventiva':
        menuItems.push(
          <MenuItem key={index} onTouchTap={() => this.handleOpenModelDisplay('ManutencaoPreventiva')}>
            {manutencaoPreventivaTitle}
          </MenuItem>
          )
        break
      case 'Maquinas':
        menuItems.push(
          <MenuItem key={index} onTouchTap={() => this.handleOpenModelDisplay('Maquinas')}>
            {maquinasTitle}
          </MenuItem>
          )
        break
      default:
        break
      }
    })
    return menuItems
  }

  selectInitialModelDisplay = (type) => {
    switch (type) {
    case master:
      break
    case admin:
      break
    case consultor:
      this.props.selectModelDisplay('ControleFinanceiro')
      break
    case enfermeiro:
      this.props.selectModelDisplay('GestaoEnfermagem')
      break
    case tecnico:
      this.props.selectModelDisplay('Maquinas')
      break
    default:
      break
    }
  }

  componentWillMount = () => {
    this.props.selectMenuLeftOpen(false)
    this.selectInitialModelDisplay(this.props.userData.type)
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.userData.type !== this.props.userData.type) {
      this.selectInitialModelDisplay(nextProps.userData.type)
    }
  }

  render () {
    const allItems = [
      'ControleAgua',
      'ControleColeta',
      'ControleDesinfeccao',
      'ControleFinanceiro',
      'Pacientes',
      'GestaoEnfermagem',
      'Erros',
      'ManutencaoCorretiva',
      'ManutencaoPreventiva',
      'Maquinas'
    ]
    let items = []
    switch (this.props.userData.type) {
    case master:
      items = allItems
      break
    case admin:
      items = allItems
      break
    case consultor:
      items = allItems
      break
    case enfermeiro:
      items = [
        'ControleDesinfeccao',
        'Pacientes',
        'GestaoEnfermagem'
      ]
      break
    case tecnico:
      items = [
        'ControleAgua',
        'ControleColeta',
        'Erros',
        'ManutencaoCorretiva',
        'ManutencaoPreventiva',
        'Maquinas'
      ]
      break
    default:
      break
    }
    return (
      <Drawer
        open={this.props.menuLeftOpen}
        docked={false}
        onRequestChange={this.props.selectMenuLeftOpen}
      >
        <AppBar title='Menu' onLeftIconButtonTouchTap={this.handleToggle} />
        {this.buildMenuItems(items)}
      </Drawer>
    )
  }
}

MenuLeft.propTypes = {
  // redux state
  menuLeftOpen: PropTypes.bool,
  userData: PropTypes.object,
  // redux actions
  selectMenuLeftOpen: PropTypes.func.isRequired,
  selectModelDisplay: PropTypes.func.isRequired
}

function mapStateToProps (state) {
  return {
    menuLeftOpen: state.menuLeftOpen,
    userData: state.userData
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    selectMenuLeftOpen: selectMenuLeftOpen,
    selectModelDisplay: selectModelDisplay
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuLeft)
