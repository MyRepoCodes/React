import React, {Component} from 'react';
import Slider from 'react-slick'
import $ from 'jquery'

class Todo extends Component {

  toggleBar() {
    let toggleBar = $('.toggle-bar'),
      todoBlock = $('.todo-block');
    toggleBar.toggleClass('down');

    (toggleBar.hasClass('down'))
      ? todoBlock.stop().animate({
        bottom: '-188px'
      }, 500)
      : todoBlock.stop().animate({
        bottom: '65px'
      }, 500);
  }

  render() {
    let settings = {
      dots: false,
      arrows: false,
      touchThreshold: 50,
      infinite: false,
      centerMode: true,
      initialSlide: 1
    };

    return (
      <div className="todo-block">
        <div className="toggle-bar text-center" onClick={this.toggleBar}>
          <span></span>
        </div>
        <div className="todo-block-inner">
          <div className="sliderblock2">
            <Slider {...settings}>
              <div>
                <div className="panel-group c-panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                  <div className="panel">
                    <div className="panel-head panel-heading" role="tab">
                      <div className="panel-ttl">
                        <h2>July 2017</h2>
                        <p className="green-txt">
                          REQUIRED ACTIVITIES COMPLETED</p>
                      </div>
                      <div className="check-icon">
                        <div className="check-inner">
                          <i className="fa fa-check" aria-hidden="true"></i>
                        </div>
                      </div>
                    </div>
                    <div className="panel-inner">
                      <div className="todo-box">
                        <ul>
                          <li className="checked-list">
                            <div className="todo-head">
                              <div className="check-icon sml">
                                <div className="check-inner">
                                  <i className="fa fa-check" aria-hidden="true"></i>
                                </div>
                              </div>
                              <div className="todo-txt">
                                Register your account
                              </div>
                            </div>
                          </li>
                          <li className="checked-list">
                            <div className="todo-head">
                              <div className="check-icon sml">
                                <div className="check-inner">
                                  <i className="fa fa-check" aria-hidden="true"></i>
                                </div>
                              </div>
                              <div className="todo-txt">
                                Meet your A.I. assistant, Hannah
                              </div>
                            </div>
                          </li>
                          <li className="checked-list">
                            <div className="todo-head">
                              <div className="check-icon sml">
                                <div className="check-inner">
                                  <i className="fa fa-check" aria-hidden="true"></i>
                                </div>
                              </div>
                              <div className="todo-txt">
                                Add a photo to your profile
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="todo-head">
                              <div className="icon">
                                <img src={require('../../assets/img/book-icn-grey.png')} alt="Book Icon"/>
                              </div>
                              <div className="todo-txt">
                                Taking Ownership of Your Health
                              </div>
                            </div>
                            <div className="todo-desc">
                              <img className="img-fluid" src={require('../../assets/img/July2017.png')} alt="Health Image"/>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="panel-group c-panel-group" role="tablist" aria-multiselectable="true">
                  <div className="panel">
                    <div className="panel-heading">
                      <div className="panel-ttl">
                        <h2>August 2017</h2>
                        <p>REQUIRED ACTIVITIES STARTED</p>
                      </div>
                      <div className="check-icon">
                        <div className="check-inner  border"></div>
                      </div>
                    </div>
                    <div className="panel-inner">
                      <div className="todo-box">
                        <ul>
                          <li>
                            <div className="todo-head">
                              <div className="check-icon sml">
                                <div className="check-inner border"></div>
                              </div>
                              <div className="todo-txt">
                                Take your Depression Assessment
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="todo-head">
                              <div className="check-icon sml">
                                <div className="check-inner border"></div>
                              </div>
                              <div className="todo-txt">
                                Schedule a coaching call (for Sept)
                              </div>
                            </div>
                          </li>
                          <li></li>
                          <li>
                            <div className="todo-head">
                              <div className="icon">
                                <img src={require('../../assets/img/book-icn-grey.png')} alt="Book Icon"/>
                              </div>
                              <div className="todo-txt">
                                Living Fit
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="panel-group c-panel-group" role="tablist" aria-multiselectable="true">
                  <div className="panel">
                    <div className="panel-heading">
                      <div className="panel-ttl">
                        <h2>September 2017</h2>
                        <p className="blue-txt">Month Starts in 23 Days</p>
                      </div>
                      <div className="check-icon">
                        <div className="check-inner border">
                          <i className="fa fa-lock" aria-hidden="true"></i>
                        </div>
                      </div>
                    </div>
                    <div className="panel-inner">
                      <div className="todo-box locked-list">
                        <ul>
                          <li>
                            <div className="todo-head">
                              <div className="check-icon sml">
                                <div className="check-inner border"></div>
                              </div>
                              <div className="todo-txt">
                                Phone call with your coach
                              </div>
                            </div>
                          </li>
                          <li></li>
                          <li></li>
                          <li></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="panel-group c-panel-group" role="tablist" aria-multiselectable="true">
                  <div className="panel">
                    <div className="panel-heading">
                      <div className="panel-ttl">
                        <h2>September 2017</h2>
                        <p className="blue-txt">Month Starts in 23 Days</p>
                      </div>
                      <div className="check-icon">
                        <div className="check-inner border">
                          <i className="fa fa-lock" aria-hidden="true"></i>
                        </div>
                      </div>
                    </div>
                    <div className="panel-inner blue-bg padd-15 white-txt">
                      <div className="heading-rw layout-row">
                        <div className="icon-cell2 margin-r-15 spin-cell">
                          <img src={require('../../assets/img/hannah.png')} alt="Icon"/>
                        </div>
                        <div className="heading-txt flex">
                          <h2>Hannah</h2>
                          <p>Health Analysis Assistant</p>
                        </div>
                      </div>
                      <div className="desc-rw flex">
                        <p>I'll be calculating your activities for October soon. Please check back.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

export default Todo;
