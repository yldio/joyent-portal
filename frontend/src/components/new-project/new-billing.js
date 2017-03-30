import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import { colors } from '@ui/shared/constants';
import { remcalc } from '@ui/shared/functions';
import Button from '@ui/components/button';
import { H2 } from '@ui/components/base-elements';

import {
  FormGroup,
  FormLabel,
  FormMeta,
  Input
} from '@ui/components/form';

import {
  normalizeCardNumber,
  normalizeCardCVV,
  normalizeCardExpiry
} from '@root/utils/form/normalize';

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
  font-size: ${remcalc(15)};
  color: ${colors.brandSecondaryColor};
  max-width: ${remcalc(380)};
`;

const LongFormGroup = styled(FormGroup)`
  max-width: ${remcalc(380)};
  margin-bottom: ${remcalc(16)};
`;

const ShortFormGroups = styled.div`
  display: flex;
  flex-flow: row;
`;

const ShortFormGroup = styled(FormGroup)`
  max-width: ${remcalc(184)};
  margin-right: ${remcalc(12)}
  margin-bottom: ${remcalc(16)};
`;

const Buttons = styled.div`
  display: flex;
  flex-flow: row;
`;

const ProjectNameButtons = styled(Button)`
  margin-right: ${remcalc(6)};
`;

const CreateBilling = ({
  handleSubmit,
  onBack,
  onSubmit,
  pristine,
  submitting
}) => {
  const _onBack = (evt) => {
    evt.preventDefault();
    onBack(evt);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Title>
          <FormattedMessage id='new-billing.title' />
        </Title>
        <Description>
          <FormattedMessage id='new-billing.description' />
        </Description>
        <LongFormGroup
          name='card-number'
          normalize={normalizeCardNumber}
          reduxForm
        >
          <FormLabel>Card number</FormLabel>
          <Input placeholder='xxxx-xxxx-xxxx-xxxx' />
          <FormMeta />
        </LongFormGroup>
        <ShortFormGroups>
          <ShortFormGroup
            name='cvv-code'
            normalize={normalizeCardCVV}
            reduxForm
          >
            <FormLabel>CVV Code</FormLabel>
            <Input placeholder='xxx' />
            <FormMeta />
          </ShortFormGroup>
          <ShortFormGroup
            name='expiry-date'
            normalize={normalizeCardExpiry}
            reduxForm
          >
            <FormLabel>Expiry date</FormLabel>
            <Input placeholder='mm/yy' />
            <FormMeta />
          </ShortFormGroup>
        </ShortFormGroups>
        <LongFormGroup name='name' reduxForm>
          <FormLabel>Name on card</FormLabel>
          <Input placeholder='' />
          <FormMeta />
        </LongFormGroup>
        <Buttons>
          <ProjectNameButtons onClick={_onBack} secondary>
            <FormattedMessage id='back' />
          </ProjectNameButtons>
          <ProjectNameButtons
            disabled={pristine || submitting}
            primary
            type='submit'
          >
            <FormattedMessage id='new-billing.save-details-label' />
          </ProjectNameButtons>
        </Buttons>
      </form>
    </Container>
  );
};

CreateBilling.propTypes = {
  handleSubmit: React.PropTypes.func.isRequired,
  onBack: React.PropTypes.func.isRequired,
  onSubmit: React.PropTypes.func.isRequired,
  pristine: React.PropTypes.bool.isRequired,
  submitting: React.PropTypes.bool.isRequired
};

export default CreateBilling;
