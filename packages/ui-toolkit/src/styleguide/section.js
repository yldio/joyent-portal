import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Card, H2, P, H4 } from '../';
import remcalc from 'remcalc';

const CardStyled = styled(Card)`
  margin-bottom: ${remcalc(36)};
`;

const Header = styled.header`
  background: ${props => props.theme.primary};
  padding: ${remcalc(50)} ${remcalc(120)};
  position: relative;
`;

const Main = styled.div`
  padding: ${remcalc(50)} ${remcalc(120)};

  h4[class*='rsg--heading'] {
    margin: 0;
    line-height: ${remcalc(26)};
    font-size: ${remcalc(21)};

    & + p {
      margin-top: ${remcalc(24)};
    }
  }
`;

export default allProps => {
  const { name, content, components, sections, depth, description } = allProps;

  if (depth === 1) {
    return (
      <CardStyled>
        <Header>
          <H2 white>{name}</H2>
          {description ? <P white>{description}</P> : null}
        </Header>
        <Main>
          {content}
          {components}
          {sections}
        </Main>
      </CardStyled>
    );
  }

  return (
    <Fragment>
      <header>
        <H4 white>{name}</H4>
        {description ? <P white>{description}</P> : null}
      </header>
      <div>
        {content}
        {components}
        {sections}
      </div>
    </Fragment>
  );
};
