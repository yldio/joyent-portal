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

const FormThree = (props) => {
  const { handleSubmit, pristine, submitting } = props
  return (
    <Form onSubmit={
      e => {
        e.preventDefault();
        browserHistory.push('/form');
      }}>
      <div>
        <label>Favorite Color</label>
        <Field name="favoriteColor" component="select">
          <option></option>
          <option value="ff0000">Red</option>
          <option value="00ff00">Green</option>
          <option value="0000ff">Blue</option>
        </Field>
      </div>
      <div>
        <label htmlFor="employed">Employed</label>
        <div>
          <Field name="employed" id="employed" component="input" type="checkbox"/>
        </div>
      </div>
      <div>
        <label>Notes</label>
        <div>
          <Field name="notes" component="textarea" placeholder="Notes"/>
        </div>
      </div>
      <div>
        <button type="button" className="previous" onClick={
          e => {
            e.preventDefault();
            browserHistory.push('/form-two');
        }}>Previous</button>
        <button type="submit" disabled={pristine || submitting}>Submit</button>
      </div>
    </Form>
  )
}

module.exports = reduxForm({
  form: 'multiform',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
})(FormThree)
