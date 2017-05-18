import moment from 'moment';

const getDurationArgs = (value) => {
  const [durationNumber, durationType] = value.split(/\s/);
  return [Number(durationNumber), durationType];
};

const getDurationMilliseconds = (value) => {
  return moment.duration(...getDurationArgs(value)).valueOf();
};

export {
  getDurationArgs,
  getDurationMilliseconds
};
