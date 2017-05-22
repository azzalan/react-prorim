import React from 'react'
import axios from 'axios'

import FormDialog from '../containers/form_dialog'

export default class DialogAdd extends React.Component {

  getValueInDepth = (dotPath, value) => {
    if(dotPath) return dotPath.split('.').reduce((o,i)=>o[i], value)
  }

  setValueInDepth = (accessor, data, value) => {
    const dotPath = accessor.split('.')
    let length = dotPath.length
    if(length===2) {
      if(!data[dotPath[0]]) data[dotPath[0]] = {}
      data[dotPath[0]][dotPath[1]] = value
    }
  }

  addFilterRequired = (cols, data) => {
    const values = this.props.filterValues
    cols.map( (col, index) => {
      if (col.columns) this.addFilterRequired(col.columns, data)
      else if (col.required) {
        let value
        if(col.depth) {
          value = this.getValueInDepth(col.accessor, values)
          this.setValueInDepth(col.accessor, data, value)
        } else {
          data[col.accessor] = values[col.accessor]
        }
      }
      return null
    })
  }

  submitForm = (data) => {
    data['csrfmiddlewaretoken'] = "{{ csrf_token }}"
    this.addFilterRequired(this.props.tableCols, data)
    console.log(data)
    axios.post(this.props.tableUrl, data).then(
      this.props.fetchTableData
    ).catch(function(error){alert(error)})
    this.props.handleCloseDialog()
  }

  render() {
    return (
      <FormDialog
        {...this.props}
        submitForm={this.submitForm}
        title={'Adicionar'}
      />
    )
  }
}