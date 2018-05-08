import React from 'react';
import remcalc from 'remcalc';
import styled from 'styled-components';
import { Arrow } from 'joyent-icons';

const BottomNav = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 36px 0;
`;

const Link = styled.a`
  display: flex;
  align-items: center;
  color: #3b46cc;
  font-size: 15px;
  line-height: 24px;
  text-decoration: none;
`;

export default props => {
  const items = props.items.map(item => item.name);
  const selectedIndex =
    items.indexOf(props.link) > -1 ? items.indexOf(props.link) : 0;

  if (!items.length) {
    return null;
  }

  return (
    <BottomNav>
      <div>
        {selectedIndex > 0 ? (
          <Link href={`/#!/${items[selectedIndex - 1]}`}>
            <Arrow direction="right" fill="#3B46CC" /> &nbsp;{' '}
            {items[selectedIndex - 1]}
          </Link>
        ) : null}
      </div>
      <div>
        {selectedIndex < items.length ? (
          <Link href={`/#!/${items[selectedIndex + 1]}`}>
            {items[selectedIndex + 1]} &nbsp;{' '}
            <Arrow direction="left" fill="#3B46CC" />
          </Link>
        ) : null}
      </div>
    </BottomNav>
  );
};
