import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'reactstrap';

import Button from './Button';
import FormBox from './FormBox';

class CreateBox extends React.Component {
  state = {
    isAddNew: false
  }

  ToggleAddBox = () => {
    this.setState({
      isAddNew: !this.state.isAddNew
    })
  }

  checkAddBox = () => {
    if(!this.state.isAddNew){
      return <Button AddNewBox={this.ToggleAddBox}></Button>
    }
    else{
      return <FormBox CloseNewbox={this.ToggleAddBox}></FormBox>
    }
  }

  render () {
    return(
      <Col lg={{size: 3}} className='Col-box'>
        {this.checkAddBox()}
      </Col>
    )
  }
}

export default CreateBox;
