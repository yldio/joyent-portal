import React from 'react';
import { connect } from 'react-redux';

import PropTypes from '@root/prop-types';
import { orgByIdSelector, orgSectionsSelector } from '@state/selectors';
import Section from '@components/section';

const OrgSection = ({
  children,
  org = {},
  sections = []
}) => {
  const navLinks = sections.map((name) => ({
    pathname: `/${org.id}/${name}`,
    name
  }));

  const nameLinks = [{
    pathname: `/${org.id}`,
    name: org.name
  }];

  return (
    <Section links={navLinks} name={nameLinks}>
      {children}
    </Section>
  );
};

OrgSection.propTypes = {
  children: React.PropTypes.node,
  org: PropTypes.org,
  sections: PropTypes.sections
};

const mapStateToProps = (state, ownProps) => ({
  org: orgByIdSelector(ownProps.match.params.org)(state),
  sections: orgSectionsSelector(ownProps.match.params.org)(state)
});

export default connect(
  mapStateToProps
)(OrgSection);
