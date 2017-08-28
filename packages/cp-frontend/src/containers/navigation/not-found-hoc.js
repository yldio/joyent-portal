import React, { Component } from 'react';
import { NotFound } from '@components/navigation';

export const GqlPaths = {
  DEPLOYMENT_GROUP: 'deploymentGroup',
  SERVICES: 'services'
};

export default paths => {
  return WrappedComponent => {
    return class extends Component {
      componentWillReceiveProps(nextProps) {
        if (paths) {
          const { error, location, history } = nextProps;

          if (
            error &&
            (!location.state || !location.state.notFound) &&
            (error.graphQLErrors && error.graphQLErrors.length)
          ) {
            const graphQLError = error.graphQLErrors[0];
            if (graphQLError.message === 'Not Found') {
              const notFound = graphQLError.path.pop();
              if (paths.indexOf(notFound) > -1) {
                history.replace(location.pathname, { notFound });
              }
            }
          }
        }
      }

      render() {
        const { error, location, match } = this.props;

        if (location.state && location.state.notFound) {
          const notFound = location.state.notFound;
          if (paths && paths.indexOf(notFound) > -1) {
            let title;
            let to;
            let link;
            if (notFound === 'services' || notFound === 'service') {
              title = 'This service doesn’t exist';
              to = match.url
                .split('/')
                .slice(0, 3)
                .join('/');
              link = 'Back to services';
            } else if (notFound === 'deploymentGroup') {
              title = 'This deployment group doesn’t exist';
              to = '/deployment-group';
              link = 'Back to dashboard';
            }
            return (
              <NotFound
                title={title}
                message="Sorry, but our princess is in another castle."
                to={to}
                link={link}
              />
            );
          }
          return null;
        }

        return <WrappedComponent {...this.props} />;
      }
    };
  };
};
