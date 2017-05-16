import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';

const schema = `

scalar Date

type Portal {
  username: String!
  host: String! # dockerhost
  datacenter: Datacenter!
  deploymentGroups: [DeploymentGroup]!
}

type DeploymentGroup {
  uuid: String!
  name: String!
  pathName:  String!
  datacenter: Datacenter!
  services: [Service]!
  state: DeploymentState
  version: Manifest!
  history: [Manifest]!
}

type DeploymentState {
  current: String
}

type Manifest {
  uuid: String!
  created: Date!
  created: Date!
  type: String!
  format: String!
  raw: String!
}

type CurrentMetric {
  name: String!
  value: Float!
  measurement: String!
}

# immutable
type Service {
  uuid: String!
  hash: String!
  deploymentGoup: String!
  version: Manifest!
  name: String!
  pathName:  String!
  instances: [Instance]!
  metrics: [MetricType]!
  currentMetrics: [CurrentMetric]!
  connections: [String!] # list of serviceUuids
  parent: String # parent service uuid
  package: Package! # we don't have this in current mock data
}

type MetricType {
  uuid: String!
  name: String!
  id: String!
}

# This is ui / dashboard config data - to be stored separately
type ServiceMetric { # name?
  metricType: MetricType!
  pinned: Boolean!
}

# for metrics max / min (I guess)
type Package {
  type: String!
  memory: Int!
  disk: Int!
  vCPUs: Float! # This should be a number / double, not an int
}

type Instance {
  uuid: String!
  name: String!
  id: String!
  deploymentGoup: String!
  service: String!
  metrics: [InstanceMetric]!
}

type InstanceMetric {
  type: MetricType!
  data: [MetricData]!
}

type MetricData {
  timestamp: Int!
  value: Float!
}

type Datacenter {
  uuid: String!
  id: String!
  location: String!
}

type Query {
  portal: Portal
  deploymentGroups: [DeploymentGroup]
  deploymentGroup(uuid: String, pathName: String): DeploymentGroup
  services(deploymentGroupUuid: String, deploymentGroupPathName: String): [Service]
  service(uuid: String, pathName: String): Service
  instances(serviceUuid: String, servicePathName: String): [Instance]
  instance(uuid: String, id: String): Instance
  metricTypes: [MetricType]
  metricData(instanceUuid: String!, metricType: String!, from: Date!, to: Date!): [InstanceMetric]!
  package: Package
  datacenters: [Datacenter]
  # tmp test
  instanceMetric: InstanceMetric!
}

`;

export default makeExecutableSchema({
  typeDefs: schema,
  resolvers,
});
