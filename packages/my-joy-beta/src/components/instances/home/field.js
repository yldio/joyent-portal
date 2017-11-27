import React from 'react';
import { Row, Col } from 'react-styled-flexboxgrid';
import CopyToClipboard from './tooltip';
import { Input, FormLabel } from 'joyent-ui-toolkit';
import styled from 'styled-components';
import remcalc from 'remcalc';

const InputIconWrapper = styled.div`
  display: flex;
  margin-bottom: ${remcalc(18)};
  align-items: center;

  input {
    padding-right: ${remcalc(30)};
  }

  div {
    position: relative;
    left: ${remcalc(-26)};
  }
`;

export default ({ label, text }) => (
  <Row>
    <Col md={7} xs={12}>
      <FormLabel>{label}</FormLabel>
      <InputIconWrapper>
        <Input fluid value={text} />
        <CopyToClipboard text={text} />
      </InputIconWrapper>
    </Col>
  </Row>
);
