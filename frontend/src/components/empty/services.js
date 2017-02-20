import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
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
  <div>
    <Row name='empty-services'>
      <Column>
        <H2>
          <FormattedMessage id='services' />
        </H2>

        <Row>
          <Column>
            <StyledBox>
              <Row>
                <Column md={10}>
                  <H3>
                    <FormattedMessage id='import-services-title' />
                  </H3>
                  <P>
                    <FormattedMessage id='import-services-body' />
                  </P>

                  <Button secondary>from GitHub</Button>
                  <Button secondary>from GitLab</Button>
                  <Button secondary>from BitBucket</Button>
                </Column>
              </Row>
            </StyledBox>

            <StyledBox>
              <Row>
                <Column md={9}>
                  <H3>
                    <FormattedMessage id='alt-import-services-title' />
                  </H3>
                  <P>
                    <FormattedMessage id='alt-import-services-body' />
                  </P>

                  <Button secondary>Upload manifest</Button>
                  <Button secondary>Edit manifest</Button>
                </Column>
              </Row>
            </StyledBox>
          </Column>
        </Row>
      </Column>
    </Row>
  </div>
);
