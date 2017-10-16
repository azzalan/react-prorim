import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Table from '../../components/table'

class ControleFinanceiroReport extends Component {
  constructor (props) {
    super(props)
    this.state = {
      cols: []
    }
  }

  componentWillMount = () => {
  }

  render () {
    if (this.props.data) {
      return (
        <div>
          <h4>Controle Financeiro</h4>
          <div className='ControleFinanceiroReport' ref='ControleFinanceiroReport'>
            <Table
              data={this.props.data}
              columns={this.props.cols}
              showPagination={false}
              pageSize={this.props.data.length}
            />
          </div>
        </div>
      )
    } else return (null)
  }
}

ControleFinanceiroReport.propTypes = {
  data: PropTypes.array,
  cols: PropTypes.array
}

function mapStateToProps (state) {
  return {
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ControleFinanceiroReport)
