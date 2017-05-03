/*eslint-disable */

import { complexServices } from './services-complex';
import { wpServices } from './services-wp';

export const services = {
  "ui": {
    "collapsed": [],
    "sections": [
      "summary",
      "instances",
      "metrics",
      "networks",
      "tags-metadata",
      "activity-feed",
      "service-manifest",
      "firewall"
    ],
    "tooltip": {
      "show": false
    }
  },
  "data": wpServices.concat(complexServices)
}
