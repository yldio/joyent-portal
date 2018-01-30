import paramCase from 'param-case';

const dataSlugFromObjects = (arr = []) =>
  arr.map(({ name, ...obj }) => ({
    ...obj,
    name,
    slug: paramCase(name)
  }));

export default {
  resolvers: {
    Mutation: {
      updateHeader: (_, { isOpen, activePanel }, { cache }) => {
        cache.writeData({ data: { isOpen, activePanel } });
      }
    }
  },
  defaults: {
    isOpen: false,
    activePanel: '',
    regions: dataSlugFromObjects([
      {
        name: 'Americas',
        __typename: 'Region'
      },
      {
        name: 'Europe',
        __typename: 'Region'
      },
      {
        name: 'Asia',
        __typename: 'Region'
      }
    ]),
    places: dataSlugFromObjects([
      {
        name: 'Ashburn, Virginia, USA',
        region: 'americas',
        __typename: 'Place'
      },
      {
        name: 'Las Vegas, Nevada, USA',
        region: 'americas',
        __typename: 'Place'
      },
      {
        name: 'Emeryville, California, USA',
        region: 'americas',
        __typename: 'Place'
      },
      {
        name: 'Amsterdam, Netherlands',
        region: 'europe',
        __typename: 'Place'
      },
      {
        name: 'Singapore',
        region: 'asia',
        __typename: 'Place'
      },
      {
        name: 'Seoul, South Korea',
        region: 'asia',
        __typename: 'Place'
      }
    ]),
    datacenters: dataSlugFromObjects([
      {
        name: 'us-east-1',
        place: 'ashburn-virginia-usa',
        __typename: 'Datacenter'
      },
      {
        name: 'us-east-2',
        place: 'ashburn-virginia-usa',
        __typename: 'Datacenter'
      },
      {
        name: 'us-east-3',
        place: 'ashburn-virginia-usa',
        __typename: 'Datacenter'
      },
      {
        name: 'us-west-1',
        place: 'emeryville-california-usa',
        __typename: 'Datacenter'
      },
      {
        name: 'us-sw-1',
        place: 'las-vegas-nevada-usa',
        __typename: 'Datacenter'
      },
      {
        name: 'eu-ams-1',
        place: 'amsterdam-netherlands',
        __typename: 'Datacenter'
      }
    ]),
    categories: dataSlugFromObjects([
      {
        name: 'Compute',
        __typename: 'Category'
      },
      {
        name: 'Network',
        __typename: 'Category'
      },
      {
        name: 'Storage',
        __typename: 'Category'
      },
      {
        name: 'Access',
        __typename: 'Category'
      },
      {
        name: 'Help & Support',
        __typename: 'Category'
      }
    ])
  }
};
