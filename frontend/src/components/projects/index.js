const React = require('react');
const ReactIntl = require('react-intl');
// const ReactRouter = require('react-router');

const Column = require('@ui/components/column');
const Button = require('@ui/components/button');
const Row = require('@ui/components/row');

const {
  FormattedMessage
} = ReactIntl;

// const {
//   Link,
//   Match,
//   Miss,
//   Redirect
// } = ReactRouter;

const Projects = ({
  projects = []
}) => {
  const empty = projects.length ? null : (
    <Row>
      <Column xs={12}>
        <p name='empty'>
          <FormattedMessage id='no-personal-projects' />
        </p>
      </Column>
    </Row>
  );

  const _projects = projects.map((project) => (
    <li key={project.id}>
      <input type='checkbox' />
      <span>{project.name} ({project.plan}) ⚙️</span>
    </li>
  ));

  return (
    <div>
      {empty}
      <Row>
        <Column xs={12}>
          <Button>
            <FormattedMessage id='create-new' />
          </Button>
        </Column>
      </Row>
      <Row>
        <ul name='projects'>
          {_projects}
        </ul>
      </Row>
    </div>
  );
};

Projects.propTypes = {
  projects: React.PropTypes.arrayOf(React.PropTypes.shape({
    id: React.PropTypes.string,
    name: React.PropTypes.string,
    plan: React.PropTypes.string
  }))
};

module.exports = Projects;
