# redux-form

## summary

 - [x] form values in redux store
 - [x] clear / retain values in store
 - [x] pre-populate form
 - [x] validation on field / form level
 - [x] multi page form
 - [x] custom form components
 - [ ] requires updates to existing ui components as props to custom components are passed in the following format: 
 
 `"props": { "input": "value": "", "name": "", "onChange": "", "onFocus": "", ... }, "meta": { "valid": "", "error": "", ... }, "anyOtherPropsOnField": "", ... }`

- [ ] explore proxying props from Field to custom components from above shape to a flat form as expected by custom components
- [ ] consider creating component that handles logic and display of label and error which would be reused by form components to avoid code duplication for this functionality 
