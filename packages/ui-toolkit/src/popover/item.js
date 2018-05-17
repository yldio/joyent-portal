import React, { Component } from 'react';
import is, { isNot } from 'styled-is';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import remcalc from 'remcalc';

const BaseItem = styled.span`
  display: block;
  text-align: left;
  font-size: ${remcalc(16)} ${isNot('disabled')`
    cursor: pointer;

    &:hover {
      color: ${props => props.theme.secondaryHover};
      -webkit-text-fill-color: currentcolor;
    }
  `};

  ${is('disabled')`
    color: ${props => props.theme.grey};
    -webkit-text-fill-color: currentcolor;
  `};
`;

class Item extends Component {
  static contextTypes = {
    ttpContMangr: PropTypes.object.isRequired
  };

  render = () => {
    const { children = null, onClick = () => null, ...rest } = this.props;
    const { handleTargetClick = () => null } = this.context.ttpContMangr;

    const handleClick = (...args) => {
      handleTargetClick(...args);
      onClick(...args);
    };

    return (
      <BaseItem {...rest} onClick={handleClick}>
        {children}
      </BaseItem>
    );
  };
}

export default Item;
