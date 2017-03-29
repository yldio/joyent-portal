import React from 'react';
import Perf from 'react-addons-perf';
import styled from 'styled-components';

const Profiler = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 50px;
  top: 20px;
  padding: 10px;
  background: #bada55;
  border: 2px solid black;
  text-align: center;
  z-index: 1;
  
  & > h1 {
    font-size: 1.5em;
  }
  
  & > h1 {
    font-size: 1.5em;
  }
`;

export default class PerfProfiler extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      started: false
    };
  }

  handleToggle = () => {
    const {
      started
    } = this.state;

    started ? Perf.stop() : Perf.start();

    this.setState({
      started: !started
    });
  }

  handlePrintWasted = () => {
    const lastMeasurements = Perf.getLastMeasurements();

    Perf.printWasted(lastMeasurements);
  }

  handlePrintOperations = () => {
    const lastMeasurements = Perf.getLastMeasurements();

    Perf.printOperations(lastMeasurements);
  }

  render() {
    const {
      started
    } = this.state;

    return (
      <Profiler>
        <h1>Performance Profiler</h1>
        <button onClick={this.handleToggle}>
          {started ? 'Stop' : 'Start'}
        </button>
        <button onClick={this.handlePrintWasted}>
          Print Wasted
        </button>
        <button onClick={this.handlePrintOperations}>
          Print Operations
        </button>
      </Profiler>
    );
  }
}
