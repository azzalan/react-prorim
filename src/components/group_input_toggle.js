import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Toggle from 'material-ui/Toggle'

import { selectGroupInputOpen } from '../actions/index'
import { getValueDotPath, setValueDotPath } from '../assets/functions'

class GroupInputToggle extends Component {
  render () {
    const {
      field,
      selectGroupInputOpen,
      groupInputOpen
    } = this.props
    require('intl/locale-data/jsonp/pt-BR')
    const styles = {
      inputStyle: {
        marginTop: 25
      }
    }
    return (
      <Toggle
        name={field.accessor}
        key={'optional' + field.accessor}
        label={field.header}
        labelPosition='right'
        style={styles.inputStyle}
        toggled={getValueDotPath(field.accessor, groupInputOpen)}
        onToggle={(event, checked) => {
          let newGroupInputOpen = {...groupInputOpen}
          setValueDotPath(field.accessor, newGroupInputOpen, checked)
          selectGroupInputOpen(newGroupInputOpen)
        }}
      />
    )
  }
}

GroupInputToggle.propTypes = {
  field: PropTypes.object.isRequired,
  groupInputOpen: PropTypes.object,
  selectGroupInputOpen: PropTypes.func.isRequired
}

function mapStateToProps (state) {
  return {
    groupInputOpen: state.groupInputOpen
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    selectGroupInputOpen: selectGroupInputOpen
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupInputToggle)
