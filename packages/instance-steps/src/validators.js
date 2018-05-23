import intercept from 'apr-intercept';
import keys from 'lodash.keys';
import reduce from 'apr-reduce';
import assign from 'lodash.assign';
import * as yup from 'yup';

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
      return msg ? assign(errors, { [name]: msg }) : errors;
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
  instanceName: {
    name: yup
      .string()
      .notRequired()
      .matches(matches.nameStart, msgs.nameStart('Instance name'))
      .matches(matches.nameBody, msgs.nameBody('Instance Name'))
  },
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
  metadata: {
    name: yup
      .string()
      .required(msgs.required('Key'))
      .matches(matches.nameStart, msgs.nameStart('Key'))
      .matches(matches.nameBody, msgs.nameBody('Key')),
    value: yup.string().required(msgs.required('Value'))
  },
  cns: {
    name: yup
      .string()
      .required(msgs.required('Service names'))
      .matches(matches.nameStart, msgs.nameStart('Service names'))
      .matches(matches.nameBody, msgs.nameBody('Service names'))
  },
  affinityRule: {
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
  }
};

/*****************************************************************************/

export const instanceName = ({ name }) =>
  name ? syncValidateSchema(Schemas.instanceName, { name }) : null;

export const addTag = tag => validateSchema(Schemas.tag, tag);

export const addMetadata = metadata =>
  validateSchema(Schemas.metadata, metadata);

export const addCnsService = service => validateSchema(Schemas.cns, service);

export const addAffinityRule = aff => validateSchema(Schemas.affinityRule, aff);
