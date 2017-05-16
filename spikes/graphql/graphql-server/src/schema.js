import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';

const schema = `

scalar Date
scalar Object

type Portal {
  username: String!
  host: String! # dockerhost
  datacenter: Datacenter!
  deploymentGroups: [DeploymentGroup]!
}

type DeploymentGroup {
  uuid: String!
  name: String!
  slug:  String!
  datacenter: Datacenter!
  services: [Service]!
  version: Version!
  history: [Version]!
}

type ServiceScale {
  name: String!
  replicas: Int!
}

enum ConvergenceActionType {
   NOOP
   CREATE
   RECREATE
   START
 }

 type ConvergenceAction {
   uuid: String!
   type: ConvergenceActionType!
   service: String! # service name
   machines: [String]! # instance machine ids
 }

 type StateConvergencePlan {
   uuid: String!
   running: Boolean!
   actions: [ConvergenceAction]!
 }

type Version {
  created: Date!
  manifest: Manifest!
  scale: [ServiceScale]!
  plan: StateConvergencePlan
}

type Manifest {
  uuid: String!
  created: Date!
  type: String!
  format: String!
  raw: String!
  obj: Object!
}

type CurrentMetric {
  name: String!
  value: Float!
  measurement: String!
}

# immutable
type Service {
  uuid: String! # unique id for db row
  hash: String! # unique id for version of service
  name: String! # human readable name
  slug:  String!
  instances: [Instance]!
  # metrics: [MetricType]!
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

# for metrics max / min (I guess)
type Package {
  type: String!
  memory: Int!
  disk: Int!
  vCPUs: Float! # This should be a number / double, not an int
}

enum InstanceStatus {
  CREATED
  RESTARTING
  RUNNING
  PAUSED
  EXITED
  DELETED
}

type Instance {
  uuid: String!
  name: String!
  machineId: String!
  status: InstanceStatus!
  # metrics: [InstanceMetric]!
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
  slug: String!
  location: String!
}

# Need to review queries
type Query {
  portal: Portal
  deploymentGroups: [DeploymentGroup]
  deploymentGroup(uuid: String, slug: String): DeploymentGroup
  services(deploymentGroupUuid: String, deploymentGroupSlug: String): [Service]
  service(uuid: String, slug: String): Service
  instances(serviceUuid: String, serviceSlug: String): [Instance]
  instance(uuid: String, machineId: String): Instance
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
