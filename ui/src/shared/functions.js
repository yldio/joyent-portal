module.exports = {
  remCalc: function(values) {
    values = values.replace('px', '');
    values = values.split(' ');

    let outputRems = '';
    const base = 16;

    values.forEach( (value, i) => {
      const remValue = value / base;
      outputRems += i === 0 ? `${remValue}rem` : ` ${remValue}rem`;
    });

    return outputRems;
  }
};
