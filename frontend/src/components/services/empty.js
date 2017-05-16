import React from 'react';
import styled from 'styled-components';

import { LayoutContainer } from '@components/layout';

import Button from '@ui/components/button';
import Column from '@ui/components/column';
import Row from '@ui/components/row';
import { P, H2, H3 } from '@ui/components/base-elements';
import { remcalc } from '@ui/shared/functions';

const StyledBox = styled.div`
  box-shadow: 0 2px 0 0 rgba(0, 0, 0, 0.05);
  border: solid 1px #d8d8d8;
  padding: ${remcalc('6 18 24')};

  & + & {
    margin-top: ${remcalc(24)};
  }
`;

export default () => (
  <LayoutContainer>
    <Row>
      <Column>
        <H2>Services</H2>
        <Row>
          <Column>
            <StyledBox>
              <Row>
                <Column md={10}>
                  <H3>Import your services</H3>
                  <P>You can import your services from a Git repository hosting service. Learn more.</P>
                  <Button secondary>from GitHub</Button>
                  <Button secondary>from GitLab</Button>
                  <Button secondary>from BitBucket</Button>
                </Column>
              </Row>
            </StyledBox>

            <StyledBox>
              <Row>
                <Column md={9}>
                  <H3>Alternatively, you can upload or edit manifest file.</H3>
                  <P>Manifest is a file describing your services. It is similar to Docker Compose file. You can upload a file from you local machine or edit it manually. Learn more.</P>
                  <Button secondary>Upload manifest</Button>
                  <Button secondary>Edit manifest</Button>
                </Column>
              </Row>
            </StyledBox>
          </Column>
        </Row>
      </Column>
    </Row>
  </LayoutContainer>
);
