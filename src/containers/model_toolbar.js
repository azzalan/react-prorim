import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more'
import RaisedButton from 'material-ui/RaisedButton'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar'
// import IconMenu from 'material-ui/IconMenu'
// import MenuItem from 'material-ui/MenuItem'

import {
  add,
  filter,
  options
} from '../assets/strings'

class ModelToolbar extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  handleChange = (event, index, value) => this.setState({value});

  renderAddButton = () => {
    if (!this.props.hideAddButton) {
      return (
        <ToolbarGroup>
          <ToolbarTitle text={options} />
          <FontIcon className='muidocs-icon-custom-sort' />
          <ToolbarSeparator />
          <RaisedButton
            label={add}
            primary
            onTouchTap={this.props.handleOpenDialogAdd}
            disabled={this.props.disableAddButton}
          />
        </ToolbarGroup>

      )
    }
  }

  renderFilter = () => {
    if (this.props.showFilterToogle) {
      return (
        <ToolbarGroup firstChild>
          <ToolbarTitle text={filter} />
          <IconButton onTouchTap={this.props.toogleFilter}>
            <NavigationExpandMoreIcon />
          </IconButton>
        </ToolbarGroup>
      )
    }
  }

  render () {
    const {modelTitle} = this.props
    // const arrow = (
    //   <IconMenu
    //     iconButtonElement={
    //       <IconButton touch>
    //         <NavigationExpandMoreIcon />
    //       </IconButton>
    //     }
    //   >
    //     <MenuItem primaryText='Download' />
    //     <MenuItem primaryText='More Info' />
    //   </IconMenu>
    // )
    return (
      <Toolbar>
        <ToolbarTitle text={modelTitle} />
        {this.renderFilter()}
        {this.renderAddButton()}
      </Toolbar>
    )
  }
}

ModelToolbar.propTypes = {
  hideAddButton: PropTypes.bool,
  handleOpenDialogAdd: PropTypes.func.isRequired,
  disableAddButton: PropTypes.bool,
  showFilterToogle: PropTypes.array,
  toogleFilter: PropTypes.func,
  modelTitle: PropTypes.string.isRequired
}

function mapStateToProps (state) {
  return {
    disableAddButton: state.disableAddButton
  }
}

export default connect(mapStateToProps)(ModelToolbar)
