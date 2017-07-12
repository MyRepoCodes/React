import React, {Component} from 'react';
import TopBar from './topbar';
import Header from './header';
import Slider from './slider';
import Todo from './todo';
import Footer from './footer';
import ChatCell from './chat_cell';

import '../../assets/css/font-awesome.min.css';

class App extends Component {
  constructor(props) {
   	super(props);
 	}

  render() {
    return (
      <div className="layout-column flex">
        <TopBar/>
        <div className="scroll layout-column flex">
          <Header/>
          <Slider/>
          <Todo/>
        </div>
        <Footer/>
        <ChatCell/>
      </div>
    );
  }
}

export default App;
