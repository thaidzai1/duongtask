import React from 'react';
import PropTypes from 'prop-types';
import { Row, Badge, Col } from 'reactstrap';

const Button = (props) => {
  return (
    <Row className='createBox' onClick={props.AddNewBox}>
      <div className='placeholder'>
        <h1>+</h1><p>Create New Box</p>
      </div>
    </Row>
  )
}

export default Button;
