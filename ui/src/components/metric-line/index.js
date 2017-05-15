import styled from 'styled-components';
import React from 'react';
import Chart from 'chart.js';

const Container = styled.div``;

class LineMetric extends React.Component {

  constructor(props){
    super(props);
  }

  componentDidMount() {
    this._chart = new Chart(this._refs.component, {
      type: 'line',
      data: {
        datasets: [{
          data: [{
            x: 0,
            y: 12
          }, {
            x: 1,
            y: 15
          }, {
            x: 2,
            y: 21
          }, {
            x: 3,
            y: 23
          }, {
            x: 4,
            y: 12
          }],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          label: 'dataset 1'
        }, {
          data: [{
            x: 0,
            y: 11
          }, {
            x: 1,
            y: 16
          }, {
            x: 2,
            y: 26
          }, {
            x: 3,
            y: 21
          }, {
            x: 4,
            y: 19
          }],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          label: 'dataset 2'
        }, {
          data: [{
            x: 0,
            y: 1
          }, {
            x: 1,
            y: 5
          }, {
            x: 2,
            y: 2
          }, {
            x: 3,
            y: 3
          }, {
            x: 4,
            y: 12
          }],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          label: 'dataset 3'
        }, {
          data: [{
            x: 0,
            y: 17
          }, {
            x: 1,
            y: 14
          }, {
            x: 2,
            y: 22
          }, {
            x: 3,
            y: 13
          }, {
            x: 4,
            y: 25
          }],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          label: 'dataset 4'
        }]
      },
      options: {
        scales: {
          xAxes: [{
            type: 'linear',
            position: 'bottom'
          }]
        }
      }
    });
  }

  ref(name) {
    this._refs = this._refs || {};

    return (el) => {
      this._refs[name] = el;
    };
  }

  render() {
    return (
      <Container>
        <canvas
          ref={this.ref('component')}
          height={200}
          width={200}
        />
      </Container>
    );
  }
}

export default LineMetric;
