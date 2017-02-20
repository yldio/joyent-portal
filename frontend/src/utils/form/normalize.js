const numbers = (value) => value.replace(/[^\d]/g, '');

const normalizeCardNumber = (value, previousValue) => {

  if(!value) {
    return value;
  }

  const n = numbers(value);
  if (!previousValue || value.length > previousValue.length) {
    if (n.length === 4) {
      return n + '-';
    }
    if (n.length === 8) {
      return n.slice(0, 4) + '-' + n.slice(4) + '-';
    }
    if (n.length === 12) {
      return n.slice(0, 4) + '-' + n.slice(4, 8) + '-' + n.slice(8);
    }
  }
  if (n.length <= 4) {
    return n;
  }
  if (n.length <= 8) {
    return n.slice(0, 4) + '-' + n.slice(4);
  }
  if (n.length <= 12) {
    return n.slice(0, 4) + '-' + n.slice(4, 8) + '-' + n.slice(8);
  }
  return n.slice(0, 4) + '-' + n.slice(4, 8) + '-' +
    n.slice(8, 12) + '-' + n.slice(12, 16);
};

const normalizeCardCVV = (value, previousValue) => {

  if(!value) {
    return value;
  }

  const n = numbers(value);

  if(n.length > 3) {
    return n.slice(0, 3);
  }

  return n;
};

const normalizeCardExpiry = (value, previousValue) => {

  if(!value) {
    return value;
  }

  const n = numbers(value);

  if (!previousValue || value.length > previousValue.length) {
    if (n.length === 2) {
      return n + '/';
    }
  }
  if (n.length <= 2) {
    return n;
  }
  return n.slice(0, 2) + '/' + n.slice(2, 4);
};

export {
  normalizeCardNumber,
  normalizeCardCVV,
  normalizeCardExpiry
};
