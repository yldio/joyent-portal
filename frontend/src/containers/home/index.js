import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import Container from '@ui/components/container';
import Org from '@containers/org';
import PropTypes from '@root/prop-types';
import Redirect from '@components/redirect';
import { orgsSelector } from '@state/selectors';
import NotFound from '@containers/not-found';

const Home = ({
  orgs = []
}) => {
  const notFound = orgs.length ? Redirect(`/${orgs[0].id}`) : (
    <NotFound />
  );

  return (
    <div>
      <Container>
        <Switch>
          <Route component={Org} path='/:org/:section?' />
          <Route component={notFound} />
        </Switch>
      </Container>
    </div>
  );
};

Home.propTypes = {
  orgs: React.PropTypes.arrayOf(PropTypes.org)
};

const mapStateToProps = (state) => ({
  orgs: orgsSelector(state)
});

export default connect(
  mapStateToProps
)(Home);
