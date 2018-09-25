import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'reactstrap';

import Box from './Box/Box';

class Column extends React.Component {
  render () {
    return(
      <Col lg={{size: 3}} className='Col-box'>
        <Box box={this.props.box} key={this.props.box._id}></Box>
      </Col>
    )
  }
}

export default Column;
