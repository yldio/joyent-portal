import React from 'react';
import is from 'styled-is';
import remcalc from 'remcalc';
import styled from 'styled-components';

import { default as Label } from '../label';

import {
  Actions,
  Arrow,
  Bin,
  Checkcircle,
  Chevron,
  Close,
  DataCenter,
  Health,
  Import,
  Instances,
  Loading,
  Minus,
  Plus,
  Triton,
  User
} from './';

const List = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  flex-wrap: wrap;
`;

const Icon = styled.div`
  width: ${remcalc(180)};
  height: ${remcalc(180)};
  border: ${remcalc(2)} solid ${props => props.theme.grey};
  align-items: center;
  justify-content: center;
  display: flex;
  margin-bottom: ${remcalc(18)};

  ${is('dark')`
    background: ${props => props.theme.secondary};
  `};
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: ${remcalc(8)};
  flex-direction: column;
  margin-bottom: ${remcalc(53)};
`;

const Icons = () => (
  <List>
    <ListItem>
      <Icon>
        <Chevron width="6" />
      </Icon>
      <Label>Chevron</Label>
    </ListItem>
    <ListItem>
      <Icon dark>
        <Arrow width="6" light />
      </Icon>
      <Label>Arrow &gt; Light</Label>
    </ListItem>
    <ListItem>
      <Icon>
        <Arrow width="6" />
      </Icon>
      <Label>Arrow &gt; Dark</Label>
    </ListItem>
    <ListItem>
      <Icon>
        <Instances width="18" />
      </Icon>
      <Label>Instances &gt; Dark</Label>
    </ListItem>
    <ListItem>
      <Icon dark>
        <Instances width="18" light />
      </Icon>
      <Label>Instances &gt; Light</Label>
    </ListItem>
    <ListItem>
      <Icon>
        <Loading width="24" />
      </Icon>
      <Label>Loading</Label>
    </ListItem>
    <ListItem>
      <Icon>
        <Close width="9" height="13" />
      </Icon>
      <Label>Close</Label>
    </ListItem>
    <ListItem>
      <Icon>
        <Import width="24" height="24" />
      </Icon>
      <Label>Import</Label>
    </ListItem>
    <ListItem>
      <Icon>
        <Actions width="4" height="16" />
      </Icon>
      <Label>Actions &gt; Dark</Label>
    </ListItem>
    <ListItem>
      <Icon dark>
        <Actions width="4" height="16" light />
      </Icon>
      <Label>Actions &gt; Light</Label>
    </ListItem>
    <ListItem>
      <Icon>
        <Plus />
      </Icon>
      <Label>Plus</Label>
    </ListItem>
    <ListItem>
      <Icon>
        <Minus />
      </Icon>
      <Label>Minus</Label>
    </ListItem>
    <ListItem>
      <Icon>
        <Health width="18" />
      </Icon>
      <Label>Healthy</Label>
    </ListItem>
    <ListItem>
      <Icon>
        <Health healthy={false} width="18" />
      </Icon>
      <Label>Unhealthy</Label>
    </ListItem>
    <ListItem>
      <Icon>
        <Checkcircle checked width="9" />
      </Icon>
      <Label>Tick</Label>
    </ListItem>
    <ListItem>
      <Icon>
        <Checkcircle checked fill width="18" />
      </Icon>
      <Label>Completed</Label>
    </ListItem>
    <ListItem>
      <Icon>
        <Checkcircle checked border width="18" />
      </Icon>
      <Label>Part Completed</Label>
    </ListItem>
    <ListItem>
      <Icon>
        <Checkcircle border width="18" />
      </Icon>
      <Label>Incomplete</Label>
    </ListItem>
    <ListItem>
      <Icon>
        <Bin width="18" />
      </Icon>
      <Label>Bin</Label>
    </ListItem>
    <ListItem>
      <Icon>
        <User />
      </Icon>
      <Label>User &gt; Dark</Label>
    </ListItem>
    <ListItem>
      <Icon dark>
        <User light />
      </Icon>
      <Label>User &gt; Light</Label>
    </ListItem>
    <ListItem>
      <Icon>
        <DataCenter width="9" height="13" />
      </Icon>
      <Label>Data Centre &gt; Dark</Label>
    </ListItem>
    <ListItem>
      <Icon dark>
        <DataCenter width="9" height="13" light />
      </Icon>
      <Label>Data Centre &gt; Light</Label>
    </ListItem>
    <ListItem>
      <Icon dark>
        <Triton />
      </Icon>
      <Label>Triton Logo</Label>
    </ListItem>
    <ListItem>
      <Icon dark>
        <Triton beta />
      </Icon>
      <Label>Triton Beta Logo</Label>
    </ListItem>
  </List>
);

export default Icons;
