import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactTable from 'react-table'

import CustomCell from './custom_cell'

import {
  table,
  anterior,
  proximo,
  carregando,
  nenhumElementoEncontrado,
  pagina,
  de,
  linhas
} from '../assets/strings'

export default class Table extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  buildCols = (cols) => {
    cols.forEach((col, index) => {
      if (col.columns) {
        col.columns = this.buildCols(col.columns)
      } else {
        if (!col.render) {
          Object.assign(col, {
            render: row => (
              <span
              >
                <CustomCell
                  id={row.index}
                  value={row.value}
                  type={col.type}
                />
              </span>
            )
          })
        }
      }
    })
    return cols
  }

  render () {
    const { data, pageSize } = this.props
    const columns = this.buildCols(this.props.columns)
    if (data) {
      return (
        <ReactTable
          className='-highlight'
          key={table}
          showPagination={this.props.showPagination || true}
          previousText={anterior}
          nextText={proximo}
          loadingText={carregando}
          noDataText={nenhumElementoEncontrado}
          pageText={pagina}
          ofText={de}
          rowsText={linhas}
          defaultPageSize={pageSize || 20}
          data={data}
          columns={columns}
          getTdProps={(state, rowInfo, column) => {
            // Checar se a coluna está preenchida e há uma função onTouchTap.
            if (rowInfo && this.props.onRowTouchTap) {
              // Checar se a célula tem um elemento clicável.
              if ((column.type !== 'file') && !column.clickable) {
                return {
                  onTouchTap: e => this.props.onRowTouchTap(rowInfo)
                }
              }
            }
            return {}
          }}
        />
      )
    }
    return null
  }
}

Table.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array.isRequired,
  onRowTouchTap: PropTypes.func,
  pageSize: PropTypes.number,
  showPagination: PropTypes.bool
}
