import React from 'react'
import axios from 'axios'

import FormDialog from '../containers/form_dialog'

export default class DialogAdd extends React.Component {

  submitForm = (data) => {
    data['csrfmiddlewaretoken'] = "{{ csrf_token }}"
    axios.post(this.props.tableUrl, data).then(
      this.props.fetchTableData
    ).catch(function(error){alert(error)})
    // this.props.selectTableData([...this.props.activeTableData, data])
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