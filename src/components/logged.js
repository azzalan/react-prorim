import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import TableControleAgua from './tables/controle_agua'
import TableControleColeta from './tables/controle_coleta'
import TableControleDesinfeccao from './tables/controle_desinfeccao'
import CustomTable from '../containers/table'
import {staticTableCols} from '../assets/static_table_cols'
import {staticTableData} from '../assets/static_table_data'
import {controleAguaCols} from '../assets/controle_agua_cols'
import {controleAguaData, controleAguaTitle} from '../assets/controle_agua_data'
import {controleColetaCols} from '../assets/controle_coleta_cols'
import {controleColetaData, controleColetaTitle} from '../assets/controle_coleta_data'
import {controleDesinfeccaoCols} from '../assets/controle_desinfeccao_cols'
import {controleDesinfeccaoData, controleDesinfeccaoTitle} from '../assets/controle_desinfeccao_data'
import {controleFinanceiroCols} from '../assets/controle_financeiro_cols'
import {controleFinanceiroData, controleFinanceiroTitle} from '../assets/controle_financeiro_data'
import {manutencaoCorretivaCols} from '../assets/manutencao_corretiva_cols'
import {manutencaoCorretivaData, manutencaoCorretivaTitle} from '../assets/manutencao_corretiva_data'
import {manutencaoPreventivaCols} from '../assets/manutencao_preventiva_cols'
import {manutencaoPreventivaData, manutencaoPreventivaTitle} from '../assets/manutencao_preventiva_data'
import {maquinasCols} from '../assets/maquinas_cols'
import {maquinasData, maquinasTitle} from '../assets/maquinas_data'


class ControleAgua extends Component {
  render() {
    return(
      <CustomTable tableTitle={controleAguaTitle} tableData={controleAguaData} tableCols={controleAguaCols}/>
    )
  }
}

class ControleColeta extends Component {
  render() {
    return(
      <CustomTable tableTitle={controleColetaTitle} tableData={controleColetaData} tableCols={controleColetaCols}/>
    )
  }
}

class ControleDesinfeccao extends Component {
  render() {
    return(
      <CustomTable tableTitle={controleDesinfeccaoTitle} tableData={controleDesinfeccaoData} tableCols={controleDesinfeccaoCols}/>
    )
  }
}

class ControleFinanceiro extends Component {
  render() {
    return(
      <CustomTable tableTitle={controleFinanceiroTitle} tableData={controleFinanceiroData} tableCols={controleFinanceiroCols}/>
    )
  }
}

class ManutencaoCorretiva extends Component {
  render() {
    return(
      <CustomTable tableTitle={manutencaoCorretivaTitle} tableData={manutencaoCorretivaData} tableCols={manutencaoCorretivaCols}/>
    )
  }
}

class ManutencaoPreventiva extends Component {
  render() {
    return(
      <CustomTable tableTitle={manutencaoPreventivaTitle} tableData={manutencaoPreventivaData} tableCols={manutencaoPreventivaCols}/>
    )
  }
}

class Maquinas extends Component {
  render() {
    return(
      <CustomTable tableTitle={maquinasTitle} tableData={maquinasData} tableCols={maquinasCols}/>
    )
  }
}

export default class Logged extends Component {
    constructor(props) {
    super(props)
    this.state = {open: true}
  }

  handleToggle = () => this.setState({open: !this.state.open})

  handleClose = () => this.setState({open: false});

  render() {
    return (
      <Router>
        <div>
          <AppBar title="My AppBar" onLeftIconButtonTouchTap={this.handleToggle}/>
          <Drawer open={this.state.open} docked={false} onRequestChange={(open) => this.setState({open})}>
            <AppBar title="Menu" onLeftIconButtonTouchTap={this.handleToggle}/>
            <Link to="/controle-agua"><MenuItem onTouchTap={this.handleClose}>{controleAguaTitle}</MenuItem></Link>
            <Link to="/controle-coleta"><MenuItem onTouchTap={this.handleClose}>{controleColetaTitle}</MenuItem></Link>
            <Link to="/controle-desinfeccao"><MenuItem onTouchTap={this.handleClose}>{controleDesinfeccaoTitle}</MenuItem></Link>
            <Link to="/controle-financeiro"><MenuItem onTouchTap={this.handleClose}>{controleFinanceiroTitle}</MenuItem></Link>
            <Link to="/manutencao-corretiva"><MenuItem onTouchTap={this.handleClose}>{manutencaoCorretivaTitle}</MenuItem></Link>
            <Link to="/manutencao-prevetiva"><MenuItem onTouchTap={this.handleClose}>{manutencaoPreventivaTitle}</MenuItem></Link>
            <Link to="/maquinas"><MenuItem onTouchTap={this.handleClose}>{maquinasTitle}</MenuItem></Link>
          </Drawer>
          <Route path="/controle-agua" component={ControleAgua}/>
          <Route path="/controle-coleta" component={ControleColeta}/>
          <Route path="/controle-desinfeccao" component={ControleDesinfeccao}/>
          <Route path="/controle-financeiro" component={ControleFinanceiro}/>
          <Route path="/manutencao-corretiva" component={ManutencaoCorretiva}/>
          <Route path="/manutencao-prevetiva" component={ManutencaoPreventiva}/>
          <Route path="/maquinas" component={Maquinas}/>
        </div>
      </Router>
    )
  }
}
