import React, { Component } from 'react';
import TabModal from './components/modal';
import modalActions from './actions/modalActions';
import modalStore from './store/modalStore';

import './css/main.css';

class App extends Component {
  state = {tabs: modalStore.getState().textAreas.length};

  handleClick = () => {
    modalActions.open();
  }

  tabUpdate = () => {
    this.setState({tabs: modalStore.getState().textAreas.length})
  }

  render() {
    return (
      <div className="App">
        <TabModal tabUpdate={this.tabUpdate} />
        <button className="openButton" onClick={this.handleClick}>Open</button> Tabs: {this.state.tabs}
      </div>
    );
  }
}

export default App;
