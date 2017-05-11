import styled from 'styled-components';

const Article = styled.article`
  font-family: Helvetica;
  padding: 10px;
  color: dimgray;
`;

export default ({ children }) => (
  <Article>
    {children}
  </Article>
);
