import styled from 'styled-components';

export default styled.ul`
  padding: 0;
  margin: 0;
  display: flex;
  list-style: none;
  color: ${props => props.theme.white};
  -webkit-text-fill-color: ${props => props.theme.white};
`;
