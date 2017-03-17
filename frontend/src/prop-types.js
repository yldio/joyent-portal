import React from 'react';

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

const Instance = React.PropTypes.shape({
  ...BaseObject,
  datacenter: React.PropTypes.string,
  service: React.PropTypes.string,
  project: React.PropTypes.string
});

const Metric = React.PropTypes.shape({
  ...BaseObject,
  min: React.PropTypes.number,
  max: React.PropTypes.number,
  measurement: React.PropTypes.string
});

const MetricType = React.PropTypes.shape({
  ...BaseObject
});

const Data = React.PropTypes.shape({
  firstQuartile: React.PropTypes.number,
  thirdQuartile: React.PropTypes.number,
  median: React.PropTypes.number,
  max: React.PropTypes.number,
  min: React.PropTypes.number
});

const Dataset = React.PropTypes.shape({
  uuid: React.PropTypes.string,
  type: MetricType,
  data: React.PropTypes.arrayOf(Data)
});

const Sections = React.PropTypes.arrayOf(
  React.PropTypes.string
);

export default {
  account: Account,
  link: Link,
  org: Org,
  project: Project,
  sections: Sections,
  service: Service,
  instance: Instance,
  metric: Metric,
  metricType: MetricType,
  dataset: Dataset,
  data: Data
};
