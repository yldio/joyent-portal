const React = require('react');
const ReduxForm = require('redux-form');
const Styled = require('styled-components');
const Input = require('./input');
const InputRfProps = require('./inputRfProps');

const {
  Field,
  reduxForm
} = ReduxForm;

const {
  default: styled
} = Styled;

const Form = styled.form`
  margin: 30px auto;
  width: 300px;
`;

const InputField = styled.input`
  margin-bottom: 15px;
  background: #FFFFFF;
  display: block;
  font-size: 16px;
  height: 50px;
  padding-left: 15px;
  padding-right: 15px;
  visibility: visible;
  width: 100%;

  border: 1px solid #3B46CC;
  border-radius: 4px;
  box-shadow: inset 0 3px 0 0 rgba(0, 0, 0, 0.05);

  &:focus {
    border-color: 1px solid #3B46CC;
    outline: none;
  }
`;

// styled html input element - props.input -> props
const SimpleInput = (props) => {
  return (
    <InputField
      type="text"
      {...props.input}
      placeholder={props.placeholder} />
    );
}

const TestMultiform = React.createClass({
  render: function() {
    const {
      handleSubmit,
      pristine,
      reset,
      submitting
    } = this.props;

    return (
        <Form onSubmit={handleSubmit}>
          <div>
            <label>First Name</label>
            <div>
              { /* styled html input */ }
              <Field name="firstName" component={SimpleInput} type="text" placeholder="First Name"/>
            </div>
          </div>
          <div>
            { /* Input component from @ui - props.input -> props, props.meta -> props, props -> props */ }
            <Field name="lastName" component={
                props => <Input {...props.input} {...props.meta} {...props} />
              } type="text" placeholder="Last Name" label="Last Name"/>
          </div>
          <div>
            <Field name="email" component={InputRfProps} type="email" placeholder="Email" label="Email"/>
          </div>
          <div>
            { /* Input component from @ui - modified to expect props.input */ }
            <Field name="catName" component={InputRfProps} placeholder="My cat's name" label="Cat's name"/>
          </div>
          <div>
            <label>Sex</label>
            <div>
              <label><Field name="sex" component="input" type="radio" value="male"/> Male</label>
              <label><Field name="sex" component="input" type="radio" value="female"/> Female</label>
            </div>
          </div>
          <div>
            <label>Favorite Color</label>
            <div>
              <Field name="favoriteColor" component="select">
                <option></option>
                <option value="ff0000">Red</option>
                <option value="00ff00">Green</option>
                <option value="0000ff">Blue</option>
              </Field>
            </div>
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
              <Field name="notes" component="textarea"/>
            </div>
          </div>
          <div>
            <button type="submit" disabled={pristine || submitting}>Submit</button>
            <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
          </div>
        </Form>
    );
  }
});

module.exports = reduxForm({
  form: 'test-multiform'
})(TestMultiform);
