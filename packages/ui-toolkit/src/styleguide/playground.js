import React, { Component } from 'react';
import styled from 'styled-components';
import is from 'styled-is';
import remcalc from 'remcalc';

const Wrapper = styled.section`
  margin-top: ${remcalc(24)};
  margin-bottom: ${remcalc(46)};
`;

const Tabs = styled.ul`
  list-style: none;
  display: flex;
  padding: 0;
  align-items: center;
  border-bottom: ${remcalc(1)} solid ${props => props.theme.textDisabled};
`;

const TabHeader = styled.li`
  position: relative;
  height: ${remcalc(30)};
  box-sizing: border-box;
  line-height: inherit;
  margin-right: ${remcalc(18)};

  ${is('active')`
     border-bottom: ${remcalc(1)} solid ${props => props.theme.primary};
  `};

  li:hover {
    border-bottom: ${remcalc(1)} solid ${props => props.theme.primary};
  }
`;

const Button = styled.button`
  font-family: 'Libre Franklin';
  text-transform: uppercase;
  font-size: ${remcalc(15)};
  color: ${props => props.theme.textDisabled};
  border: none;
  background: ${props => props.theme.white};
  transition: color 150ms ease-in;
  cursor: pointer;
  text-transform: none;
  padding: 0;
  margin: 0 ${remcalc(2)};

  ${is('active')`
    color: ${props => props.theme.primary};
    font-weight: bold;
  `};

  &:hover {
    color: ${props => props.theme.primary};
  }
`;

const Tab = styled.div`
  height: 0;
  opacity: 0;
  transition: opacity 150ms ease-in;

  ${is('active')`
    height: auto;
    opacity: 1;
  `};

  .CodeMirror-wrap {
    border: none;
    padding: 0;
  }
`;

class Playground extends Component {
  state = {
    tab: 'component'
  };

  changeTab = tab => {
    this.setState({
      tab
    });
  };

  render() {
    const { name, preview, tabBody } = this.props;
    return (
      <Wrapper>
        <Tabs>
          <TabHeader active={this.state.tab === 'component'}>
            <Button
              active={this.state.tab === 'component'}
              onClick={() => this.changeTab('component')}
            >
              Example
            </Button>
          </TabHeader>
          <TabHeader active={this.state.tab === 'code'}>
            <Button
              active={this.state.tab === 'code'}
              onClick={() => this.changeTab('code')}
            >
              Code
            </Button>
          </TabHeader>
        </Tabs>

        <Tab active={this.state.tab === 'component'} data-preview={name}>
          {preview}
        </Tab>
        <Tab active={this.state.tab === 'code'}>{tabBody}</Tab>
      </Wrapper>
    );
  }
}

export default Playground;
