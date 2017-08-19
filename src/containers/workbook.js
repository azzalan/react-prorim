import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Workbook from 'react-excel-workbook'

class ContainerName extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  buildCols = (modelCols, cols, prefix = '') => {
    modelCols.forEach((col, index) => {
      if (col.columns) {
        this.buildCols(col.columns, cols, col.header + '|')
      } else {
        const addCol = (
          <Workbook.Column
            label={prefix + col.header}
            value={col.accessor}
            key={index}
          />
        )
        cols.push(addCol)
      }
    })
  }

  componentDidMount = () => {
  }

  render () {
    const cols = []
    this.buildCols(this.props.cols, cols)
    return (
      <Workbook
        filename={this.props.filename}
        element={this.props.element}
      >
        <Workbook.Sheet data={this.props.data} name='Sheet A'>
          {cols}
        </Workbook.Sheet>
      </Workbook>
    )
  }
}

ContainerName.propTypes = {
  element: PropTypes.any,
  filename: PropTypes.string.isRequired,
  data: PropTypes.array,
  cols: PropTypes.array.isRequired
}

function mapStateToProps (state) {
  return {
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ContainerName)
