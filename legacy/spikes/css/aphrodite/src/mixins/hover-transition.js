const transition = 'ease-in-out all 0.5s';

const types = {
  button: ({
    type,
    color,
    hover
  }) => {
    return {
      backgroundColor: color,
      transition,
      ':hover': {
        backgroundColor: hover,
        transition
      }
    };
  },
  text: ({
    type,
    color,
    hover
  }) => {
    return {
      color,
      transition,
      ':hover': {
        color: hover,
        transition,
        textDecoration: 'underline'
      }
    };
  }
};

export default (props) => {
  return types[props.type](props);
};