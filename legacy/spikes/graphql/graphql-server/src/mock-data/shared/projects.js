/*eslint-disable */
export const projects = {
  "ui": {
    "invite_toggled": false,
    "member_status_tooltip": false,
    "member_role_tooltip": false,
    "sections": [
      "project-feed",
      "services",
      "instances",
      "rollback",
      "manifest",
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
    "uuid": "e0ea0c02-55cc-45fe-8064-3e5176a59401",
    "org": "e12ad7db-91b2-4154-83dd-40dcfc700dcc",
    "id": "forest-foundation-dev",
    "name": "WarpRecords Blog",
    "plan": "20.05$ per day",
    "members": [{
      "uuid": "fd853d8f-e1dd-49b5-b7b3-ae9adfea1e2f",
      "role": "Owner",
      "status": "Active"
    },
      {
        "uuid": "6deddbaa-3b94-4373-8cf7-97129507a872",
        "role": "Unassigned",
        "status": "Sent invitation"
      }]
  }, {
    "uuid": "9fcb374d-a267-4c2a-9d9c-ba469b804639",
    "org": "e12ad7db-91b2-4154-83dd-40dcfc700dcc",
    "id": "forest-foundation-testing",
    "name": "Forest Foundation Testing",
    "plan": "20.05$ per day",
    "members": []
  }, {
    "uuid": "ac2c2498-e865-4ee3-9e26-8c75a81cbe25",
    "org": "e12ad7db-91b2-4154-83dd-40dcfc700dcc",
    "id": "forest-foundation-production",
    "name": "Forest Foundation Production",
    "plan": "100.17$ per day",
    "members": []
  }]
}