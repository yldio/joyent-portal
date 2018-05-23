import React from 'react';
import Flex, { FlexItem } from 'styled-flex-component';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import BaseInput, { Stylable } from './base/input';
import Button from '../button';
import { Minus, Plus } from '../icons';

const InputStyled = BaseInput(Stylable('input'));

const LeftButton = styled(Button)`
  border-top-left-radius: ${props => props.theme.borderRadius};
  border-bottom-left-radius: ${props => props.theme.borderRadius};
  border-right: 0;
`;

const RightButton = styled(Button)`
  border-top-right-radius: ${props => props.theme.borderRadius};
  border-bottom-right-radius: ${props => props.theme.borderRadius};
  border-left: 0;
`;

/**
 * @example ./usage-input.md
 */
const Input = ({ children, type, onPlusClick, onMinusClick, ...rest }) => {
  const number = type === 'number' && (onPlusClick || onMinusClick);

  if (!number) {
    return <InputStyled {...rest}>{children}</InputStyled>;
  }

  return (
    <Flex>
      {number ? (
        <FlexItem>
          <LeftButton type="button" onClick={onMinusClick} secondary actions>
            <Minus />
          </LeftButton>
        </FlexItem>
      ) : null}
      <FlexItem>
        <InputStyled {...rest} type={type} number={number}>
          {children}
        </InputStyled>
      </FlexItem>
      {number ? (
        <FlexItem>
          <RightButton type="button" onClick={onPlusClick} secondary actions>
            <Plus />
          </RightButton>
        </FlexItem>
      ) : null}
    </Flex>
  );
};

export default Input;

Input.propTypes = {
  /**
   * Input type
   */
  type: PropTypes.string,
  /**
   * Is the checkbox disabled ?
   */
  disabled: PropTypes.bool,
  /**
   * Placeholder text for the Input
   */
  placeholder: PropTypes.string
};

Input.defaultProps = {
  type: 'text',
  disabled: false
};
