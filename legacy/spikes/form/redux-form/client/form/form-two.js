const React = require('react');
const ReactRouter = require('react-router');
const ReduxForm = require('redux-form');
const Styled = require('styled-components');
const Input = require('./input');
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

const FormTwo = (props) => {
  const { handleSubmit } = props
  return (
    <Form onSubmit={handleSubmit(() => {browserHistory.push('/form-three')})}>
      <Field name="email" type="email" component={Input} label="Email"/>
      <div>
        <label>Sex</label>
        <Field name="sex" component={
          ({ meta: { touched, error } }) => touched && error ?
            <span> {error}</span> : false
          }/>
        <div>
          <label><Field name="sex" component="input" type="radio" value="male"/> Male</label>
          <label><Field name="sex" component="input" type="radio" value="female"/> Female</label>
        </div>
      </div>
      <div>
        <button type="button" className="previous" onClick={
          e => {
            e.preventDefault();
            browserHistory.push('/form-one');
          }}>Previous</button>
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
})(FormTwo)
