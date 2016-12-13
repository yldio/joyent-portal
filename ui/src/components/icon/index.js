const React = require('react');
const Styled = require('styled-components');

const {
  default: styled,
  css
} = Styled;

const styles = css`
  font-size: inherit;
`;

const Icon = ({
  name = 'beer',
  className,
  iconSet = 'fa',
  style
}) => {
  const Icon = require(`react-icons/lib/${iconSet}/${name}`);
  const Component = styled(Icon)(styles);

  return (
    <Component className={className} style={style} />
  );
};

Icon.propTypes = {
  className: React.PropTypes.string,
  iconSet: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  style: React.PropTypes.object
};

module.exports = Icon;
