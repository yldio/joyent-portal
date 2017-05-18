import { baseBox, Baseline } from '../../shared/composers';
import { boxes } from '../../shared/constants';
import { rndId, remcalc } from '../../shared/functions';
import React from 'react';
import styled from 'styled-components';

const classNames = {
  active: rndId()
};

const StyledUl = styled.ul`
  display: inline-block;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const StyledLi = styled.li`
  align-items: center;
  cursor: pointer;
  display: flex;
  float: left;
  height: ${remcalc(50)};
  justify-content: center;
  margin-right: ${remcalc(10)};
  min-width: ${remcalc(50)};
  padding-left: ${remcalc(15)};
  padding-right: ${remcalc(15)};
  position: relative;

  ${baseBox()}

  &:last-child {
    margin-right: inherit;
  }

  &:not( .${classNames.active} ):hover {
    border: ${boxes.border.checked};
  }

  & a:hover {
    text-decoration: none;
  }

  &.${classNames.active} {
    cursor: default;
  }
`;

const Pagination = ({
  children,
  label,
  ...props
}) => {
  const pages = React.Children.map(children, (child) => {
    const cn = `
      ${child.props.className}
      ${child.props.active ? classNames.active : ''}
    `.trim();

    return (
      <StyledLi className={cn}>
        {child}
      </StyledLi>
    );
  });

  return (
    <nav
      aria-label={label}
      {...props}
    >
      <StyledUl>
        {pages}
      </StyledUl>
    </nav>
  );
};

Pagination.propTypes = {
  children: React.PropTypes.node,
  label: React.PropTypes.string
};

export default Baseline(
  Pagination
);
