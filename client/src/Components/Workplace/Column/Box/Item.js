import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody } from 'reactstrap';

import ModalItem from './ModalItem';
class Item extends React.Component {
  state = {
    toggleModalItem: false
  }

  OpenModalItem = () => {
    this.setState({
      toggleModalItem: !this.state.toggleModalItem
    });
  }

  render () {
    return (
      <div className='card-item'>
        <Card onClick={this.OpenModalItem}>
          <p>{this.props.item.name}</p>
        </Card>
        <ModalItem
          item={this.props.item}
          toggleModal={this.state.toggleModalItem}
          handleToggleModal={this.OpenModalItem}
        ></ModalItem>
      </div>
    )
  }
}

export default Item;
