// from https://github.com/ReactTraining/react-router/blob/91f529db2e4feb7b8581881c83ee96f7ceabfb26/packages/react-router-dom/modules/NavLink.js

const React = require('react');
const ReactRouter = require('react-router-dom');
const Styled = require('styled-components');

const {
  default: styled
} = Styled;

const {
  Link,
  Route
} = ReactRouter;

const StyledLink = styled(Link)`
  ${props => props.styles}
`;

const NavLink = ({
  activeClassName,
  activeStyle,
  children,
  className,
  exact,
  isActive: getIsActive,
  strict,
  style,
  to,
  ...rest
}) => {
  const render = (props) => {
    const {
      // eslint-disable-next-line react/prop-types
      location,
      // eslint-disable-next-line react/prop-types
      match
    } = props;

    // eslint-disable-next-line object-curly-newline
    const isActive = !!(getIsActive ? getIsActive(match, location) : match);
    const newChildren = typeof children === 'function'
      ? children({ ...props, isActive }) // eslint-disable-line object-curly-newline
      : children;

    const clssnm = isActive
      ? [ activeClassName, className ].join(' ')
      : className;

    return (
      <StyledLink
        className={clssnm}
        // eslint-disable-next-line object-curly-newline
        style={isActive ? { ...style, ...activeStyle } : style}
        to={to}
        {...rest}
      >
        {newChildren}
      </StyledLink>
    );
  };

  return (
    <Route
      // eslint-disable-next-line react/no-children-prop
      children={render}
      exact={exact}
      path={typeof to === 'object' ? to.pathname : to}
      strict={strict}
    />
  );
};

NavLink.propTypes = {
  activeClassName: React.PropTypes.string,
  activeStyle: React.PropTypes.object,
  children: React.PropTypes.any,
  className: React.PropTypes.string,
  exact: React.PropTypes.bool,
  isActive: React.PropTypes.func,
  strict: React.PropTypes.bool,
  style: React.PropTypes.object,
  to: Link.propTypes.to
};

module.exports = NavLink;
