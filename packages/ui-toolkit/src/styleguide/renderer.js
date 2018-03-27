import React, { Fragment } from 'react';
import { Grid, Row, Col } from 'joyent-react-styled-flexboxgrid';
import styled, { ThemeProvider } from 'styled-components';
import remcalc from 'remcalc';

import theme from '../theme';
import Logo from './logo';
import GHLogo from './ghlogo';

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
      border-right: ${remcalc(1)} solid ${props => props.theme.text};
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
