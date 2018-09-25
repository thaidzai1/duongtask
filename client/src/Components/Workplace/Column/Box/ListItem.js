import React from 'react';
import PropTypes from 'prop-types';
import { Collapse, Card, CardBody } from 'reactstrap';
import { connect } from 'react-redux'

import { getBoxItems } from '../../../../actions/workplace/itemActions'
import Item from './Item';
import AddItemForm from './AddItemForm'

class ListItem extends React.Component {
  state = {
    addAnotherItem: false
  }

  componentWillMount(){
    this.props.getBoxItems(this.props.box._id);
  }

  showAddItemForm = () => {
    if(!this.state.addAnotherItem){
      return (
        <Card className='card-add-item' onClick={this.addAnotherItem}>
          <p>+ Add another item</p>
        </Card>
      )
    }
    else{
      return (
        <AddItemForm
          closeFormAddItem={this.addAnotherItem}
          boxId={this.props.box._id}
        ></AddItemForm>
      )
    }
  }

  addAnotherItem = () => {
    this.setState({
      addAnotherItem: !this.state.addAnotherItem
    })
  }

  render () {
    const {items} = this.props.items;
    return(
      <div className='list-item'>
        <Collapse isOpen={this.props.listOpen}>
        {
          items.map(item => {
            if(item.parent === this.props.box._id){
              return(
                <Item
                key={item._id}
                item={item}
                ></Item>
              )
            }
          })
        }
        {this.showAddItemForm()}
        </Collapse>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  items: state.items
})

export default connect(mapStateToProps, { getBoxItems })(ListItem);
