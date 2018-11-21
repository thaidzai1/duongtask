import React from 'react';
import PropTypes from 'prop-types';
import { Container, Col, Row } from 'reactstrap';
import { connect } from 'react-redux';

import { getUserBoxs } from '../../actions/wpActions';
import Column from './Column/Column';
import CreateBox from './CreateBox/CreateBox';

class Workplace extends React.Component {

  componentWillMount(){
    const localAuth = JSON.parse(localStorage.getItem('auth-user'));
    var userId;
    if(localAuth){
      userId = localAuth.userId;
    }
    this.props.getUserBoxs(userId);
  }

  render () {
    const {boxs} = this.props.boxs;
    return(
      <div className='workplace'>
        {
          boxs.map(box => {
            return (
              <Column
                key={box._id}
                box={box}
              ></Column>
            )
          })
        }
        <CreateBox></CreateBox>
      </div>
    )
  }
}

const mapStateToProps = state =>({
    boxs: state.boxs
})
export default connect(mapStateToProps, { getUserBoxs })(Workplace);
