import styled from 'styled-components';

export default styled.span`
  display: inline-block;

  & [data-ui-button='true'] {
    margin-left: 0 !important; /* remove when we remove margins */
  }

  & [data-ui-button='true']:not(:first-child) {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  & [data-ui-button='true']:not(:last-child) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    margin-right: -1px;
  }
`;
