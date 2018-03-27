import React, { Fragment } from 'react';
import { Grid, Row, Col } from 'joyent-react-styled-flexboxgrid';
import styled, { ThemeProvider } from 'styled-components';
import remcalc from 'remcalc';
import is from 'styled-is';

import theme from '../theme';
import Logo from './logo';
import GHLogo from './ghlogo';

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

const Header = styled.header`
  background: ${props => props.theme.greyDarker};
  color: ${props => props.theme.white};
  height: ${remcalc(48)};
  padding: 0 ${remcalc(24)};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const List = styled.ul`
  list-style: none;
  display: flex;

  li {
    a {
      color: ${props => props.theme.white};
      text-decoration: none;
    }

    &:not(:last-child) {
      border-right: 1px solid ${props => props.theme.text};
      padding-right: ${remcalc(24)};
      margin-right: ${remcalc(24)};
    }
  }
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
    <Fragment>
      <Header>
        <List>
          <li>
            <a href="/">Visuals</a>
          </li>
          <li>Copy Guide</li>
          <li>
            <a href="#!/Download">Downloads</a>
          </li>
        </List>
        <Logo />
        <a
          href="https://github.com/yldio/joyent-portal/tree/master/packages/ui-toolkit"
          rel="noopener noreferrer"
          target="_blank"
        >
          <GHLogo />
        </a>
      </Header>
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
    </Fragment>
  </ThemeProvider>
);

export default StyleGuideRenderer;
