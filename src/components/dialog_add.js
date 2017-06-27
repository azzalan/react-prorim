import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

import FormDialog from '../containers/form_dialog'

export default class DialogAdd extends Component {
  getValueInDepth = (dotPath, value) => {
    if (dotPath) return dotPath.split('.').reduce((o, i) => o[i], value)
  }

  setValueInDepth = (accessor, data, value) => {
    const dotPath = accessor.split('.')
    let length = dotPath.length
    if (length === 2) {
      if (!data[dotPath[0]]) data[dotPath[0]] = {}
      data[dotPath[0]][dotPath[1]] = value
    }
  }

  addFilterRequired = (cols, data) => {
    const values = this.props.filterValues
    cols.forEach((col) => {
      if (col.columns) this.addFilterRequired(col.columns, data)
      else if (col.required) {
        let value
        if (col.depth) {
          value = this.getValueInDepth(col.accessor, values)
          this.setValueInDepth(col.accessor, data, value)
        } else {
          data[col.accessor] = values[col.accessor]
        }
      }
    })
  }

  addFiles = (formData) => {
    const { tableCols } = this.props
    let hasFormData = false
    tableCols.forEach((col) => {
      if (col.type === 'file') {
        let file = document.getElementById(col.accessor).files[0]
        if (file) {
          hasFormData = true
          formData.append(col.accessor, file)
        }
      }
    })
    return hasFormData
  }

  saveFiles = (formData, id) => {
    const config = {
      headers: { 'content-type': 'multipart/form-data' }
    }
    axios.put(this.props.tableUrl + 'file/' + id + '/', formData, config).then(
      this.props.fetchTableData
    ).catch(function (error) { alert(error) })
  }

  submitForm = (data) => {
    data['csrfmiddlewaretoken'] = '{{ csrf_token }}'
    const formData = new FormData()
    this.addFilterRequired(this.props.tableCols, data)
    let hasFormData = this.addFiles(formData)
    axios.post(this.props.tableUrl, data).then(
      (response) => {
        if (hasFormData) this.saveFiles(formData, response.data.id)
        else this.props.fetchTableData()
      }
    ).catch(function (error) { alert(error) })
    this.props.handleCloseDialog()
  }

  render () {
    return (
      <FormDialog
        {...this.props}
        submitForm={this.submitForm}
        title={'Adicionar'}
      />
    )
  }
}

DialogAdd.propTypes = {
  filterValues: PropTypes.object,
  tableCols: PropTypes.array.isRequired,
  tableUrl: PropTypes.string.isRequired,
  fetchTableData: PropTypes.func.isRequired,
  handleCloseDialog: PropTypes.func.isRequired
}
