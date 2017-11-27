import React from 'react';
import { Row, Col } from 'react-styled-flexboxgrid';
import CopyToClipboard from './tooltip';
import { Input, FormLabel } from 'joyent-ui-toolkit';
import is from 'styled-is';
import styled from 'styled-components';
import remcalc from 'remcalc';

const InputIconWrapper = styled.div`
  display: flex;
  margin-bottom: ${remcalc(10)};
  align-items: center;

  ${is('noMargin')`
    margin-bottom: ${remcalc(0)};
  `};

  input {
    padding-right: ${remcalc(30)};
  }

  div {
    position: relative;
    left: ${remcalc(-26)};
  }
`;

export default ({ label, text, ...rest }) => (
  <Row>
    <Col md={7} xs={12}>
      <FormLabel>{label}</FormLabel>
      <InputIconWrapper {...rest}>
        <Input fluid value={text} />
        <CopyToClipboard text={text} />
      </InputIconWrapper>
    </Col>
  </Row>
);
