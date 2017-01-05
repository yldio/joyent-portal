const React = require('react');
const ReactRouter = require('react-router');
const ReduxForm = require('redux-form');
const Styled = require('styled-components');
const Input = require('./input');
const InputRfProps = require('./inputRfProps');
const validate = require('./validate');
const Form = require('./shared').form;

const {
  browserHistory
} = ReactRouter;

const {
  Field,
  reduxForm
} = ReduxForm;

const {
  default: styled
} = Styled;

const FormOne = (props) => {
  const { handleSubmit } = props;
  return (
    <Form onSubmit={handleSubmit(() => {browserHistory.push('/form-two')})}>
      <Field name="firstName" type="text" component={InputRfProps} label="First Name"/>
      <Field name="lastName" type="text" component={InputRfProps} label="Last Name"/>
      <div>
        <button type="submit" className="next">Next</button>
      </div>
    </Form>
  )
}

module.exports = reduxForm({
  form: 'multiform',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
})(FormOne)
