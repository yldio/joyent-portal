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
    margin-left: ${remcalc(10)};
    max-height: 85vh;
    overflow: auto;
  `};
`;

const fullTheme = {
  ...theme,
  flexboxgrid: {
    ...theme.flexboxgrid,
    breakpoints: {
      xs: 0, // em
      sm: 48, // em
      md: 68, // em
      lg: 85 // em
    },
    container: {
      sm: 48, // rem
      md: 68, // rem
      lg: 85 // rem
    }
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
