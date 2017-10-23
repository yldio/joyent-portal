import { Broadcast, Subscriber } from 'joy-react-broadcast';
import Baseline from '../baseline';
import paperEffect from './paper-effect';
import { bottomShadow, bottomShadowDarker } from '../boxes';
import remcalc from 'remcalc';
import is, { isNot } from 'styled-is';
import { Row } from 'react-styled-flexboxgrid';
import PropTypes from 'prop-types';
import React from 'react';

const StyledCard = Row.extend`
  position: relative;
  height: auto;
  min-height: ${remcalc(126)};
  margin-bottom: ${remcalc(10)};
  border: ${remcalc(1)} solid ${props => props.theme.grey};
  background-color: ${props => props.theme.white};
  box-shadow: ${bottomShadow};
  flex-direction: column;

  margin-right: ${remcalc(0)};
  margin-left: ${remcalc(0)};

  ${is('collapsed')`
    min-height: auto;
    height: ${remcalc(48)};
    margin-bottom: ${remcalc(16)};
  `};

  ${is('collapsed', 'headed')`
    box-shadow: ${bottomShadowDarker};
  `};

  ${is('flat')`
    box-shadow: none;
  `};

  ${is('bottomless')`
    border-bottom-width: 0;
    height: ${remcalc(47)};
  `};

  ${is('gapless')`
    margin-bottom: 0;
  `};

  ${is('topMargin')`
    margin-top: ${remcalc(10)};
  `};

  ${is('icon')`
    background: url(${props => props.icon}) no-repeat scroll ${remcalc(
    7
  )} ${remcalc(7)};
    padding-left: ${remcalc(30)};
  `};

  ${is('transparent')`
    border-radius: 4px;
    border: 1px solid ${props => props.theme.grey};
    background: ${props => props.theme.background};
    box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.05);
    min-height: ${remcalc(185)};
    min-width: 292px;
    cursor: pointer;
    transition: all 300ms ease;
  `};

  ${is('transparent', 'selected')`
    border: 1px solid ${props => props.theme.primary};
    background: ${props => props.theme.tertiaryActive};
    box-shadow: none;
  `};

  ${is('stacked')`
    ${paperEffect}
  `};

  ${is('disabled')`
    background-color: ${props => props.theme.disabled};
  `};

  ${isNot('active')`
    background-color: ${props => props.theme.disabled};
  `};
`;

/**
 * @example ./usage.md
 */
const Card = ({
  children,
  collapsed = false,
  headed = false,
  active = true,
  ...rest
}) => {
  const render = value => {
    const newValue = {
      fromHeader: (value || {}).fromHeader,
      headed,
      collapsed,
      active
    };

    return (
      <Broadcast channel="card" value={newValue}>
        <StyledCard
          name="card"
          active={active}
          collapsed={collapsed}
          headed={headed}
          {...rest}
        >
          {children}
        </StyledCard>
      </Broadcast>
    );
  };

  return <Subscriber channel="card">{render}</Subscriber>;
};

Card.propTypes = {
  /**
   * Contents of the Card
   */
  children: PropTypes.node,
  /**
   * Is it collapsed ?
   */
  collapsed: PropTypes.bool,
  /**
   * Does it have a header
   */
  headed: PropTypes.bool,
  /**
   * Setting this to true will remove the box shadow
   */
  flat: PropTypes.bool,
  /**
   * If set to true a paper effect will be added
   */
  stacked: PropTypes.bool,
  /**
   * Transparent will set the card as secondary
   */
  transparent: PropTypes.bool,
  /**
   * When set to false or using disabled you will see the disabled card
   */
  active: PropTypes.bool
};

Card.defaultProps = {
  collapsed: false,
  headed: false,
  flat: false,
  stacked: false,
  transparent: false,
  active: true
};

export default Baseline(Card);
