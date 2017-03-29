import React, { Component, PropTypes} from 'react';
// import { connect } from 'react-redux';
// import { orgsSelector } from '@state/selectors';

class AppRedirect extends Component {

  /*componentWillMount() {
    console.log('this.props = ', this.props);
    const {
      match,
      orgs,
      push
    } = this.props;

    if(orgs && orgs.length){
      const orgId = orgs[0].id;
      const path = `${match.url}/${orgId}/projects`;
      push(path);
    }
  }*/

  render() {
    return (
      <div>
        <p>AppRedirect</p>
      </div>
    )
  }
}

AppRedirect.propTypes = {
  match: PropTypes.object,
  orgs: PropTypes.array,
  push: PropTypes.func
};

export default AppRedirect;

/*const mapStateToProps = (state, {
  match,
  push
}) => ({
  match,
  orgs: orgsSelector(state),
  push
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppRedirect);*/
