import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typist from 'react-typist';
import { registerChat } from '../../actions/register';
import {connect} from 'react-redux';
import HannahChatHead from './hannah-chat-head';
import { Link } from 'react-router-dom';

class RegisterForm extends Component {
    constructor(props){
        super(props);
        this.submitForm = this.submitForm.bind(this);
    }
    componentWillMount(){
      const { registerChat } = this.props;
      registerChat()
    }
        submitForm(e){
         // alert(1);
        }
  render() {
    let chatArray = [];
    if(this.props.data){
      let chatData = this.props.data;
      chatArray.push(chatData[0].st_text);
    }
    return (
        <div className="chat-wrapper  layout-column  flex">
          <div className="chat-wrapper-inner flex layout-column">
            <HannahChatHead/>                                     
            <div className="chat-room scroll flex">

              {this.props.data ? 
                <Typist>
                  {chatArray.map(obj => (             
                    <div className="chat-rw">
                      <div className="chat-bubble">
                        {obj}
                      </div>
                    </div>
                  ))}
                </Typist>
                : ' '
              }           
           
              <div className="chat-rw layout-row">
                <div className="chat-bubble chat-bubble-r align-rt dark-blue">
                  {this.props.data ? 
                    <Typist>
                  
                    </Typist>
                    : ' '
                  }
                </div>
              </div>
               <div className="chat-inputbox layout-row">
              <textarea className="flex" placeholder="Type your message."></textarea>
              <button className="chatsend-btn" onClick={ this.submitForm }>
                <img src={require('../../assets/img/arrow.svg')} alt="Arrow Icon" />    
              </button>
            </div>
            </div>           
          </div>
          <div className="chat-tag-rw">
          <a href="#" className="chat-tag-btn dark-blue">Yes Please</a>
          <a href="#" className="chat-tag-btn dark-blue">Not right now thank you</a>
          </div>
        </div>
    );
  }
}

function mapStateToProps(state) {
  return{
    statusText : state.register.statusText,
    isAuthenticating : state.register.isAuthenticating,
    data: state.register.data
  }
}

RegisterForm.propTypes = {
  dispatch: PropTypes.func,
  statusText: PropTypes.object
};

export default connect(mapStateToProps,{ registerChat })(RegisterForm);
