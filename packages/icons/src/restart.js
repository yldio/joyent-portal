import React from 'react';

export default props => (
  <svg
    width="16"
    height="19"
    viewBox="0 0 16 19"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      {...props}
      style={{
        transform: 'rotate(30deg) translateX(1px) translateY(-1px)',
        transformOrigin: '50%'
      }}
      fill-rule="evenodd"
      transform
      d="M 6.67853 4.42272L 6.67879 6.61018L 12.4032 3.30519L 6.67874 0L 6.67829 2.4743C 2.88206 3.15051 -0.000481996 6.46786 6.04528e-08 10.4594C -1.2363e-05 14.9384 3.63041 18.5685 8.10965 18.5692C 12.588 18.5682 16.2192 14.9381 16.2192 10.4592L 14.3115 10.46C 14.3108 13.8839 11.535 16.6615 8.10976 16.6612C 4.68462 16.6608 1.90795 13.8842 1.90764 10.4586C 1.90797 7.52657 3.94309 5.06834 6.67853 4.42272Z"
    />
  </svg>
);
