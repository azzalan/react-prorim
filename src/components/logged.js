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
                <Link to="/controle-agua"><MenuItem onTouchTap={this.handleClose}>Controle de água</MenuItem></Link>
                <Link to="/controle-coleta"><MenuItem onTouchTap={this.handleClose}>Controle de coleta</MenuItem></Link>
                <Link to="/controle-desinfeccao"><MenuItem onTouchTap={this.handleClose}>Controle de desinfatação</MenuItem></Link>
                <Link to="/table"><MenuItem onTouchTap={this.handleClose}>Table</MenuItem></Link>
              </Drawer>
              <Route path="/controle-agua" component={TableControleAgua}/>
              <Route path="/controle-coleta" component={TableControleColeta}/>
              <Route path="/controle-desinfeccao" component={TableControleDesinfeccao}/>
              <Route path="/table" component={CustomTable}/>
            </div>
          </Router>
        )
    }
}
