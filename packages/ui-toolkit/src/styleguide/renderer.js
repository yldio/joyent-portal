import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import remcalc from 'remcalc';
import is from 'styled-is';

import { Grid, Row, Col } from '../grid';
import theme from '../theme';

const Main = styled(Row)`
  padding-top: ${remcalc(40)};
`;

const Sticky = styled.div`
  position: sticky;
  top: 0;
  z-index: 9;

  ${is('sidebar')`
    top: ${remcalc(100)};
    max-height: 85vh;
    overflow: auto;
  `};
`;

const fullTheme = {
  ...theme,
  spacing: {
    0.5: remcalc(4),
    0: remcalc(0),
    1: remcalc(6),
    2: remcalc(12),
    3: remcalc(18),
    4: remcalc(24),
    5: remcalc(30),
    6: remcalc(36),
    7: remcalc(42),
    8: remcalc(48),
    9: remcalc(54),
    10: remcalc(60)
  }
};

const StyleGuideRenderer = ({
  title,
  homepageUrl,
  children,
  toc,
  hasSidebar
}) => (
  <ThemeProvider theme={fullTheme}>
    <Grid>
      <Main>
        {hasSidebar && (
          <Col xs={3}>
            <Sticky sidebar>{toc}</Sticky>
          </Col>
        )}
        <Col xs={hasSidebar ? 9 : 12} lg={hasSidebar ? 8 : 12}>
          {children}
        </Col>
      </Main>
    </Grid>
  </ThemeProvider>
);

export default StyleGuideRenderer;
