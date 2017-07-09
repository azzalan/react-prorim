import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Card, CardTitle, CardText} from 'material-ui/Card'
import { cyan500, red300 } from 'material-ui/styles/colors'
import { prefixMaquina } from '../assets/strings'

const identificadorAzul = 'Azul'

export default class ModelDisplayCards extends Component {
  getStyle = (instance) => {
    if (instance.hasErros) {
      return {backgroundColor: red300, color: 'white'}
    }
    if (instance.disponibilidade.identificador === identificadorAzul) {
      return {backgroundColor: cyan500, color: 'white'}
    }
    return null
  }

  getColor = (instance) => {
    if (instance.hasErros) return 'white'
    if (instance.disponibilidade.identificador === identificadorAzul) {
      return 'white'
    }
    return null
  }

  render () {
    const { instance } = this.props
    return (
      <Card
        onTouchTap={this.props.handleOpenDialogEdit}
        className='col-md-3 col-sm-6 col-xs-6'
        style={this.getStyle(instance)}
      >
        <CardTitle
          title={prefixMaquina + instance.numero}
          titleColor={this.getColor(instance)}
          subtitle={instance.fabricante}
          subtitleColor={this.getColor(instance)}
          style={this.getStyle(instance)}
        />
        <CardText style={this.getStyle(instance)}>
          <p>
            Sala: {instance.sala.identificador}
          </p>
          <p>
            {instance.disponibilidade.nome}
          </p>
        </CardText>
      </Card>
    )
  }
}

ModelDisplayCards.propTypes = {
  instance: PropTypes.object.isRequired,
  handleOpenDialogEdit: PropTypes.func.isRequired
}
