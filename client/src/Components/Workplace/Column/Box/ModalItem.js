import React from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

import ItemDetails from './ItemDetails/ItemDetails';

class ModalItem extends React.Component {

  render () {
    return (
      <Modal isOpen={this.props.toggleModal}>
        <ModalHeader toggle={this.props.handleToggleModal}>{this.props.item.name}</ModalHeader>
        <ModalBody>
          <ItemDetails item={this.props.item}
            closeModal={this.props.handleToggleModal}
          ></ItemDetails>
        </ModalBody>
      </Modal>
    )
  }
}

export default ModalItem;
