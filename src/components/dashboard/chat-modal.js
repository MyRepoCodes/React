import React, { Component } from 'react';
import Typist from 'react-typist';
class ChatModal extends Component {

  render() {
        return (
        	<div className="chat-block-inner">               
              <Typist  cursor={{ show: false }}>
                <div className='chat-txt'>
                  <h2>Hi, Julie.</h2> 
                  <p>I'm here to help personalize this <br /> 
                  app for you and make sure your <br /> 
                  health plan is designed for you<br />specifically.
                  </p>
                  <p>. . .</p>
                  <p>Be sure you're drinking enough<br />
                  water this afternoon. It's over 90º<br />
                  in Plano, Texas today.</p>
                  <p>Dehydration can really slow you <br /> 
                  down.</p>
                </div>                
              </Typist>
              <div className="chat-btn text-center">
                  <button className=" btn">Okay, thanks</button>
              </div>
              <a href="#" className="chat-cell spin-cell">
                <img className="img-fluid" src={require('../../assets/img/ai-colors.png')}/>
              </a>
              </div>
        );
    }
}
export default ChatModal;
