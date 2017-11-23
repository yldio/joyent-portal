import React, { Component } from 'react';
import remcalc from 'remcalc';
import is, { isNot } from 'styled-is';
import PropTypes from 'prop-types';

import { H4 as BaseH4 } from '../text/headings';
import Baseline from '../baseline';

const BaseItem = BaseH4.extend`
  font-size: ${remcalc(16)};
  text-align: left;

  font-style: normal;
  font-weight: normal;
  line-height: normal;

  color: ${props => props.theme.secondary};

  ${isNot('disabled')`
    cursor: pointer;

    &:hover {
      color: ${props => props.theme.secondaryHover};
    }
  `};

  ${is('disabled')`
    color: ${props => props.theme.grey};
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

export default Baseline(Item);
