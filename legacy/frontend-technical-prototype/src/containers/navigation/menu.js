import React from 'react';
import { connect } from 'react-redux';
import {
  orgSectionsByIdSelector,
  projectSectionsSelector,
  serviceSectionsSelector
} from '@root/state/selectors';
import { Menu as MenuComponent } from '@components/navigation';

const Menu = (props) => {

  const {
    match,
    sections
  } = props;

  const links = sections.map((section) => ({
    name: section,
    pathname: `${match.url}/${section}`
  }));

  return (
    <MenuComponent links={links} />
  );
};

Menu.propTypes = {
  match: React.PropTypes.object.isRequired,
  sections: React.PropTypes.array.isRequired
};

const mapStateToProps = (state, {
  match = {
    params: {}
  }
}) => ({
  location,
  match,
  sections: match.params.service ?
    serviceSectionsSelector(state) :
    match.params.project ?
    projectSectionsSelector(state) :
    orgSectionsByIdSelector(match.params.org)(state)
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);
