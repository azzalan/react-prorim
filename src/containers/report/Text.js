import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Item from './Item'
import ControleAgua from './lists/ControleAgua'
import ControleColeta from './lists/ControleColeta'
import ControleDesinfeccao from './lists/ControleDesinfeccao'
import Erros from './lists/Erros'
import GestaoEnfermagem from './lists/GestaoEnfermagem'
import ManutencaoCorretiva from './lists/ManutencaoCorretiva'
import Pacientes from './lists/Pacientes'

class ContainerName extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount = () => {
  }

  render () {
    const { data } = this.props
    if (data) {
      return (
        <div>
          <Item
            header='Controle coleta'
            list={<ControleColeta data={data.controleColeta} />}
          />
          <Item
            header='Controle água'
            list={<ControleAgua data={data.controleAgua} />}
          />
          <Item
            header='Controle de desinfecção'
            list={<ControleDesinfeccao data={data.controleDesinfeccao} />}
          />
          <Item
            header='Pacientes'
            list={<Pacientes data={data.pacientes} />}
          />
          <Item
            header='Gestão de enfermagem'
            list={<GestaoEnfermagem data={data.estadias} />}
          />
          <Item
            header='Erros'
            list={<Erros data={data.erros} />}
          />
          <Item
            header='Manutenção corretiva'
            list={<ManutencaoCorretiva data={data.manutencaoCorretiva} />}
          />
        </div>
      )
    } else return (null)
  }
}

ContainerName.propTypes = {
  data: PropTypes.object
}

function mapStateToProps (state) {
  return {
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ContainerName)
