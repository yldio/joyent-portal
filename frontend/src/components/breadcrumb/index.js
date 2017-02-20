const React = require('react');
const Styled = require('styled-components');
const flatten = require('lodash.flatten');

const Container = require('@ui/components/container');
const Row = require('@ui/components/row');
const Column = require('@ui/components/column');
const BaseElements = require('@ui/components/base-elements');
const NavLink = require('@ui/components/nav-link');
const PropTypes = require('@root/prop-types');
const fns = require('@ui/shared/functions');
const constants = require('@ui/shared/constants');

const {
  remcalc
} = fns;

const {
  colors,
} = constants;

const {
  H2,
} = BaseElements;

const {
  default: styled
} = Styled;

// Main Contonent Wrapper Styles
const StyledDiv = styled.div`
  border-bottom: solid ${remcalc(1)} ${colors.base.grey};
  padding: ${remcalc(30)} 0;
  margin-bottom: ${remcalc(21)};
`;

const BreadcrumbA = styled(NavLink)`
  text-decoration: none;
`;

const BreadcrumbSpan = styled.span`
  color: ${colors.base.secondaryDark};
`;

function getNameLink(name) {
  return flatten(name.map((part, i) => {
    if (!part.name) {
      return null;
    }

    const link = (
      <BreadcrumbA key={part.pathname} to={part.pathname}>
        {part.name}
      </BreadcrumbA>
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

const StyledH2 = styled(H2)`
  color: ${colors.base.primary};
  margin: 0;
`;

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
            <StyledH2>
              {getNameLink(name)}
            </StyledH2>
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
