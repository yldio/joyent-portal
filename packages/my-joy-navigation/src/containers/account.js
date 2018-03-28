import React from 'react';
import { Anchor, Popover } from '../components';

const Account = ({ expanded }) =>
  expanded ? (
    <Popover>
      <Anchor href="/navigation/signout">Log Out</Anchor>
    </Popover>
  ) : null;

export default Account;
