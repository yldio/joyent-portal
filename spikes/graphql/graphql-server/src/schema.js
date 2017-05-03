import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';

const schema = `

scalar Date

type Portal {
  username: String!
  host: String! # dockerhost
  datacenter: Datacenter!
  deployments: [Deployment]!
}

type Version {
  created: Date!
  version: String! # version uuid
}

type Deployment {
  uuid: String!
  name: String!
  datacenter: Datacenter!
  services: [Service]!
  state: DeploymentState
  version: Version!
  history: [Version]!
}

type DeploymentState {
  current: String
}

type Manifest {
  uuid: String!
  created: Date!
  type: String!
  format: String!
  raw: String!
}

# immutable
type Service {
  uuid: String!
  hash: String!
  version: Version!
  name: String!
  instances: [Instance]!
  metrics: [MetricType]!
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
  vCPUs: Int! # This should be a number / double, not an int
}

type Instance {
  uuid: String!
  name: String!
  metrics: [InstanceMetric]!
}

type InstanceMetric {
  type: MetricType!
  data: [MetricData]!
}

type MetricData {
  type: MetricType!
  timestamp: Date!
  value: Int!
}

type Datacenter {
  uuid: String!
  id: String!
  location: String!
}

type Query {
  portal: Portal
  deployments: [Deployment]
  deployment(uuid: String!): Deployment
  services: [Service]
  service(uuid: String!): Service
  instances: [Instance]
  instance(uuid: String!): Instance
  metricTypes: [MetricType]
  package: Package
  datacenters: [Datacenter]
}

type Mutation {
  createDeployment: Deployment
}

`;

export default makeExecutableSchema({
  typeDefs: schema,
  resolvers,
});
