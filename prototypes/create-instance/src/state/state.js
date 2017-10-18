import packages from '../data/packages';

const state = {
  filters: {
    cpu: { min: 0.25, max: 8 },
    cost: { min: 0.016, max: 2.318 },
    ram: { min: 0.256, max: 63.8 },
    disk: { min: 0.01, max: 4.9 },
    diskType: {
      magnetic: true,
      ssd: true
    },
    groups: [
      { name: 'Compute Optimized', selected: false },
      { name: 'Memory Optimized', selected: false },
      { name: 'General Purpose', selected: false },
      { name: 'Storage Optimized', selected: false }
    ]
  },
  packages
};

export default state;
