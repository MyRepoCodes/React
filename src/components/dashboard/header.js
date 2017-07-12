import React, {Component} from 'react';

class DashboardHeader extends Component {
  render() {
    return (
      <div className="dashboard-head flex">
        <div className="side-icons">
          <a className="icon-cell active">
            <img src={require('../../assets/img/lifescore-button.png')} alt="image"/>
          </a>
          <a className="icon-cell">
            <img src={require('../../assets/img/radar-button.png')} alt="image"/>
          </a>
          <a className="icon-cell">
            <img src={require('../../assets/img/muvit-button.png')} alt="image"/>
          </a>
        </div>
        <div className="profile-cell">
          <img className="rounded-circle" src={require('../../assets/img/profile.png')} alt="Profile Image"/>
        </div>
      </div>
    );
  }
}

export default DashboardHeader;
