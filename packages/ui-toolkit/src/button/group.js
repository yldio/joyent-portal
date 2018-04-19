import styled from 'styled-components';

export default styled.span`
  display: inline-block;

  & [data-ui-button='true']:not(:first-child) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  & [data-ui-button='true']:not(:last-child) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
`;
