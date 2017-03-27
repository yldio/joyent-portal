/*eslint-disable */

import {
  account,
  datacenters,
  metrics,
  projects,
  instances,
  services,
  members
} from './shared/index.js';

export default {
  "account": account,
  "datacenters": datacenters,
  "monitors": {
    "ui": {
      "page": "create"
    }
  },
  "metrics": metrics,
  "orgs": {
    "ui": {
      "invite_toggled": false,
      "member_status_tooltip": false,
      "member_role_tooltip": false,
      "hide_add_and_manage": true,
      "sections": [
        "projects",
        "people",
        "settings"
      ],
      "members_status": [
        "Active",
        "Inactive",
        "Invitation Sent"
      ],
      "members_roles": [
        "Owner",
        "Unassigned",
        "Read Only"
      ]
    },
    "data": [{
      "hide": [
        "people"
      ],
      "owner": "b94033c1-3665-4c36-afab-d9c3d0b51c01",
      "uuid": "e12ad7db-91b2-4154-83dd-40dcfc700dcc",
      "id": "nicola",
      "name": "Personal",
      "image": "https://pbs.twimg.com/profile_images/641289584580493312/VBfsPlff_400x400.jpg",
      "members": []
    }]
  },
  "projects": projects,
  "members": members,
  "services": services,
  "instances": instances
}
