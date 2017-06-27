import React, { Component } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import {Card, CardTitle, CardText} from 'material-ui/Card'
import { cyan200 } from 'material-ui/styles/colors'

export default class CardsDisplay extends Component {
  constructor (props) {
    super(props)
    this.state = {
      modelData: null
    }
  }

  fetchModelData = () => {
    axios.get(this.props.modelUrl).then((response) => {
      const modelData = response.data
      this.setState({modelData})
      console.log(modelData)
    }
    ).catch(function (error) {
      alert(error)
    })
  }

  renderCards = () => {
    let cards = null
    const styles = {
      primaryStyle: {
        backgroundColor: cyan200
      }
    }
    const {modelData} = this.state
    if (modelData) {
      cards = modelData.map((instance, index) => (
        <Card
          className='col-md-3 col-sm-6'
          style={styles.primaryStyle}
          key={index}
        >
          <CardTitle
            title={'Máquina ' + instance.numero}
            subtitle={instance.fabricante}
          />
          <CardText>
            <p>
              Sala: 1
            </p>
            <p>
              Disponibilidade: {instance.disponibilidade.nome}
            </p>
            <p>
              Sem erros.
            </p>
          </CardText>
        </Card>
      ))
    }
    return cards
  }

  componentDidMount = () => {
    this.fetchModelData()
  }

  render () {
    return (
      <div>
        {this.renderCards()}
      </div>
    )
  }
}

CardsDisplay.propTypes = {
  modelUrl: PropTypes.string.isRequired
}
