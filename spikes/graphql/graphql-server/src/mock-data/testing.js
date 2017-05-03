/*eslint-disable */

import {
  account,
  datacenters,
  metrics,
  projects,
  instances,
  services,
  members,
  orgs
} from './shared/index.js';

export default {
  "monitors": {
    "ui": {
      "page": "create"
    }
  },
  "orgs": {
    "ui": orgs.ui,
    "data": [{
      "hide": [
        "people"
      ],
      "owner": "b94033c1-3665-4c36-afab-d9c3d0b51c01",
      "uuid": "e12ad7db-91b2-4154-83dd-40dcfc700dcc",
      "id": "nicola",
      "name": "Personal",
      "image": "https://pbs.twimg.com/profile_images/641289584580493312/VBfsPlff_400x400.jpg",
      "members": [],
      "type": "personal"
    }]
  },
  account,
  datacenters,
  metrics,
  projects,
  members,
  services,
  instances
}
