import React, { Component } from 'react';

class Footer1 extends Component {
  render() {
    return (
      <div className="footer-menu">
        <a href="#" className="menu-icon">
          <img src={require('../../assets/img/home-icn.png')} alt="Home Icon"/>
        </a>
        <a href="#" className="menu-icon">
          <img src={require('../../assets/img/book-icn.png')} alt="Book Icon"/>
        </a>
        <a href="#" className="menu-icon">
          <img src={require('../../assets/img/mail-icn.png')} alt="Mail Icon"/>
        </a>
        <a href="#" className="menu-icon">
          <img src={require('../../assets/img/user-icn.png')} alt="User Icon"/>
        </a>
      </div>
    );
  }
}

export default Footer1;
