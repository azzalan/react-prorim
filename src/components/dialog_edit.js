import React from 'react'
import axios from 'axios'

import FormDialog from '../containers/form_dialog'

export default class DialogEdit extends React.Component {

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

  addRequired = (cols, data) => {
    const {values} = this.props
    cols.map( (col, index) => {
      if (col.columns) this.addRequired(col.columns, data)
      else if (col.required||col.requiredEdit) {
        let value
        if(col.depth) {
          if(values[col.accessor]) {
            value = this.getValueInDepth(col.accessor, values)
            this.setValueInDepth(col.accessor, data, value)
          }
        } else if (col.type==='obj') {
          if(values[col.accessor]) {
            data[col.accessor] = values[col.accessor].id
          }
        } else if (col.type==='erro') {
          if(values.erro) {
            data.erroId = values.erro.id
          }
        } else {
          data[col.accessor] = values[col.accessor]
        }
      }
      return null
    })
  }

  submitForm = (data) => {
    data['csrfmiddlewaretoken'] = "{{ csrf_token }}"
    this.addRequired(this.props.tableCols, data)
    console.log(data)
    axios.put(this.props.tableUrl+this.props.values.id+'/', data).then(
      this.props.fetchTableData
    ).catch(function(error){alert(error)})
    this.props.handleCloseDialog()
  }

  deleteForm = () => {
    axios.delete(this.props.tableUrl+this.props.values.id+'/').then(
      this.props.fetchTableData
    ).catch(function(error){alert(error)})
    this.props.handleCloseDialog()
  }

  render() {
    return (
      <FormDialog
        {...this.props}
        enableDelete={true}
        deleteAction={this.deleteForm}
        submitForm={this.submitForm}
        title={'Editar'}
      />
    )
  }
}
