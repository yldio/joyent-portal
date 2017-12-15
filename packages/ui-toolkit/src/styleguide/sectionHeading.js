import React from 'react';
import styled from 'styled-components';
import cx from 'classnames';
import Styled from 'react-styleguidist/lib/rsg-components/Styled';
import remcalc from 'remcalc';

const styles = ({ color, fontFamily, fontSize }) => ({
  heading: {
    margin: remcalc(24),
    marginLeft: 0,
    color: color.base,
    fontFamily: fontFamily.base,
    fontWeight: 'normal'
  },
  heading1: {
    fontSize: remcalc(36)
  },
  heading2: {
    fontSize: remcalc(30)
  },
  heading3: {
    fontSize: remcalc(26)
  },
  heading4: {
    fontSize: remcalc(24)
  },
  heading5: {
    fontSize: remcalc(24)
  },
  heading6: {
    fontSize: remcalc(18)
  }
});

const Link = styled.a`
  color: ${props => props.theme.text};
  text-decoration: none;
`;

function HeadingRenderer({ classes, level, children, ...props }) {
  const Tag = `h${level}`;
  const headingClasses = cx(classes.heading, classes[`heading${level}`]);

  const Heading = level === 1 ? null : (
    <Tag {...props} className={headingClasses}>
      {children}
    </Tag>
  )


  return Heading
}

const Heading = Styled(styles)(HeadingRenderer);

export default ({
  classes,
  children,
  toolbar,
  id,
  href,
  depth,
  deprecated
}) => {
  const headingLevel = Math.min(6, depth);

  return (
    <div>
      <Heading level={headingLevel} id={id}>
        <Link href={href}>{children}</Link>
      </Heading>
      {/* <div className={classes.toolbar}>{toolbar}</div> */}
    </div>
  );
};
