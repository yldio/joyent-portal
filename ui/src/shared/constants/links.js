const Color = require('color');

const links = {
  color: '#364ACD',
  decoration: 'none',
  hoverColor: ({
    color
  }) => {
    return Color(color).darken(0.15).hex();
  },
  hoverDecoration: 'underline'
};

module.exports = links;
