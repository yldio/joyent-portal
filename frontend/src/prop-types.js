const React = require('react');

const BaseObject = {
  uuid: React.PropTypes.string,
  id: React.PropTypes.string,
  name: React.PropTypes.string
};

const Account = React.PropTypes.shape({
  ...BaseObject
});

const Link = React.PropTypes.shape({
  name: React.PropTypes.string,
  pathname: React.PropTypes.string
});

const Org = React.PropTypes.shape({
  ...BaseObject,
  owner: React.PropTypes.string
});

const Project = React.PropTypes.shape({
  ...BaseObject
});

const Service = React.PropTypes.shape({
  ...BaseObject
});

const Sections = React.PropTypes.arrayOf(
  React.PropTypes.string
);

module.exports = {
  account: Account,
  link: Link,
  org: Org,
  project: Project,
  sections: Sections,
  service: Service
};
