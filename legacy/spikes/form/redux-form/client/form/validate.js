const validator = require('validator');

const validate = values => {
  console.log('validate values = ', values);
  const errors = {};
  if (!values.firstName) {
    errors.firstName = 'Required';
  }
  if (!values.lastName) {
    errors.lastName = 'Required';
  }
  if (!values.email) {
    errors.email = 'Required';
  } else if (!validator.isEmail(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.sex) {
    errors.sex = 'Required';
  }
  if (!values.favoriteColor) {
    errors.favoriteColor = 'Required';
  }
  console.log('errors = ', errors);
  return errors;
}

module.exports = validate;
