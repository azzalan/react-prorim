import React, { Component } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { selectListToAddData } from '../actions/index'

import CustomTable from '../components/table'
import Filter from './filter'

class FormList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchData: []
    }
  }

  // Adiciona elemento selecionado para a lista toAdd.
  handleSelectSearchList = (rowInfo) => {
    let toAddData = [...this.props.listToAddData]
    toAddData.unshift(rowInfo.row)
    this.props.selectListToAddData(toAddData)
  }

  // Remove o elemento selecionado da lista toAdd.
  handleSelectlistToAdd = (rowInfo) => {
    let toAddData = [...this.props.listToAddData]
    toAddData.splice(rowInfo.index, 1)
    this.props.selectListToAddData(toAddData)
  }

  updateSearchData = (response) => {
    this.setState({searchData: response.data})
  }

  fetchSearchData = (filterData = this.props.filterData) => {
    axios.get(this.props.modelUrl, {
      params: {...filterData}
    }).then(
      this.updateSearchData
    ).catch(function (error) {
      alert(error)
    })
  }

  componentWillMount = () => {
    this.props.selectListToAddData([])
    this.fetchSearchData()
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.filterData !== nextProps.filterData) {
      this.fetchSearchData(nextProps.filterData)
    }
  }

  render () {
    return (
      <div>
        <Filter
          filterFields={this.props.searchFormFields}
          fetchTableData={this.fetchSearchData}
          filterOpen
        />
        <CustomTable
          data={this.state.searchData}
          columns={this.props.searchListCols}
          pageSize={5}
          onRowTouchTap={this.handleSelectSearchList}
        />
        <CustomTable
          data={this.props.listToAddData}
          columns={this.props.listToAddCols}
          pageSize={5}
          onRowTouchTap={this.handleSelectlistToAdd}
        />
      </div>
    )
  }
}

FormList.propTypes = {
  modelUrl: PropTypes.string.isRequired,
  searchFormFields: PropTypes.array.isRequired,
  searchListCols: PropTypes.array.isRequired,
  listToAddCols: PropTypes.array.isRequired,
  // redux state
  filterData: PropTypes.object,
  listToAddData: PropTypes.array,
  // redux actions
  selectListToAddData: PropTypes.func.isRequired
}

function mapStateToProps (state) {
  return {
    filterData: state.filterData,
    listToAddData: state.listToAddData
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    selectListToAddData
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FormList)
