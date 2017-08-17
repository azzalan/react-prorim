import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import ControleAgua from '../components/model_display/controle_agua'
import ControleColeta from '../components/model_display/controle_coleta'
import ControleDesinfeccao from '../components/model_display/controle_desinfeccao'
import ControleFinanceiro from '../components/model_display/controle_financeiro'
import GestaoEnfermagem from '../components/model_display/gestao_enfermagem'
import ManutencaoCorretiva from '../components/model_display/manutencao_corretiva'
import ManutencaoPreventiva from '../components/model_display/manutencao_preventiva'
import Maquinas from '../components/model_display/maquinas'
import Pacientes from '../components/model_display/pacientes'
import Erros from '../components/model_display/erros'
import Report from './report/_'

class Display extends Component {
  render () {
    switch (this.props.modelDisplay) {
    case 'ControleAgua':
      return (<ControleAgua />)
    case 'ControleColeta':
      return (<ControleColeta />)
    case 'ControleDesinfeccao':
      return (<ControleDesinfeccao />)
    case 'ControleFinanceiro':
      return (<ControleFinanceiro />)
    case 'Pacientes':
      return (<Pacientes />)
    case 'GestaoEnfermagem':
      return (<GestaoEnfermagem />)
    case 'Erros':
      return (<Erros />)
    case 'ManutencaoCorretiva':
      return (<ManutencaoCorretiva />)
    case 'ManutencaoPreventiva':
      return (<ManutencaoPreventiva />)
    case 'Maquinas':
      return (<Maquinas />)
    case 'Relatorio':
      return (<Report />)
    default:
      return null
    }
  }
}

Display.propTypes = {
  modelDisplay: PropTypes.string
}

function mapStateToProps (state) {
  return {
    modelDisplay: state.modelDisplay
  }
}

export default connect(mapStateToProps)(Display)
