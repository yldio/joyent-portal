/*eslint-disable */
export const orgs = {
  "ui": {
    "invite_toggled": false,
    "member_status_tooltip": false,
    "member_role_tooltip": false,
    "sections": [
      "projects",
      "people",
      "settings"
    ],
    "personal-sections": [
      "projects",
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
    "id": "nicola",
    "name": "Your dashboard",
    "image": "https://pbs.twimg.com/profile_images/641289584580493312/VBfsPlff_400x400.jpg",
    "members": [],
    "type": "personal"
  }, {
    "owner": "b94033c1-3665-4c36-afab-d9c3d0b51c01",
    "uuid": "e12ad7db-91b2-4154-83dd-40dcfc700dcc",
    "id": "biz-tech",
    "name": "BizTech",
    "members": [
      {
        "uuid": "fd853d8f-e1dd-49b5-b7b3-ae9adfea1e2f",
        "role": "Owner",
        "status": "Active"
      },
      {
        "uuid": "6deddbaa-3b94-4373-8cf7-97129507a872",
        "role": "Unassigned",
        "status": "Sent invitation"
      }
    ]
  }, {
    "owner": "b94033c1-3665-4c36-afab-d9c3d0b51c01",
    "uuid": "551f316d-e414-480f-9787-b4c408db3edd",
    "id": "make-us-proud",
    "name": "Make Us Proud",
    "image": "/static/images/make-us-proud.svg",
    "members": []
  }]
}
