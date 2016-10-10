# triton-graphql

Proof-of-Concept of the Triton API running on GraphQL.

### install dependencies

```bash
$ npm install
```

### setup credentials

Edit `credentials.json`

```json5
{
  "url": "https://us-sw-1.api.joyentcloud.com",
  "keyId": "", //public key fingerprint ex: 35:jh:42:56...
  "account": "", // account ex: raoulmillais
  "user": "" // sub-account ex: ramitos
}
```

## api

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
