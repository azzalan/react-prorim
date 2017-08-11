import React, { Component } from 'react'
import axios from 'axios'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import {
  selectModelData,
  selectGroupInputOpen,
  selectFormData,
  selectChoices,
  selectDialogEditIsOpen,
  selectDialogAddIsOpen
} from '../actions/index'

import DialogAdd from './dialog_add'
import DialogEdit from './dialog_edit'
import ModelCard from '../components/model_card'
import ModelToolbar from './model_toolbar'
import { apiUrl } from '../assets/urls'
import { setValueDotPath } from '../assets/functions'

class ModelDisplayCards extends Component {
  constructor (props) {
    super(props)
    this.state = {
      modelData: null,
      dialogAddOpen: false
    }
  }

  handleOpenDialogEdit = (instance) => {
    this.props.selectGroupInputOpen({})
    this.props.selectFormData(instance)
    this.props.selectDialogEditIsOpen(true)
  }

  handleOpenDialogAdd = () => {
    const { selectGroupInputOpen, selectFormData } = this.props
    selectGroupInputOpen({})
    selectFormData({})
    this.props.selectDialogAddIsOpen(true)
  }

  buildChoices = (cols) => {
    let { selectChoices, choices } = this.props
    if (choices === null) choices = {}
    cols.forEach((col, index) => {
      if (col.fields) this.buildChoices(col.columns)
      else if (col.choicesUrl) {
        axios.get(apiUrl + col.choicesUrl).then((response) => {
          let newChoices = {...this.props.choices}
          setValueDotPath(col.accessor, newChoices, response.data)
          selectChoices(newChoices)
        }).catch(function (error) { alert(error) })
      }
    })
  }

  sortModelData = (modelData) => {
    let redModelData = []
    let clearModelData = []
    modelData.forEach((instance) => {
      const { erros } = instance
      for (let i in erros) {
        if (erros[i].manutencaoCorretiva.acao === null) {
          instance.hasErros = true
          redModelData.push(instance)
          return null
        }
      }
      clearModelData.push(instance)
    })
    let sortedModelData = [...redModelData, ...clearModelData]
    this.setState({modelData: sortedModelData})
  }

  fetchModelData = () => {
    axios.get(this.props.modelUrl).then((response) => {
      this.sortModelData(response.data)
    }).catch(function (error) {
      alert(error)
    })
  }

  renderCards = () => {
    const {modelData} = this.state
    if (modelData) {
      return modelData.map((instance, index) => (
        <ModelCard
          instance={instance}
          key={index}
          handleOpenDialogEdit={() => this.handleOpenDialogEdit(instance)}
        />
      ))
    }
    return null
  }

  updateModelData = (response) => {
    this.props.selectModelData(response.data)
  }

  componentWillMount = () => {
    this.props.selectChoices(null)
    this.fetchModelData()
    this.buildChoices(this.props.formFields)
  }

  render () {
    return (
      <div>
        <ModelToolbar
          modelTitle={this.props.modelTitle}
          handleOpenDialogAdd={this.handleOpenDialogAdd}
          hideAddButton={this.props.hideAddButton}
          toogleFilter={this.toogleFilter}
        />
        {this.renderCards()}
        <DialogAdd
          dialogOpen={this.state.dialogAddOpen}
          handleCloseDialog={() => this.setState({dialogAddOpen: false})}
          fields={this.props.formFields}
          choices={this.state.choices}
          modelUrl={this.props.modelUrl}
          fetchModelData={this.fetchModelData}
        />
        <DialogEdit
          handleCloseDialog={() => this.setState({dialogEditOpen: false})}
          fields={this.props.formFields}
          choices={this.state.choices}
          modelUrl={this.props.modelUrl}
          fetchModelData={this.fetchModelData}
          disabled={this.props.disableEdit}
        />
      </div>
    )
  }
}

ModelDisplayCards.propTypes = {
  modelUrl: PropTypes.string.isRequired,
  modelTitle: PropTypes.string.isRequired,
  hideAddButton: PropTypes.any,
  formFields: PropTypes.array,
  disableEdit: PropTypes.bool,
  // redux state
  choices: PropTypes.object,
  // redux actions
  selectChoices: PropTypes.func.isRequired,
  selectFormData: PropTypes.func.isRequired,
  selectGroupInputOpen: PropTypes.func.isRequired,
  selectModelData: PropTypes.func.isRequired,
  selectDialogEditIsOpen: PropTypes.func.isRequired,
  selectDialogAddIsOpen: PropTypes.func.isRequired
}

function mapStateToProps (state) {
  return {
    modelData: state.modelData,
    choices: state.choices
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    selectModelData,
    selectGroupInputOpen,
    selectFormData,
    selectChoices,
    selectDialogEditIsOpen,
    selectDialogAddIsOpen
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ModelDisplayCards)
