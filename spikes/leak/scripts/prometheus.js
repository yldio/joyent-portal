const map = require('apr-map');
const forceArray = require('force-array');
const get = require('lodash.get');
const date = require('date.js');
const timestamp = require('internet-timestamp');
const got = require('got');
const url = require('url');
const qs = require('qs');

const transform = (res) => {
  return forceArray(res).reduce((sum, { data }) => {
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
      const oldInstance = get(sum, `${job}.${instance}`, {});
      const _value = values.length ? values : value

      return Object.assign(sum, {
        [job]: Object.assign(oldJob, {
          [instance]: Object.assign(oldInstance, {
            [__name__]: _value
          })
        })
      })
    }, sum);
  }, {});
};

const range = module.exports.range = async ({
  query = [],
  ago = '1h ago',
  step = '15s',
  hostname = 'localhost'
}) => {
  const end = timestamp(new Date());
  const start = timestamp(date(ago));

  const ranges = await map(query, async (query) => {
    return await got(url.format({
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
    }))
  });

  return transform(
    ranges.map((range) => JSON.parse(range.body))
  );
};

const query = module.exports.query = async ({
  hostname = 'localhost',
  query = []
}) => {
  const res = await map(query, async (query) => {
    return await got(url.format({
      protocol: 'http:',
      slashes: true,
      port: '9090',
      hostname: hostname,
      pathname: '/api/v1/query',
      query: {
        query: query
      }
    }))
  });

  return transform(
    res.map((res) => JSON.parse(res.body))
  );
};

const tree = module.exports.tree = async ({
  hostname = 'localhost',
  query = []
}) => {
  const res = await got(url.format({
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
  }));

  return transform(res);
};

if (!module.parent) {
  process.on('unhandledRejection', (reason) => {
    throw reason
  });

  const usage = () => {
    console.error(`
      Usage: node metrics.js --type={type} --query={metric} --step={step} --ago={ago}
             node scripts/prometheus.js --type=range --query=node_memory_heap_used_bytes --query=node_memory_heap_total_bytes
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
