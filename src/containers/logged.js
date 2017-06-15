import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'

import { logout } from '../actions/index'
import CustomTable from './table'
import {controleAguaCols} from '../assets/controle_agua_cols'
import {controleColetaCols} from '../assets/controle_coleta_cols'
import {controleDesinfeccaoCols} from '../assets/controle_desinfeccao_cols'
// import {controleFinanceiroCols} from '../assets/controle_financeiro_cols'
import {gestaoEnfermagemCols} from '../assets/gestao_enfermagem_cols'
import {manutencaoCorretivaCols} from '../assets/manutencao_corretiva_cols'
import {manutencaoPreventivaCols} from '../assets/manutencao_preventiva_cols'
import {maquinasCols} from '../assets/maquinas_cols'
import {apiUrl} from '../assets/urls'
import {
  controleAguaTitle,
  controleColetaTitle,
  controleDesinfeccaoTitle,
  controleFinanceiroTitle,
  manutencaoCorretivaTitle,
  manutencaoPreventivaTitle,
  maquinasTitle,
  gestaoEnfermagemTitle
} from '../assets/strings'

class ControleAgua extends Component {
  render () {
    const tableUrl = apiUrl + 'controle-agua/'
    return (
      <CustomTable
        tableUrl={tableUrl}
        tableTitle={controleAguaTitle}
        tableCols={controleAguaCols}
        disableAddButton={false}
        disableFilter
      />
    )
  }
}

class ControleColeta extends Component {
  render () {
    const tableUrl = apiUrl + 'controle-coleta/'
    return (
      <CustomTable
        tableUrl={tableUrl}
        tableTitle={controleColetaTitle}
        tableCols={controleColetaCols}
        disableAddButton={false}
        disableFilter
      />
    )
  }
}

class ControleDesinfeccao extends Component {
  render () {
    const tableUrl = apiUrl + 'controle-desinfeccao/'
    return (
      <CustomTable
        tableUrl={tableUrl}
        tableTitle={controleDesinfeccaoTitle}
        tableCols={controleDesinfeccaoCols}
        disableAddButton={false}
        disableFilter
      />
    )
  }
}

class ControleFinanceiro extends Component {
  render () {
    return (
      <div />
      /* <CustomTable
        tableTitle={controleFinanceiroTitle}
        tableData={controleFinanceiroData}
        tableCols={controleFinanceiroCols}
        disableAddButton={false}
        disableFilter={true}
      /> */
    )
  }
}

class GestaoEnfermagem extends Component {
  render () {
    const tableUrl = apiUrl + 'estadia/'
    return (
      <CustomTable
        tableUrl={tableUrl}
        tableTitle={gestaoEnfermagemTitle}
        tableCols={gestaoEnfermagemCols}
        disableAddButton={false}
      />
    )
  }
}

class ManutencaoCorretiva extends Component {
  render () {
    const tableUrl = apiUrl + 'manutencao-corretiva/'
    return (
      <CustomTable
        tableUrl={tableUrl}
        tableTitle={manutencaoCorretivaTitle}
        tableCols={manutencaoCorretivaCols}
        disableAddButton
        disableFilter
      />
    )
  }
}

class ManutencaoPreventiva extends Component {
  render () {
    const tableUrl = apiUrl + 'manutencao-preventiva/'
    return (
      <CustomTable
        tableUrl={tableUrl}
        tableTitle={manutencaoPreventivaTitle}
        tableCols={manutencaoPreventivaCols}
        disableAddButton
        disableFilter
      />
    )
  }
}

class Maquinas extends Component {
  render () {
    const tableUrl = apiUrl + 'maquina/'
    return (
      <CustomTable
        tableUrl={tableUrl}
        tableTitle={maquinasTitle}
        tableCols={maquinasCols}
        disableAddButton={false}
        disableFilter
      />
    )
  }
}

class Logged extends Component {
  constructor (props) {
    super(props)
    this.state = {open: true}
  }

  handleToggle = () => this.setState({open: !this.state.open})

  handleClose = () => this.setState({open: false});

  handleSair = () => this.props.logout()

  renderRightMenu = () => (
    <IconMenu
      iconButtonElement={
        <IconButton><MoreVertIcon /></IconButton>
      }
      targetOrigin={{horizontal: 'right', vertical: 'top'}}
      anchorOrigin={{horizontal: 'right', vertical: 'top'}}
    >
      <MenuItem primaryText='Sair' onTouchTap={this.handleSair} />
    </IconMenu>
  )

  render () {
    return (
      <Router>
        <div>
          <AppBar title='Pro Rim'
            onLeftIconButtonTouchTap={this.handleToggle}
            iconElementRight={this.renderRightMenu()}
          />
          <Drawer open={this.state.open} docked={false} onRequestChange={(open) => this.setState({open})}>
            <AppBar title='Menu' onLeftIconButtonTouchTap={this.handleToggle} />
            <Link to='/controle-agua'>
              <MenuItem onTouchTap={this.handleClose}>
                {controleAguaTitle}
              </MenuItem>
            </Link>
            <Link to='/controle-coleta'>
              <MenuItem onTouchTap={this.handleClose}>
                {controleColetaTitle}
              </MenuItem>
            </Link>
            <Link to='/controle-desinfeccao'>
              <MenuItem onTouchTap={this.handleClose}>
                {controleDesinfeccaoTitle}
              </MenuItem>
            </Link>
            <Link to='/controle-financeiro'>
              <MenuItem onTouchTap={this.handleClose}>
                {controleFinanceiroTitle}
              </MenuItem>
            </Link>
            <Link to='/gestao-enfermagem'>
              <MenuItem onTouchTap={this.handleClose}>
                {gestaoEnfermagemTitle}
              </MenuItem>
            </Link>
            <Link to='/manutencao-corretiva'>
              <MenuItem onTouchTap={this.handleClose}>
                {manutencaoCorretivaTitle}
              </MenuItem>
            </Link>
            <Link to='/manutencao-prevetiva'>
              <MenuItem onTouchTap={this.handleClose}>
                {manutencaoPreventivaTitle}
              </MenuItem>
            </Link>
            <Link to='/maquinas'>
              <MenuItem onTouchTap={this.handleClose}>
                {maquinasTitle}
              </MenuItem>
            </Link>
          </Drawer>
          <Route path='/controle-agua' component={ControleAgua} />
          <Route path='/controle-coleta' component={ControleColeta} />
          <Route path='/controle-desinfeccao' component={ControleDesinfeccao} />
          <Route path='/controle-financeiro' component={ControleFinanceiro} />
          <Route path='/gestao-enfermagem' component={GestaoEnfermagem} />
          <Route path='/manutencao-corretiva' component={ManutencaoCorretiva} />
          <Route path='/manutencao-prevetiva' component={ManutencaoPreventiva} />
          <Route path='/maquinas' component={Maquinas} />
        </div>
      </Router>
    )
  }
}

Logged.propTypes = {
  logout: PropTypes.func.isRequired
}

function mapStateToProps (state) {
  return {}
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    logout: logout
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Logged)
