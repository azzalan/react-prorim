import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import {
  selectModelData,
  selectGroupInputOpen,
  selectFormData,
  selectDialogEditIsOpen,
  selectDialogAddIsOpen
} from '../actions/index'

import DialogAdd from './dialog_add'
import DialogEdit from './dialog_edit'
import ModelCard from '../components/model_card'
import ModelToolbar from './model_toolbar'

import { get } from '../assets/api_calls'

class ModelDisplayCards extends Component {
  constructor (props) {
    super(props)
    this.state = {
      modelData: [],
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

  sortModelData = (modelData) => {
    let redModelData = []
    let clearModelData = []
    modelData.forEach((instance) => {
      const { erros } = instance
      for (let i in erros) {
        if (erros[i].manutencaoCorretiva) {
          if (erros[i].manutencaoCorretiva.acao === null) {
            instance.hasErros = true
            redModelData.push(instance)
            return null
          }
        } else {
          console.log(erros[i])
          console.log('Essa instância de erro teva sua manutenção corretiva incorretamente deletada.')
        }
      }
      clearModelData.push(instance)
    })
    let sortedModelData = [...redModelData, ...clearModelData]
    this.setState({modelData: sortedModelData})
  }

  updateData = (response) => {
    this.sortModelData(response.data)
  }

  fetchModelData = () => {
    get(this.props.modelUrl, this.updateData)
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
    this.fetchModelData()
  }

  render () {
    return (
      <div>
        <ModelToolbar
          modelTitle={this.props.modelTitle}
          handleOpenDialogAdd={this.handleOpenDialogAdd}
          hideAddButton={this.props.hideAddButton}
          toogleFilter={this.toogleFilter}
          tableCols={this.props.tableCols}
          data={this.state.modelData || []}
        />
        {this.renderCards()}
        <DialogAdd
          dialogOpen={this.state.dialogAddOpen}
          handleCloseDialog={() => this.setState({dialogAddOpen: false})}
          fields={this.props.formFields}
          modelUrl={this.props.modelUrl}
          fetchModelData={this.fetchModelData}
        />
        <DialogEdit
          handleCloseDialog={() => this.setState({dialogEditOpen: false})}
          fields={this.props.formFields}
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
  formFields: PropTypes.array.isRequired,
  tableCols: PropTypes.array.isRequired,
  disableEdit: PropTypes.bool,
  // redux actions
  selectFormData: PropTypes.func.isRequired,
  selectGroupInputOpen: PropTypes.func.isRequired,
  selectModelData: PropTypes.func.isRequired,
  selectDialogEditIsOpen: PropTypes.func.isRequired,
  selectDialogAddIsOpen: PropTypes.func.isRequired
}

function mapStateToProps (state) {
  return {
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    selectModelData,
    selectGroupInputOpen,
    selectFormData,
    selectDialogEditIsOpen,
    selectDialogAddIsOpen
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ModelDisplayCards)
