const forceArray = require('force-array');
const get = require('lodash.get');
const date = require('date.js');
const timestamp = require('internet-timestamp');
const got = require('got');
const url = require('url');
const qs = require('qs');

const transform = (res) => {
  return forceArray(res).reduce((sum, r) => {
    const {
      data
    } = JSON.parse(r.body);

    const result = !Array.isArray(data)
      ? data.result
      : data;

    return result.reduce((sum, inst) => {
      const metric = !inst.job
        ? inst.metric
        : inst;

      const {
        values = [],
        value = []
      } = inst;

      const {
        instance,
        job,
        __name__
      } = metric;

      const oldJob = get(sum, job, {});
      const oldQuery = get(sum, `${job}.${__name__}`, {});
      const _value = values.length ? values : value

      return Object.assign(sum, {
        [job]: Object.assign(oldJob, {
          [instance]: Object.assign(oldQuery, {
            [__name__]: _value
          })
        })
      })
    }, sum);
  }, {});
};

const range = module.exports.range = ({
  query = [],
  ago = '1h ago',
  step = '1s',
  hostname = 'localhost'
}) => {
  const end = timestamp(new Date());
  const start = timestamp(date(ago));

  return Promise.all(query.map((query) => {
    return got(url.format({
      protocol: 'http:',
      slashes: true,
      port: '9090',
      hostname: hostname,
      pathname: '/api/v1/query_range',
      query: {
        query,
        end,
        step,
        start
      }
    }));
  }))
  .then(transform);
};

const query = module.exports.query = ({
  hostname = 'localhost',
  query = []
}) => {
  return Promise.all(query.map((query) => {
    return got(url.format({
      protocol: 'http:',
      slashes: true,
      port: '9090',
      hostname: hostname,
      pathname: '/api/v1/query',
      query: {
        query: query
      }
    }));
  }))
  .then(transform);
};

const tree = module.exports.tree = ({
  hostname = 'localhost',
  query = []
}) => {
  return got(url.format({
    protocol: 'http:',
    slashes: true,
    port: '9090',
    hostname: hostname,
    pathname: '/api/v1/series',
    search: qs.stringify({
      match: query
    }, {
      arrayFormat: 'brackets'
    })
  }))
  .then(transform);
};

if (!module.parent) {
  process.on('unhandledRejection', (reason) => {
    throw reason
  });

  const usage = () => {
    console.error(`
      Usage: node metrics.js --type={type} --query={metric} --step={step} --ago={ago}
             node metrics.js --type=range --query=node_memory_heap_used_bytes --query=node_memory_heap_total_bytes
    `.trim());

    return process.exit(1);
  }

  const argv = require('minimist')(process.argv.slice(2));

  if (!argv.query || !argv.type) {
    return usage();
  }

  const handlers = {
    tree,
    range,
    query
  };

  if (!handlers[argv.type]) {
    return usage();
  }

  const conf = {
    query: argv.query,
    ago: argv.ago,
    step: argv.step,
    hostname: argv.hostname
  };

  handlers[argv.type](conf).then((res) => {
    console.log(JSON.stringify(res, null, 2));
  });
}
