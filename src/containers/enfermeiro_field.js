import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Formsy from 'formsy-react'

import FormField from '../components/form_field'

import { enfermeiroField } from '../assets/gestao_enfermagem'
import { get, post, patch } from '../assets/api_calls'
import { secaoUrl } from '../assets/urls'

class ContainerName extends Component {
  constructor (props) {
    super(props)
    this.state = {
      secao: null,
      enfermeiro: null,
      disabled: true
    }
  }

  selectFormData = (newFormData, value, field) => {
    const data = { enfermeiro: value }
    const url = secaoUrl + this.state.secao.id + '/'
    patch(url, data, this.thenSaveSecao)
  }

  resetState = () => {
    this.setState({
      secao: null,
      enfermeiro: null,
      disabled: true
    })
  }

  thenSaveSecao = (response) => {
    this.setState({
      secao: response.data,
      enfermeiro: {id: response.data.enfermeiro},
      disabled: false
    })
  }

  saveSecao = (response, filterData) => {
    if (response.data.length > 0) {
      this.setState({
        secao: response.data[0],
        enfermeiro: response.data[0].enfermeiro,
        disabled: false
      })
    } else {
      const data = filterData
      if (data.hasOwnProperty('sala') && data.hasOwnProperty('periodo') && data.hasOwnProperty('data')) {
        data.enfermeiro = null
        post(secaoUrl, filterData, this.thenSaveSecao)
      }
    }
  }

  fetchSecao = (filterData) => {
    get(secaoUrl, (r) => this.saveSecao(r, filterData), filterData)
  }

  componentDidMount = () => {
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.filterData !== this.props.filterData) {
      this.resetState()
      this.fetchSecao(nextProps.filterData)
    }
  }

  render () {
    const styles = {
      wrapper: {background: 'rgba(0,0,0,0.04)'},
      form: {
        marginLeft: '1.5em',
        paddingBottom: 30
      }
    }
    return (
      <div style={styles.wrapper}>
        <Formsy.Form
          onValid={() => {}}
          onInvalid={() => {}}
          ref='extra_filter_form'
          style={styles.form}
        >
          <FormField
            field={enfermeiroField}
            formData={{enfermeiro: this.state.enfermeiro}}
            filterData={{}}
            selectFormData={this.selectFormData}
            disabled={this.state.disabled}
          />
        </Formsy.Form>
      </div>
    )
  }
}

ContainerName.propTypes = {
  // redux state
  filterData: PropTypes.object,
  disableAddButton: PropTypes.bool
}

function mapStateToProps (state) {
  return {
    activeTableData: state.activeTableData,
    disableAddButton: state.disableAddButton,
    filterData: state.filterData
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ContainerName)
