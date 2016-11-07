# Sigma.js

This is an interesting library to be visulising large networks, however lacks an easy way to modify nodes, instead it is needed to re-write the renderer for the nodes to enable this, and the same would have to be done for (svg, canvas and webgl).

Sigma.js also has the problems that each individual node needs to have a specific value defined for an z and y coordinate, their are plugins that do implement a force graph layout, but due to the nature of the architecture of sigma.js it seems much more complicated to get a layout which makes the most amount of sense.

Therefore, for small networks, with rich information for each node, sigma.js is not currently the best choice, however if a need to visulise a whole network spanning multiple regions, projects and services, it could be a worthy avenenue to persue.

![screenshot from 2016-11-07 13-31-09](https://cloud.githubusercontent.com/assets/524382/20059506/7d57579e-a4ee-11e6-8f24-f0be0067f797.png)
