import { withTheme } from 'styled-components';

export const colors = {
  white: '#FFF',
  text: '#464646',
  greenDark: '#008138',
  green: '#009858',
  orange: '#e38200',
  primary: '#3b46cc'
};

export default withTheme(
  ({ theme = {}, children, direction = 'down', style = {}, ...rest }) =>
    children(
      Object.keys(rest)
        .filter(name => Boolean(rest[name]))
        .reduce(
          (sum, name) => ({
            ...sum,
            [name]: theme[name] || colors[name] || rest[name]
          }),
          rest
        )
    )
);
