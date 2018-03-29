import React, { Fragment } from 'react';
import { Grid, Row, Col } from 'joyent-react-styled-flexboxgrid';
import styled, { ThemeProvider } from 'styled-components';
import remcalc from 'remcalc';

import theme from '../theme';
import Header from './header';

const Main = styled(Row)`
  padding-top: ${remcalc(24)};
`;

const Sidebar = styled.div`
  position: sticky;
  top: 0;
  z-index: 9;
  top: ${remcalc(0)};
  margin-top: ${remcalc(-24)};
  padding: ${remcalc(24)} 0;
  margin-left: ${remcalc(10)};
  max-height: 100vh;
  overflow: auto;
  background: white;
  width: ${remcalc(234)};
  border-right: ${remcalc(1)} solid ${props => props.theme.grey};
  box-sizing: border-box;
`;

const fullTheme = {
  ...theme,
  flexboxgrid: {
    ...theme.flexboxgrid,
    breakpoints: {
      xs: 0, // em
      sm: 48, // em
      md: 68, // em
      lg: 70 // em
    },
    container: {
      sm: remcalc(1115), // rem
      md: remcalc(1115), // rem
      lg: remcalc(1115) // rem
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
    <Fragment>
      <Header />
      <Grid style={{ marginLeft: 0 }}>
        <Main>
          {hasSidebar && (
            <Col xs={3}>
              <Sidebar>{toc}</Sidebar>
            </Col>
          )}
          <Col xs={hasSidebar ? 9 : 12} lg={hasSidebar ? 8 : 12}>
            {children}
          </Col>
        </Main>
      </Grid>
    </Fragment>
  </ThemeProvider>
);

export default StyleGuideRenderer;
