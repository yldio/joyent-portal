import is from 'styled-is';
import remcalc from 'remcalc';
import styled from 'styled-components';

export const List = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  flex-wrap: wrap;
`;

export const Icon = styled.div`
  width: ${remcalc(165)};
  height: ${remcalc(165)};
  border: ${remcalc(2)} solid ${props => props.theme.grey};
  align-items: center;
  justify-content: center;
  display: flex;

  ${is('dark')`
    background: ${props => props.theme.secondary};
  `};
`;

export const ListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
