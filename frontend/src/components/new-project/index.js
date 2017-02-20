import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { colors } from '@ui/shared/constants';
import { remcalc } from '@ui/shared/functions';
import { H2 } from '@ui/components/base-elements';
import Button from '@ui/components/button';

import {
  FormGroup,
  FormLabel,
  FormMeta,
  Input
} from '@ui/components/form';

const Container = styled.div`
  padding: ${remcalc(96)} ${remcalc(40)};
`;

const Title = styled(H2)`
  margin: 0 0 ${remcalc(18)} 0;
  font-size: ${remcalc(36)};
  color: ${colors.brandSecondaryColor};
`;

const Description = styled.p`
  margin-bottom: ${remcalc(24)}
  font-size: ${remcalc(16)};
  color: ${colors.brandSecondaryColor};
  max-width: ${remcalc(380)};
`;

const ProjectNameFormGroup = styled(FormGroup)`
  max-width: ${remcalc(380)};
  margin-bottom: ${remcalc(16)};
`;

const Buttons = styled.div`
  display: flex;
  flex-flow: row;
`;

const LeftButton = styled(Button)`
  margin-right: ${remcalc(6)};
`;

const CreateProject = ({
  handleSubmit,
  onCancel,
  onSubmit,
  pristine,
  submitting
}) => {
  const _onCancel = (evt) => {
    evt.preventDefault();
    onCancel();
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Title>
          <FormattedMessage id='new-project.title' />
        </Title>
        <Description>
          <FormattedMessage id='new-project.description' />
        </Description>
        <ProjectNameFormGroup name='project-name' reduxForm>
          <FormLabel>Project name</FormLabel>
          <Input placeholder='Project name' />
          <FormMeta />
        </ProjectNameFormGroup>
        <Buttons>
          <LeftButton onClick={_onCancel} secondary>
            <FormattedMessage id='cancel' />
          </LeftButton>
          <Button
            disabled={pristine || submitting}
            primary
            type='submit'
          >
            <FormattedMessage id='submit' />
          </Button>
        </Buttons>
      </form>
    </Container>
  );
};

CreateProject.propTypes = {
  handleSubmit: React.PropTypes.func.isRequired,
  onCancel: React.PropTypes.func.isRequired,
  onSubmit: React.PropTypes.func.isRequired,
  pristine: React.PropTypes.bool.isRequired,
  submitting: React.PropTypes.bool.isRequired
};

export default CreateProject;
