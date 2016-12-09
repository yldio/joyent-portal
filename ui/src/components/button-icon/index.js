// TODO this should inherit <Icon />

const Button = require('../button');
const React = require('react');
const Styled = require('styled-components');

const {
  default: styled,
  css
} = Styled;

const styles = css`
  font-size: inherit;
`;

const ButtonIcon = ({
  name = 'beer',
  className,
  iconSet = 'fa',
  style
}) => {
  const Icon = require(`react-icons/lib/${iconSet}/${name}`);
  const Component = styled(Icon)(styles);

  return (
    <Button>
      <Component className={className} style={style} />
    </Button>
  );
};

ButtonIcon.propTypes = {
  className: React.PropTypes.string,
  iconSet: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  style: React.PropTypes.object
};

module.exports = ButtonIcon;
