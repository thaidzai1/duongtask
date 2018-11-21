import React from 'react';
import PropTypes from 'prop-types';
import { Row } from 'reactstrap';

import HeadBox from './HeadBox';
import ListItem from './ListItem';

class Box extends React.Component {
  state = {
    listOpen: true,
    editInvoke: false
  }

  closeEditBoxName = () => {
    this.setState({
      editInvoke: false
    })
  }

  handleOpenListItem = event => {
    if(event.ctrlKey){
      this.setState({
        editInvoke: true
      })
    }
    else{
      this.setState({
        listOpen: !this.state.listOpen
      })
    }
  }

  render () {
    return(
      <Row className='box'>
        <HeadBox
          box={this.props.box}
          closeEditBox={this.closeEditBoxName}
          editInvoke={this.state.editInvoke}
          ToggleListItem={this.handleOpenListItem}
        ></HeadBox>
        <ListItem
          box={this.props.box}
          listOpen={this.state.listOpen}
        ></ListItem>
      </Row>
    )
  }
}

export default Box;
