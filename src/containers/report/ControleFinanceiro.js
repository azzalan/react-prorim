import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Table from '../../components/table'

import { controleFinanceiroCols } from '../../assets/controle_financeiro'
import { copyObject } from '../../assets/functions'

class ControleFinanceiroReport extends Component {
  constructor (props) {
    super(props)
    this.state = {
      cols: []
    }
  }

  setColsWidth = () => {
    const cols = copyObject(controleFinanceiroCols)
    cols.forEach((col) => {
      col.width = 50
    })
    this.setState({cols})
  }

  componentWillMount = () => {
    this.setColsWidth()
  }

  render () {
    if (this.props.data) {
      return (
        <div>
          <h4>Controle Financeiro</h4>
          <div className='ControleFinanceiroReport' ref='ControleFinanceiroReport'>
            <Table
              data={this.props.data}
              columns={this.state.cols}
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
  data: PropTypes.array
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
