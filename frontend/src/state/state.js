const state = {
  ui: {
    sections: {
      deploymentGroups: [{
        pathname: "feed",
        name: "Feed"
      }, {
        pathname: "services",
        name: "Services"
      }, {
        pathname: "instances",
        name: "Instances"
      }, {
        pathname: "rollback",
        name: "Rollback"
      }, {
        pathname: "manifest",
        name: "Manifest"
      }, {
        pathname: "settings",
        name: "Settings"
      }],
      services: [{
        pathname: "summary",
        name: "Summary"
      }, {
        pathname: "instances",
        name: "Insatnces"
      }, {
        pathname: "metrics",
        name: "Metrics"
      }, {
        pathname: "networks",
        name: "Networks"
      }, {
        pathname: "tags-metadata",
        name: "Tags / metadata"
      }, {
        pathname: "activity-feed",
        name: "Activity feed"
      }, {
        pathname: "manifest",
        name: "Manifest"
      }, {
        pathname: "firewall",
        name: "Firewall"
      }]
    }
  }
}

export default state;
