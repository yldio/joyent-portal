const React = require('react');
const fns = require('../../shared/functions');
const Styled = require('styled-components');

const {
  rndId
} = fns;

const {
  default: styled
} = Styled;

const StyledTabs = styled.div`
  font-size: 0;

  &::after {
    clear: both;
    content: "";
    display: table;
  }
`;

const Tabs = ({
  className,
  children, // array of <Tab>
  id = rndId(),
  name = '',
  style
}) => {
  const _children = React.Children.map(children, (child, i) => {
    return React.cloneElement(child, {
      defaultChecked: i === 0,
      name
    });
  });

  return (
    <StyledTabs
      className={className}
      id={id}
      role='tablist'
      style={style}
    >
      {_children}
    </StyledTabs>
  );
};

Tabs.propTypes = {
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  id: React.PropTypes.string,
  name: React.PropTypes.string.isRequired,
  style: React.PropTypes.object
};

module.exports = Tabs;
