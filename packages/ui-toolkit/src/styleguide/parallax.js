import React, { Component } from 'react';
import styled from 'styled-components';
import remcalc from 'remcalc';
import is from 'styled-is';
import { Parallax } from 'react-scroll-parallax';

import { H1, P } from '../';
import Gutter from './gutter';
import Plus from './plus.png';

const Wrapper = styled.section`
  width: 100vw;
  height: calc(100vh - ${remcalc(48)});
  background: #343434;
  overflow: hidden;
  box-sizing: border-box;
  padding-top: 15%;
`;

const Text = styled.div`
  max-width: ${remcalc(786)};
  margin-left: ${remcalc(100)};
  padding: ${remcalc(66)};
  position: relative;
  z-index: 1;
  box-sizing: border-box;
`;

const Img = styled.img`
    position: absolute;
    top: 0;
    left: 0;

    ${is('topRight')`
        left: auto;
        right: 0;
    `}

    ${is('bottomLeft')`
        top: auto;
        bottom: 0;

    `}

    ${is('bottomRight')`
        top: auto;
        bottom: 0;
        left: auto;
        right: 0;
    `}
`;

const gutterWidth = 47 + 70;
const windowWidth = (window || {}).outerWidth + 70;

let isScrolling;

const isScrolledOutsideView = () => {
  const elem = document.getElementById('parallaxWrapper');
  if (elem) {
    const eleHeight = elem.clientHeight;
    const scrollY = window.scrollY;

    return scrollY >= eleHeight;
  }
  return true;
};

export default class extends Component {
  state = {
    value: parseInt(windowWidth / gutterWidth, 10),
    windowWidth,
    show: true
  };

  componentDidMount() {
    if (this.props.hideAfterScroll) {
      isScrolledOutsideView()
        ? this.setState({ show: false })
        : window.addEventListener('scroll', this.scrollStopHandler);
    }
  }

  scrollStopHandler = () => {
    window.clearTimeout(isScrolling);
    isScrolling = setTimeout(() => {
      isScrolledOutsideView()
        ? this.setState({ show: false }, () =>
            window.removeEventListener('scroll', this.scrollStopHandler)
          )
        : this.skipParallax();
    }, 66);
  };

  skipParallax = () => {
    if (this.state.show) {
      window.scroll({
        top: document.getElementsByTagName('header')[0].offsetTop,
        left: 0,
        behavior: 'smooth'
      });
    }
  };

  render() {
    window.addEventListener('resize', () => {
      this.setState({
        windowWidth: (window || {}).outerWidth,
        value: parseInt(this.state.windowWidth / gutterWidth, 10)
      });
    });

    const array = Array.apply(null, { length: this.state.value }).map(
      Number.call,
      Number
    );

    if (!this.state.show) {
      return null;
    }

    return (
      <Wrapper id="parallaxWrapper">
        {array.map((g, i) => (
          <Gutter key={g} style={{ left: gutterWidth * i }} />
        ))}
        <Parallax offsetYMax={50} offsetYMin={-50} slowerScrollRate tag="main">
          <Text>
            <Img src={Plus} />
            <Img topRight src={Plus} />
            <Img bottomLeft src={Plus} />
            <Img bottomRight src={Plus} />
            <H1 white>Joyent UI Toolkit</H1>
            <P white>
              The Joyent UI Toolkit is a collection of carefully created design
              elements, components and guidelines, for anyone developing
              products within the Joyent and Triton ecosystems.
            </P>
            <P white style={{ marginTop: remcalc(60), position: 'absolute' }}>
              Scroll down
            </P>
          </Text>
        </Parallax>
      </Wrapper>
    );
  }
}
