import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import ModelDisplayToogle from '../../containers/model_display_toggle/_'

import { agendamentosTitle, consultor } from '../../assets/strings'
import { agendamentosFilter } from '../../assets/agendamentos'
import { getValueDotPath } from '../../assets/functions'

class ContainerName extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount = () => {
  }

  render () {
    const userType = getValueDotPath('type', this.props.userData)
    const isConsultor = userType === consultor
    return (
      <div>
        <ModelDisplayToogle
          title={agendamentosTitle}
          filterFields={agendamentosFilter}
          disableAddButton={isConsultor}
          disableEdit={isConsultor}
        />
      </div>
    )
  }
}

ContainerName.propTypes = {
  userData: PropTypes.object
}

function mapStateToProps (state) {
  return {
    userData: state.userData
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ContainerName)
