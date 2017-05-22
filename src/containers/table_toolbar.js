import React from 'react'
import { connect } from 'react-redux'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar'

import {
  add,
  filter,
  options
} from '../assets/strings'

class TableToolbar extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  handleChange = (event, index, value) => this.setState({value});

  renderAddButton = () => {
    if (!this.props.hideAddButton) {
      return(
        <RaisedButton 
          label={add}
          primary={true} 
          onTouchTap={this.props.handleOpenDialogAdd}
          disabled={this.props.disableAddButton}
        />
      )
    }
  }

  renderFilter = () =>{
    if (!this.props.disableFilter) return (
      <ToolbarGroup firstChild={true}>
        <ToolbarTitle text={filter}/>
        <IconButton onTouchTap={this.props.toogleFilter}>
          <NavigationExpandMoreIcon />
        </IconButton>
      </ToolbarGroup>
    )
  }

  render() {
    const {tableTitle} = this.props
    return (
      <Toolbar>
        <ToolbarTitle text={tableTitle} />
        {this.renderFilter()}
        <ToolbarGroup>
          <ToolbarTitle text={options} />
          <FontIcon className='muidocs-icon-custom-sort' />
          <ToolbarSeparator />
          {this.renderAddButton()}
          <IconMenu
            iconButtonElement={
              <IconButton touch={true}>
                <NavigationExpandMoreIcon />
              </IconButton>
            }
          >
            <MenuItem primaryText="Download" />
            <MenuItem primaryText="More Info" />
          </IconMenu>
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

function mapStateToProps (state) {
  return {
    disableAddButton: state.disableAddButton
  }
}

export default connect(mapStateToProps)(TableToolbar)