import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CheckIcon from 'react-material-icons/icons/navigation/check'
import FileIcon from 'react-material-icons/icons/file/file-download'

export default class CustomCell extends Component {
  render () {
    const { type, value } = this.props
    if (value) {
      switch (type) {
      case 'date':
        let date = new Date(value)
        let day = date.getDate()
        if (day < 10) day = '0' + day
        let month = date.getMonth() + 1
        if (month < 10) month = '0' + month
        let year = date.getFullYear()
        let stringDate = day + '/' + month + '/' + year
        return (<div>{stringDate}</div>)
      case 'time':
        let time = new Date(value)
        let minutes = time.getMinutes()
        if (minutes < 10) minutes = '0' + minutes
        let hours = time.getHours()
        if (hours < 10) hours = '0' + hours
        let stringTime = hours + ':' + minutes
        return (<div>{stringTime}</div>)
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
