import React from 'react';
import styled from 'styled-components';
import Empty from '@components/empty/people';
import Row from '@ui/components/row';
import Column from '@ui/components/column';
import Button from '@ui/components/button';
import PeopleTable from './table';
import Invite from './invite';

const StyledButton = styled(Button)`
  float: right;
`;

const People = (props) => {
  const {
    UI = {},
    handleToggle,
    people
  } = props;

  const invite = !UI.invite_toggled ? null : (
    <Invite {...props} />
  );

  const peopleTable = people.length > 0 ? (
    <PeopleTable {...props} />
  ) : (
    <Empty />
  );

  return (
    <div>
      <Row>
        <Column md={2} mdOffset={9}>
          <StyledButton
            disabled={UI.invite_toggled}
            onClick={handleToggle}
          >
            Invite
          </StyledButton>
        </Column>
      </Row>
      {invite}
      <Row>
        <Column xs={12}>
          {peopleTable}
        </Column>
      </Row>
    </div>
  );
};

People.propTypes = {
  UI: React.PropTypes.object,
  handleToggle: React.PropTypes.func,
  people: React.PropTypes.array
};

export default People;
