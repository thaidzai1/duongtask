import React, { Component } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem } from 'reactstrap';
import { NavLink as NavBarLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { logout } from '../../actions/authAction';

class AppNavBar extends Component {
  state = {
    isCollapse: false
  }

  toggleNavbar = () => {
    this.setState({
      isCollapse: !this.state.isCollapse
    });
  }

  LogMeOut = () => {
    localStorage.removeItem('auth-user');
    this.props.logout();
  }

  render () {
    return (
      <Navbar color="transparent" dark expand="sm" fixed='top'>
        <NavbarBrand href='/' className='mr-auto'>TW-corp</NavbarBrand>
        <NavbarToggler onClick={this.toggleNavbar} className='mr-2'></NavbarToggler>
        <Collapse isOpen={this.state.isCollapse} navbar>
          <Nav navbar className='nav'>
            <NavItem>
              <NavBarLink to='/' exact>WorkPlace</NavBarLink>
            </NavItem>
            <NavItem>
              <NavBarLink to='/communicate' exact>Communicate...</NavBarLink>
            </NavItem>
            <NavItem className='personal'>
              <NavBarLink to='/test' exact>{this.props.user.username}</NavBarLink>
            </NavItem>
            <NavItem className='personal'>
              <NavBarLink
                to='/' exact
                onClick={this.LogMeOut}
              >Logout</NavBarLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = state => ({
  // user = state.user
});

export default connect(mapStateToProps, { logout })(AppNavBar);
