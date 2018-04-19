import React from 'react';
import Flex, { FlexItem } from 'styled-flex-component';
import { Margin } from 'styled-components-spacing';
import styled from 'styled-components';
import remcalc from 'remcalc';
import is from 'styled-is';

import { H5 as BaseH5, TickIcon } from 'joyent-ui-toolkit';

const H5 = styled(BaseH5)`
  color: #008138;
`;

const Frame = styled.div`
  border-radius: 50%;
  border: ${remcalc(2)} solid #008138;
  height: ${remcalc(20)};
  width: ${remcalc(20)};

  display: flex;
  justify-content: center;
  align-items: center;

  ${is('inverted')`
    background: #008138;
  `};
`;

const SavedIcon = ({ margin, inverted, noIcon }) => {
  return (
    <Flex>
      {!noIcon ? (
        <FlexItem>
          <H5>Saved</H5>
        </FlexItem>
      ) : null}
      <FlexItem>
        <Margin
          left={margin && margin.left ? 0 : 1}
          right={margin && margin.right ? 0 : 1}
          {...margin}
        >
          <Frame inverted={inverted}>
            <TickIcon fill={inverted ? 'white' : '#008138'} />
          </Frame>
        </Margin>
      </FlexItem>
    </Flex>
  );
};

export default SavedIcon;
