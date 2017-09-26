import React from 'react';
import {
  IconActions,
  IconActionsLight,
  CloseIcon,
  PlusIcon,
  MinusIcon,
  ArrowIcon,
  ArrowIconLight,
  TickIcon,
  InstancesIcon,
  InstancesIconLight,
  HealthyIcon,
  UnhealthyIcon,
  BinIcon,
  UserIcon,
  DataCenterIcon,
  DataCenterIconLight,
  ChevronIcon,
  TritonIcon,
  CompletedIcon,
  PartCompletedIcon,
  IncompleteIcon,
  LoadingIcon
} from './';
import { default as Label } from '../label';
import is from 'styled-is';
import remcalc from 'remcalc';
import styled from 'styled-components';

const List = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  flex-wrap: wrap;
`;
const Icon = styled.div`
  width: ${remcalc(180)};
  height: ${remcalc(180)};
  border: ${remcalc(2)} solid #d8d8d8;
  align-items: center;
  justify-content: center;
  display: flex;
  margin-bottom: ${remcalc(18)};

  ${is('dark')`
        background: #464646;
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
        <ChevronIcon width="6" />
      </Icon>
      <Label>Chevron</Label>
    </ListItem>
    <ListItem>
      <Icon>
        <ArrowIcon width="6" />
      </Icon>
      <Label>Arrow > Light</Label>
    </ListItem>
    <ListItem>
      <Icon dark>
        <ArrowIconLight width="6" />
      </Icon>
      <Label>Arrow > Dark</Label>
    </ListItem>
    <ListItem>
      <Icon>
        <InstancesIcon width="18" />
      </Icon>
      <Label>Instances > Dark</Label>
    </ListItem>
    <ListItem>
      <Icon dark>
        <InstancesIconLight width="18" />
      </Icon>
      <Label>Instances > Light</Label>
    </ListItem>
    <ListItem>
      <Icon>
        <LoadingIcon width="24" />
      </Icon>
      <Label>Loading</Label>
    </ListItem>
    <ListItem>
      <Icon>
        <CloseIcon width="9" height="13" />
      </Icon>
      <Label>Close</Label>
    </ListItem>
    <ListItem>
      <Icon>
        <IconActions width="4" height="16" />
      </Icon>
      <Label>Actions > Light</Label>
    </ListItem>
    <ListItem>
      <Icon dark>
        <IconActionsLight width="4" height="16" />
      </Icon>
      <Label>Actions > Dark</Label>
    </ListItem>
    <ListItem>
      <Icon>
        <PlusIcon />
      </Icon>
      <Label>Plus</Label>
    </ListItem>
    <ListItem>
      <Icon>
        <MinusIcon />
      </Icon>
      <Label>Minus</Label>
    </ListItem>
    <ListItem>
      <Icon>
        <HealthyIcon width="18" />
      </Icon>
      <Label>Healthy</Label>
    </ListItem>
    <ListItem>
      <Icon>
        <UnhealthyIcon width="18" />
      </Icon>
      <Label>Chevron</Label>
    </ListItem>
    <ListItem>
      <Icon>
        <TickIcon width="9" />
      </Icon>
      <Label>Tick</Label>
    </ListItem>
    <ListItem>
      <Icon>
        <CompletedIcon width="18" />
      </Icon>
      <Label>Completed</Label>
    </ListItem>
    <ListItem>
      <Icon>
        <PartCompletedIcon width="18" />
      </Icon>
      <Label>Part Completed</Label>
    </ListItem>
    <ListItem>
      <Icon>
        <IncompleteIcon width="18" />
      </Icon>
      <Label>Incomplete</Label>
    </ListItem>
    <ListItem>
      <Icon>
        <BinIcon width="18" />
      </Icon>
      <Label>Bin</Label>
    </ListItem>
    <ListItem>
      <Icon>
        <UserIcon />
      </Icon>
      <Label>User</Label>
    </ListItem>
    <ListItem>
      <Icon>
        <DataCenterIcon width="9" height="13" />
      </Icon>
      <Label>Data Centre > Dark</Label>
    </ListItem>
    <ListItem>
      <Icon dark>
        <DataCenterIconLight width="9" height="13" />
      </Icon>
      <Label>Data Centre > Light</Label>
    </ListItem>
    <ListItem>
      <Icon dark>
        <TritonIcon />
      </Icon>
      <Label>Triton Logo</Label>
    </ListItem>
  </List>
);

export default Icons;
