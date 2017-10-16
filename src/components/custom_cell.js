import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CheckIcon from 'react-material-icons/icons/navigation/check'
import FileIcon from 'react-material-icons/icons/file/file-download'

export default class CustomCell extends Component {
  render () {
    const { type, value } = this.props
    const lang = navigator.language
    if (value) {
      switch (type) {
      case 'date':
        return (<div>{new Intl.DateTimeFormat().format(new Date(value))}</div>)
      case 'time':
        let time = new Date(value)
        let hour = time.getHours()
        if (hour < 10) hour = '0' + hour
        let minutes = time.getMinutes()
        if (minutes < 10) minutes = '0' + minutes
        return (<div>{hour + ':' + minutes}</div>)
      case 'money':
        const currency = {style: 'currency', currency: 'BRL'}
        const money = new Intl.NumberFormat(lang, currency).format(value)
        return (<div>{money}</div>)
      case 'bool':
        return (
          <div className={'text-center'} id={this.props.id}>
            <CheckIcon />
          </div>
        )
      case 'file':
        return (
          <div className={'text-center'} id={this.props.id}>
            <a href={value} download><FileIcon /></a>
          </div>
        )
      default:
        return (
          <div id={this.props.id}>{value}</div>
        )
      }
    }
    return null
  }
}

CustomCell.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.any,
  id: PropTypes.number.isRequired
}
