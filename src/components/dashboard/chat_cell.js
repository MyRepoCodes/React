import React, {Component} from 'react';
import ChatModal from './chat-modal'
import { Modal } from 'reactstrap';
class Footer extends Component {

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
    return (
      <div>
        <a href="javascript:void(0);" className="chat-cell" onClick={this.toggle}>
          <img className="img-fluid" src={require('../../assets/img/ai-colors.png')}/>
        </a>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className="full-modal chat-modal chat-block">
          <ChatModal/>
        </Modal>
      </div>
    );
  }
}
export default Footer;
