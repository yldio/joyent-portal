import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';

const schema = `

scalar Date
scalar Object

type Portal {
  username: String!
  datacenter: Datacenter!
  deploymentGroups: [DeploymentGroup]!
}

type DeploymentGroup {
  uuid: ID!
  name: String!
  slug:  String!
  services: [Service]!
  version: Version!
  history: [Version]!
}

type ServiceScale {
  uuid: ID!
  serviceName: String!
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
  created: Date! # Either Int or define scalar
  manifest: Manifest!
  scale: [ServiceScale]!
  plan: StateConvergencePlan
}

enum ManifestType {
  COMPOSE
  MARIPOSA
}

enum ManifestFormat {
  JSON
  YAML
}

type Manifest {
  uuid: String!
  created: Date!
  type: ManifestType!
  format: ManifestFormat!
  raw: String!
  obj: Object!
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
  parent: ID # parent service uuid
  package: Package! # we don't have this in current mock data
}

# for metrics max / min (I guess)
type Package {
  uuid: ID!
  name: String!
  type: String!
  memory: Float!
  disk: Float!
  swap: Float!
  lwps: Int!
  vcpus: Int!
  version: String!
  group: String!
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

type Datacenter {
  uuid: String!
  # name: String! # Do we have 'official' human readable names?
  region: String!
}

type InstanceMetric {
  type: MetricType!
  data: [MetricData]!
}

type CurrentMetric {
  name: String!
  value: Float!
  measurement: String!
}

type MetricType {
  uuid: String!
  name: String!
  id: String!
}

type MetricData {
  timestamp: Int!
  value: Float!
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

# we probably wont use some of these queries or arguments
# but this way we expose the entire db through gql
type Query {
  portal: Portal
  deploymentGroups(name: String, slug: String): [DeploymentGroup]
  deploymentGroup(uuid: ID, name: String, slug: String): DeploymentGroup
  serviceScales(serviceName: String, versionUuid: ID): [ServiceScale]
  serviceScale(uuid: ID!): ServiceScale
  convergenceActions(type: ConvergenceActionType, service: String, versionUuid: ID): [ConvergenceAction]
  convergenceAction(uuid: ID!): ConvergenceAction
  stateConvergencePlans(running: Boolean, versionUuid: ID): [StateConvergencePlan]
  stateConvergencePlan(uuid: ID!): StateConvergencePlan
  versions(manifestUuid: ID, deploymentGroupUuid: ID): [Version]
  version(uuid: ID, manifestUuid: ID): Version
  manifests(type: String, deploymentGroupUuid: ID): [Manifest]
  manifest(uuid: ID!): Manifest
  services(name: String, slug: String, parentUuid: ID, deploymentGroupUuid: ID, deploymentGroupSlug: String): [Service]
  service(uuid: ID, hash: ID): Service
  packages(name: String, type: String, memory: Int, disk: Int, swap: Int, lwps: Int, vcpus: Int, version: String, group: String): [Package]
  package(uuid: ID!): Package
  instances(name: String!, machineId: ID, status: InstanceStatus, serviceUuid: ID, serviceSlug: String, deploymentGroupUuid: ID, deploymentGroupSlug: String): [Instance]
  instance(uuid: ID!): Instance
  datacenter(uuid: ID, region: String): Datacenter
}

type Mutation {
  createDeploymentGroup(name: String!) : DeploymentGroup
  updateDeploymentGroup(uuid: ID!, name: String!) : DeploymentGroup

  provisionManifest(deploymentGroupUuid: ID!, type: ManifestType!, format: ManifestFormat!, raw: String!) : Version
  scale(service: ID!, replicas: Int!) : Version

  stopServices(uuids: [ID]!) : [Service]
  startServices(uuids: [ID]!) : [Service]
  restartServices(uuids: [ID]!) : [Service]
  deleteServices(uuids: [ID]!) : [Service]

  stopInstances(uuids: [ID]!) : [Instance]
  startInstances(uuids: [ID]!) : [Instance]
  restartInstances(uuids: [ID]!) : [Instance]

  # reprovision() ???
}

`;

export default makeExecutableSchema({
  typeDefs: schema,
  resolvers,
});
