import styled from 'styled-components';
import { rndId } from '../../shared/functions';
import { Baseline } from '../../shared/composers';
import React from 'react';
import Tab from './tab';

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

export default Baseline(
  Tabs
);

export {
  Tab
};
