import React, { Component } from 'react';
import styled from 'styled-components';
import is from 'styled-is';
import remcalc from 'remcalc';

const Wrapper = styled.section``;

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
  overflow: hidden;
  transition: opacity 150ms ease-in;

  ${is('active')`
    height: auto;
    opacity: 1;
    transition-delay: 150ms;
    transition: opacity 150ms ease-in;
  `};

  .CodeMirror-wrap {
    border: none;
    padding: 0;
  }
`;

class Playground extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tab: 'component',
      states: []
    };
  }

  componentDidMount() {
    const code = this.props.preview.props.code;
    const regex = /\/\/ Tab: \w+/g;
    let m;
    while ((m = regex.exec(code)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regex.lastIndex) {
        regex.lastIndex++;
      }

      m.forEach((match, groupIndex) => {
        // MAKE THIS SYNCRONOUS
        window.setTimeout(() =>
          this.setState({
            states: [...this.state.states, match.split(':')[1].trim()]
          })
        );
      });
    }
  }

  changeTab = tab => {
    this.setState({
      tab
    });
  };

  showPreview = (preview, code) => ({
    ...preview,
    props: {
      ...preview.props,
      code
    }
  });

  render() {
    const { name, preview, tabBody } = this.props;
    const { tab, states } = this.state;
    const propCode = this.props.preview.props.code;
    const regex = /\/\/ Tab: \w+/g;
    const nameRegex = /\/\/ Name: /g;

    return (
      <Wrapper>
        <Tabs>
          <TabHeader active={tab === 'component'}>
            <Button
              active={tab === 'component'}
              onClick={() => this.changeTab('component')}
            >
              {(propCode.split(nameRegex)[1] || 'Component').split(/\s/g)[0]}
            </Button>
          </TabHeader>
          {states.length
            ? states.map((state, i) => (
                <TabHeader active={tab === state} key={`tabHeader${i}`}>
                  <Button
                    active={tab === state}
                    onClick={() => this.changeTab(state)}
                  >
                    {state}
                  </Button>
                </TabHeader>
              ))
            : null}
          <TabHeader active={tab === 'code'}>
            <Button
              active={tab === 'code'}
              onClick={() => this.changeTab('code')}
            >
              Code
            </Button>
          </TabHeader>
        </Tabs>
        <Tab active={tab === 'component'} data-preview={name}>
          {this.showPreview(preview, propCode.split(regex)[0])}
        </Tab>
        {states.length
          ? states.map((state, i) => (
              <Tab active={tab === state} data-preview={name} key={`tab${i}`}>
                {this.showPreview(preview, propCode.split(regex)[i + 1])}
              </Tab>
            ))
          : null}
        <Tab active={tab === 'code'}>{tabBody}</Tab>
      </Wrapper>
    );
  }
}

export default Playground;
