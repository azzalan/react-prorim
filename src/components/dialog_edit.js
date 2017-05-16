import React from 'react'
import axios from 'axios'

import FormDialog from '../containers/form_dialog'

export default class DialogEdit extends React.Component {

  submitForm = (data) => {
    data['csrfmiddlewaretoken'] = "{{ csrf_token }}"
    this.props.tableCols.map( (col, index) => {
      if (col.readOnlyButRequired) {
        if (col.type==='obj') data[col.accessor] = this.props.values[col.accessor].id
        else data[col.accessor] = this.props.values[col.accessor]
      }
      return null
    })
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
