import React from 'react';
import styled from 'styled-components';
import { reduxForm } from 'redux-form';
import remcalc from 'remcalc';
import { FormGroup, Checkbox, Legend, CheckboxList } from 'joyent-ui-toolkit';

const Radios = styled.section`
  margin-top: ${remcalc(12)};
  min-width: ${remcalc(200)};

  label {
    font-size: ${remcalc(13)};
  }
`;

const CheckboxListStyled = styled(CheckboxList)`
  display: flex;
  align-items: center;
  margin-top: ${remcalc(6)};
`;

const DiskTypeForm = ({ onChange, handleSubmit }) => (
  <form onChange={() => handleSubmit(params => onChange(params))}>
    <Radios>
      <Legend>Disk</Legend>
      <CheckboxListStyled>
        <FormGroup name="magnetic" type="checkbox" reduxForm>
          <Checkbox>Magnetic</Checkbox>
        </FormGroup>
        <FormGroup name="ssd" type="checkbox" reduxForm>
          <Checkbox>SSD</Checkbox>
        </FormGroup>
      </CheckboxListStyled>
    </Radios>
  </form>
);

export default reduxForm({ form: 'magnetic' })(DiskTypeForm);
