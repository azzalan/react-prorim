import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Table from '../../components/table'

class TablePeriodo extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: []
    }
  }

  componentDidMount = () => {
  }

  render () {
    const style = {
      tableTitle: {
        marginLeft: '1.5em'
      }
    }
    return (
      <div>
        <h4 style={style.tableTitle}>{this.props.title}</h4>
        <Table
          data={this.props.data}
          columns={this.props.cols}
          pageSize={10}
        />
      </div>
    )
  }
}

TablePeriodo.propTypes = {
  data: PropTypes.array,
  cols: PropTypes.array,
  title: PropTypes.string.isRequired
}

function mapStateToProps (state) {
  return {
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TablePeriodo)
