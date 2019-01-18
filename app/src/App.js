import React, { Component } from 'react';

import Modal from './components/Modal';
import ForecastBox from './components/ForecastBox';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: true,
    };

    this.handleToggleModal = this.handleToggleModal.bind(this);
  }

  handleToggleModal() {
    this.setState(currentState => ({
      modalOpen: !currentState.modalOpen,
    }));
  }

  render() {
    const { modalOpen } = this.state;

    return (
      <div className="App">
        <button onClick={this.handleToggleModal}>Open</button>

        <Modal
          open={modalOpen}
          onClose={this.handleToggleModal}>
          <ForecastBox country="Chile" capital="Santiago" temperature={29}></ForecastBox>
        </Modal>
      </div>
    );
  }
}

export default App;
