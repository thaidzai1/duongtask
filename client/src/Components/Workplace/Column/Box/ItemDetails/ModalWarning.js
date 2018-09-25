import React from 'react'
import PropTypes from 'prop-types'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import { connect } from 'react-redux'

import { deleteItem } from '../../../../../actions/workplace/itemActions';

class ModalWaring extends React.Component {

  DeleteItem = () => {
    console.log('delete');
    this.props.deleteItem(this.props.item._id);
    this.props.handleToggleModal();
    this.props.closeDetailModal();
  }

  render () {
    console.log(this.props);
    return(
      <Modal isOpen={this.props.toggleModal} toggle={this.props.handleToggleModal}>
        <ModalHeader toggle={this.props.handleToggleModal}>Modal title</ModalHeader>
        <ModalBody>
          {this.props.item.name} will be deleted
        </ModalBody>
        <ModalFooter>
          <Button outline color="success" block
            onClick={this.DeleteItem}
          >Yes! Do it</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, { deleteItem })(ModalWaring);
