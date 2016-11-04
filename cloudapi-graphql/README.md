[![Docker Repository on Quay](https://quay.io/repository/yldio/joyent-dashboard-cloudapi-graphql/status?token=bddd694a-a913-4b66-b7bc-fb71992672c4 "Docker Repository on Quay")](https://quay.io/repository/yldio/joyent-dashboard-cloudapi-graphql)
# cloudapi-graphql

Proof-of-Concept of the [Joyent Cloud API](https://apidocs.joyent.com/cloudapi/) running on GraphQL.

## Setup

### Setup Credentials

Create `credentials.json`, TODO, use environment variables.

```json5
{
  "url": "https://us-sw-1.api.joyentcloud.com",
  "keyId": "", //public key fingerprint ex: 35:jh:42:56...
  "account": "", // account ex: raoulmillais
  "user": "" // sub-account ex: ramitos
}
```

### Install Dependencies and run

```bash
yarn install
yarn start
```

### Visit GraphiQL

Go-to http://0.0.0.0:3000/graphql to use the REPL with interactive documentation.

![GraphiQL](https://cloud.githubusercontent.com/assets/524382/19242455/1e371978-8f0b-11e6-9563-d6f5b93fa63c.png)

## API

  - [x] Account
    - [x] GetAccount
    - [x] UpdateAccount
  - [x] Keys
    - [x] ListKeys
    - [x] GetKey
    - [x] CreateKey
    - [x] DeleteKey
  - [x] Users
    - [x] ListUsers
    - [x] GetUser
    - [x] CreateUser
    - [x] UpdateUser
    - [ ] ChangeUserPassword
    - [x] DeleteUser
  - [x] Roles
    - [x] ListRoles
    - [x] GetRole
    - [x] CreateRole
    - [x] UpdateRole
    - [x] DeleteRole
  - [x] Role Tags
    - [x] SetRoleTags
  - [x] Policies
    - [x] ListPolicies
    - [x] GetPolicy
    - [x] CreatePolicy
    - [x] UpdatePolicy
    - [x] DeletePolicy
  - [x] User SSH Keys
    - [x] ListUserKeys
    - [x] GetUserKey
    - [x] CreateUserKey
    - [x] DeleteUserKey
  - [ ] Config
    - [ ] GetConfig
    - [ ] UpdateConfig
  - [x] Datacenters
    - [x] ListDatacenters
    - [x] GetDatacenter
  - [x] Services
    - [x] ListServices
  - [x] Images
    - [x] ListImages
    - [x] GetImage
    - [x] DeleteImage
    - [x] ExportImage
    - [x] CreateImageFromMachine
    - [ ] UpdateImage
  - [x] Packages
    - [x] ListPackages
    - [x] GetPackage
  - [x] Instances
    - [x] ListMachines
    - [x] GetMachine
    - [x] CreateMachine
    - [x] StopMachine
    - [x] StartMachine
    - [x] RebootMachine
    - [ ] ResizeMachine
    - [ ] RenameMachine
    - [x] EnableMachineFirewall
    - [x] DisableMachineFirewall
    - [x] CreateMachineSnapshot
    - [x] StartMachineFromSnapshot
    - [x] ListMachineSnapshots
    - [x] GetMachineSnapshot
    - [x] DeleteMachineSnapshot
    - [ ] UpdateMachineMetadata
    - [ ] ListMachineMetadata
    - [ ] GetMachineMetadata
    - [ ] DeleteMachineMetadata
    - [ ] DeleteAllMachineMetadata
    - [x] AddMachineTags
    - [x] ReplaceMachineTags
    - [ ] ListMachineTags
    - [x] GetMachineTag
    - [x] DeleteMachineTag
    - [x] DeleteMachineTags
    - [x] DeleteMachine
    - [x] MachineAudit
  - [ ] Analytics
    - [ ] DescribeAnalytics
    - [ ] ListInstrumentations
    - [ ] GetInstrumentation
    - [ ] GetInstrumentationValue
    - [ ] GetInstrumentationHeatmap
    - [ ] GetInstrumentationHeatmapDetails
    - [ ] CreateInstrumentation
    - [ ] DeleteInstrumentation
  - [x] FirewallRules
    - [x] Firewall Rule Syntax
    - [x] ListFirewallRules
    - [x] GetFirewallRule
    - [x] CreateFirewallRule
    - [x] UpdateFirewallRule
    - [x] EnableFirewallRule
    - [x] DisableFirewallRule
    - [x] DeleteFirewallRule
    - [x] ListMachineFirewallRules
    - [x] ListFirewallRuleMachines
  - [ ] Fabrics
    - [ ] ListFabricVLANs
    - [ ] CreateFabricVLAN
    - [ ] GetFabricVLAN
    - [ ] UpdateFabricVLAN
    - [ ] DeleteFabricVLAN
    - [ ] ListFabricNetworks
    - [ ] CreateFabricNetwork
    - [ ] GetFabricNetwork
    - [ ] DeleteFabricNetwork
  - [x] Networks
    - [x] ListNetworks
    - [x] GetNetwork
  - [ ] Nics
    - [ ] ListNics
    - [ ] GetNic
    - [ ] AddNic
    - [ ] RemoveNic
