const Container = require('@ui/components/container');
const Row = require('@ui/components/row');
const Column = require('@ui/components/column');
const BaseElements = require('@ui/components/base-elements');
const PropTypes = require('@root/prop-types');
const React = require('react');
const ReactRouter = require('react-router-dom');
const Styled = require('styled-components');
const flatten = require('lodash.flatten');
const fns = require('@ui/shared/functions');
const constants = require('@ui/shared/constants');

const {
  remcalc
} = fns;

const {
  colors,
} = constants;

const {
  H1,
} = BaseElements;

const {
  default: styled
} = Styled;

// Main Contonent Wrapper Styles
const StyledDiv = styled.div`
  border-bottom: solid ${remcalc(1)} ${colors.greyDark};
  padding: ${remcalc(30)} 0;
  margin-bottom: ${remcalc(21)};
`;

const BreadcrumbA = styled.a`
  text-decoration: none;
`;

const BreadcrumbSpan = styled.span`
  color: ${colors.base.secondaryDark};
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
            <H1>
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
