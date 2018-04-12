import intercept from 'apr-intercept';
import keys from 'lodash.keys';
import reduce from 'apr-reduce';
import assign from 'lodash.assign';
import yup from 'yup';

/*****************************************************************************/

const validateField = async (field, value) => {
  const [err] = await intercept(field.validate(value));
  return err ? err.errors.shift() : '';
};

const validateSchema = async (schema, value) => {
  const errors = await reduce(
    keys(schema),
    async (errors, name) => {
      const msg = await validateField(schema[name], value[name]);
      return !msg ? errors : assign(errors, { [name]: msg });
    },
    {}
  );

  if (keys(errors).length) {
    throw errors;
  }
};

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
    return !msg ? errors : assign(errors, { [name]: msg });
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
  instanceName: {
    name: yup
      .string()
      .notRequired()
      .matches(matches.nameStart, msgs.nameStart('Instance name'))
      .matches(matches.nameBody, msgs.nameBody('Instance Name'))
  }
};

/*****************************************************************************/

export const instanceName = ({ name }) =>
  !name ? null : syncValidateSchema(Schemas.instanceName, { name });
