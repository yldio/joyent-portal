// TODO: use a checkbox

const composers = require('../../shared/composers');
const fns = require('../../shared/functions');
const Styled = require('styled-components');

const {
  verticallyAlignCenter
} = composers;

const {
  remcalc
} = fns;

const {
  default: styled
} = Styled;

const Picture = styled.img`
  ${verticallyAlignCenter}
  max-width: 60%;
`;

const Letter = styled.p`
  font-size: 2rem;
`;

const Avatar = styled.div`
  border-radius: 50%;
  height: ${remcalc(50)};
  overflow: hidden;
  position: relative;
  text-align: center;
  width: ${remcalc(50)};
`;

module.exports = ({
  alt,
  className,
  color,
  crossorigin,
  longdesc,
  name = '',
  sizes,
  src,
  srcset,
  style
}) => {
  const _style = {
    ...style,
    background: color
  };

  const letter = name.split('')[0];
  const av = src ? (
    <Picture
      alt={alt || name}
      crossOrigin={crossorigin}
      longdesc={longdesc}
      sizes={sizes}
      src={src}
      srcSet={srcset}
    />
  ) : (
    <Letter>
      {letter}
    </Letter>
  );

  return (
    <Avatar className={className} style={_style}>
      {av}
    </Avatar>
  );
};

module.exports.propTypes = {
  alt: React.PropTypes.string,
  className: React.PropTypes.string,
  color: React.PropTypes.string,
  crossorigin: React.PropTypes.string,
  longdesc: React.PropTypes.string,
  name: React.PropTypes.string,
  sizes: React.PropTypes.string,
  src: React.PropTypes.string,
  srcset: React.PropTypes.string,
  style: React.PropTypes.object
};
