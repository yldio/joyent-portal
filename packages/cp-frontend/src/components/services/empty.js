import React from 'react';
import styled from 'styled-components';
import remcalc from 'remcalc';

import { LayoutContainer } from '@components/layout';
import { Col, Row } from 'react-styled-flexboxgrid';
import { Button, P, H2, H3 } from 'joyent-ui-toolkit';

const StyledBox = styled.div`
  box-shadow: 0 2px 0 0 rgba(0, 0, 0, 0.05);
  border: solid 1px #d8d8d8;
  padding: ${remcalc('6 18 24')};

  & + & {
    margin-top: ${remcalc(24)};
  }
`;

export default () =>
  <LayoutContainer>
    <Row>
      <Col>
        <H2>Services</H2>
        <Row>
          <Col>
            <StyledBox>
              <Row>
                <Col md={10}>
                  <H3>Import your services</H3>
                  <P>
                    You can import your services from a Git repository hosting
                    service. Learn more.
                  </P>
                  <Button secondary>from GitHub</Button>
                  <Button secondary>from GitLab</Button>
                  <Button secondary>from BitBucket</Button>
                </Col>
              </Row>
            </StyledBox>

            <StyledBox>
              <Row>
                <Col md={9}>
                  <H3>Alternatively, you can upload or edit manifest file.</H3>
                  <P>
                    Manifest is a file describing your services. It is similar
                    to Docker Compose file. You can upload a file from you local
                    machine or edit it manually. Learn more.
                  </P>
                  <Button secondary>Upload manifest</Button>
                  <Button secondary>Edit manifest</Button>
                </Col>
              </Row>
            </StyledBox>
          </Col>
        </Row>
      </Col>
    </Row>
  </LayoutContainer>;
