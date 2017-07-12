import React, {Component} from 'react';
import Slider from 'react-slick'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
class DashboardSlider extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    let settings = {
      dots: false,
      arrows: false,
      touchThreshold: 50,
      infinite: false
    };

    return (
      <Slider className="sliderblock flex" {...settings}>
        <div>
          <div className="circle circle1">
            <img src={require('../../assets/img/lifescore-ring-b-01.png')} alt="image1" width="170"/>
            <div className="lifescore-cell" onClick={this.toggle}>
              <h2>64</h2>
              <span>LifeScore</span>
              Report
            </div>
            <Modal isOpen={this.state.modal} toggle={this.toggle} className="full-modal lifescore-blc">
              <ModalHeader toggle={this.toggle}>
                <button className="arrow-btn">
                  <i className="fa fa-angle-left" aria-hidden="true"></i>
                </button>
                Modal title
              </ModalHeader>
              <ModalBody>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </ModalBody>
              <ModalFooter>
                <Button className="next-btn padd-r-0" onClick={this.toggle}> Next <i className="fa fa-angle-right" aria-hidden="true"></i>
                </Button> {' '}
              </ModalFooter>
            </Modal>
          </div>
        </div>
        <div>
          <div className="circle circle2">
            <img src={require('../../assets/img/radar-ring-01.png')} alt="image1" width="216"/>
            <div className="radar-switch">
              <img className="img-fluid rounded-circle" src={require('../../assets/img/profile.png')} alt="image1" width="66"/>
            </div>
          </div>
        </div>
        <div>
          <div className="circle circle3">
            <img src={require('../../assets/img/muvit-ring-01.png')} alt="image1" width="180"/>
            <div className="movit-bar-bg">
              <img className="img-fluid" src={require('../../assets/img/muvit-bg.png')} alt="Movit Background Image"/>
            </div>
            <div className="movit-bar">                
                <div className="movit-bar-rw">
                <h2>678</h2>
                <p>POINTS</p>
                </div>
                <div className="movit-bar-rw">
                <h3>2,980</h3>
                <p>CALORIES</p>
                </div>
                <div className="movit-bar-rw time-bar">
                <p>
                <span>
                <img className="img-fluid" src={require('../../assets/img/time-icons/zones-01.png')} alt="hours Icon"/>
                </span>
                <label>2.3 hrs</label>
                </p>
                <p>
                <span>
                <img className="img-fluid" src={require('../../assets/img/time-icons/zones-02.png')} alt="hours Icon"/>
                </span>
                <label>40 min</label>
                </p>
                <p>
                <span>
                <img className="img-fluid" src={require('../../assets/img/time-icons/zones-03.png')} alt="hours Icon"/>
                </span>
                <label>9 min</label>
                </p>
                </div>              
            </div>
            <div className="muvit-tracker">
              <img className="img-fluid" src={require('../../assets/img/tracker.png')} alt="Muvit Tracker Image"/>
            </div>
          </div>
        </div>
      </Slider>
    );
  }
}

export default DashboardSlider;
