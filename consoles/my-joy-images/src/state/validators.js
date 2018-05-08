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
  tag: {
    name: yup
      .string()
      .required(msgs.required('Key'))
      .matches(matches.nameStart, msgs.nameStart('Key'))
      .matches(matches.nameBody, msgs.nameBody('Key')),
    value: yup
      .string()
      .required(msgs.required('Value'))
      .matches(matches.nameStart, msgs.nameStart('Value'))
      .matches(matches.nameBody, msgs.nameBody('Value'))
  },
  instanceName: {
    name: yup
      .string()
      .matches(matches.nameStart, msgs.nameStart('Instance name'))
      .matches(matches.nameBody, msgs.nameBody('Instance Name'))
  }
};

/*****************************************************************************/

export const addTag = tag => validateSchema(Schemas.tag, tag);

export const instanceName = ({ name }) =>
  !name ? null : validateSchema(Schemas.instanceName, { name });
