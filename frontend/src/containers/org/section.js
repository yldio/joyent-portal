const React = require('react');
const ReactRedux = require('react-redux');

const selectors = require('@state/selectors');
const Section = require('@components/section');

const {
  connect
} = ReactRedux;

const {
  orgByIdSelector,
  orgSectionsSelector
} = selectors;

const OrgSection = ({
  children,
  org = {},
  sections = []
}) => {
  const links = sections.map((name) => ({
    pathname: `/${org.id}/${name}`,
    name
  }));

  return (
    <Section links={links} name={org.name}>
      {children}
    </Section>
  );
};

OrgSection.propTypes = {
  children: React.PropTypes.node,
  org: React.PropTypes.shape({
    id: React.PropTypes.string,
    name: React.PropTypes.string
  }),
  sections: React.PropTypes.arrayOf(
    React.PropTypes.string
  )
};

const mapStateToProps = (state, ownProps) => ({
  org: orgByIdSelector(ownProps.params.org)(state),
  sections: orgSectionsSelector(ownProps.params.org)(state)
});

module.exports = connect(mapStateToProps)(OrgSection);
