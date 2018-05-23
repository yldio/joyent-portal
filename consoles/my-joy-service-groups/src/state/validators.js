import keys from 'lodash.keys';
import assign from 'lodash.assign';
import * as yup from 'yup';

/*****************************************************************************/

const syncValidateField = (field, value) => {
  try {
    field.validateSync(value);
  } catch (err) {
    return err.errors.shift();
  }
};

const syncValidateSchema = (schema, value) => {
  return keys(schema).reduce((errors, name) => {
    const msg = syncValidateField(schema[name], value[name]);
    return msg ? assign(errors, { [name]: msg }) : errors;
  }, {});
};

/*****************************************************************************/

const matches = {
  nameStart: /^[a-zA-Z]|\d/,
  nameBody: /^([a-zA-Z]|\d|_|-)+$/
};

const msgs = {
  required: prefix => `${prefix} must be defined.`,
  nameStart: prefix => `${prefix} can only start with letters and numbers.`,
  nameBody: prefix =>
    `${prefix} cannot contain spaces and can only contain letters, numbers, underscores (_), and hyphens (-).`
};

const Schemas = {
  name: {
    name: yup
      .string()
      .notRequired()
      .matches(matches.nameStart, msgs.nameStart('Service group name'))
      .matches(matches.nameBody, msgs.nameBody('Service group name'))
  }
};

/*****************************************************************************/

export const name = ({ name }) =>
  name ? syncValidateSchema(Schemas.name, { name }) : null;
