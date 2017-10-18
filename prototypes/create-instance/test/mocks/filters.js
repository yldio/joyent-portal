export default {
  cpu: {
    min: 0.25,
    max: 3.25
  },
  cost: {
    min: 0.016,
    max: 0.525
  },
  ram: {
    min: 0.256,
    max: 50.688
  },
  disk: {
    min: 0.01,
    max: 107.26
  },
  groups: [
    { name: 'Compute Optimized', selected: false },
    { name: 'Memory Optimized', selected: false },
    { name: 'General Purpose', selected: false },
    { name: 'Storage Optimized', selected: false }
  ]
};
