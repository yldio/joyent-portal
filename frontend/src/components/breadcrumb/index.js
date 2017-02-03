const Container = require('@ui/components/container');
const Row = require('@ui/components/row');
const Column = require('@ui/components/column');
const PropTypes = require('@root/prop-types');
const React = require('react');
const ReactRouter = require('react-router');
const Styled = require('styled-components');
const flatten = require('lodash.flatten');
const fns = require('@ui/shared/functions');

const {
  remcalc
} = fns;

const {
  default: styled
} = Styled;

// Main Contonent Wrapper Styles
const StyledDiv = styled.div`
  background-color: #FAFAFA;
  height: ${remcalc(91)};
  border-bottom: solid ${remcalc(1)} #d8d8d8;
`;

const BreadcrumbA = styled.a`
  text-decoration: none !important;
`;

const BreadcrumbSpan = styled.span`
  color: #646464;
`;

const H1 = styled.h1`
  margin: 0 0 0 0;
  padding-top: ${remcalc(31)};
  padding-bottom: ${remcalc(31)};
`;

const {
  Link
} = ReactRouter;

function getNameLink(name) {
  return flatten(name.map((part, i) => {
    if (!part.name) {
      return null;
    }

    const link = (
      <Link key={part.pathname} to={part.pathname}>
        {
          ({
            href,
            onClick,
          }) =>
            <BreadcrumbA href={href} onClick={onClick}>
              {part.name}
            </BreadcrumbA>
        }
      </Link>
    );

    const key = `${part.pathname}${i}`;
    const slash = (
      <BreadcrumbSpan key={key}> / </BreadcrumbSpan>
    );

    return (i === 0) ? link : [
      slash,
      link
    ];
  }));
}

const Breadcrumb = ({
  children,
  links = [],
  name = []
}) => {
  return (
    <Container>
      <Row>
        <Column xs={12}>
          <StyledDiv>
            <H1
              style={{
                fontSize: remcalc(24)
              }}
            >
              {getNameLink(name)}
            </H1>
          </StyledDiv>
        </Column>
      </Row>
    </Container>
  );
};

Breadcrumb.propTypes = {
  children: React.PropTypes.node,
  links: React.PropTypes.arrayOf(PropTypes.link),
  name: React.PropTypes.arrayOf(PropTypes.link)
};

module.exports = Breadcrumb;
