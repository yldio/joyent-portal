process.on('unhandledRejection', (reason) => {
  throw reason
});

const argv = require('minimist')(process.argv.slice(2));
const get = require('lodash.get');
const date = require('date.js');
const timestamp = require('internet-timestamp');
const got = require('got');
const url = require('url');

const conf = {
  query: argv.query,
  ago: argv.ago || '1h',
  step: argv.step || '1s',
  hostname: argv.hostname || 'localhost',
};

if (!conf.query) {
  console.error(`
Usage: node metrics.js --query={metric} --step={step} --ago={ago}
       node metrics.js --query=node_memory_heap_used_bytes --query=node_memory_heap_total_bytes
  `.trim());

  process.exit(1);
}

// query=node_memory_heap_used_bytes&end=147989905368&step=15s
const end = timestamp(new Date());
const start = timestamp(date(`${conf.ago} ago`));

Promise.all(conf.query.map((query) => {
  return got(url.format({
    protocol: 'http:',
    slashes: true,
    port: '9090',
    hostname: conf.hostname,
    pathname: '/api/v1/query_range',
    query: {
      query: query,
      end: end,
      step: conf.step,
      start: start
    }
  }));
})).then((res) => {
  return res.reduce((sum, r) => {
    const {
      data: {
        result
      }
    } = JSON.parse(r.body);

    return result.reduce((sum, inst) => {
      const {
        values,
        metric: {
          instance,
          job,
          __name__
        }
      } = inst;

      const oldJob = get(sum, job, {});
      const oldQuery = get(sum, `${job}.${__name__}`, {});

      return Object.assign(sum, {
        [job]: Object.assign(oldJob, {
          [__name__]: Object.assign(oldQuery, {
            [instance]: values
          })
        })
      })
    }, sum);
  }, {});
}).then((res) => {
  console.log(JSON.stringify(res, null, 2));
});
