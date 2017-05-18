const relativeDate = require('relative-date');
const statistics = require('simple-statistics');
const prometheus = require('../../scripts/prometheus');
const async = require('async');

const cdm = {};

const calc = (sample) => {
  return {
    firstQuartile: statistics.quantile(sample, 0.25),
    median: statistics.median(sample),
    thirdQuartile: statistics.quantile(sample, 0.75),
    max: statistics.max(sample),
    min: statistics.min(sample),
    stddev: statistics.sampleStandardDeviation(sample)
  };
};

const getMem = ({
  job
}, fn) => {
  prometheus.query({
    query: [`node_memory_heap_used_bytes{job="${job}"}`]
  }).then((res) => {
    if (!res || !res[job]) {
      return null
    }

    const aggregate = calc(Object.keys(res[job]).map((inst) => {
      return Number(res[job][inst].node_memory_heap_used_bytes[1]);
    }));

    const instances = Object.keys(res[job]).reduce((sum, inst) => {
      return Object.assign(sum, {
        [inst]: calc([Number(res[job][inst].node_memory_heap_used_bytes[1])])
      })
    }, {});

    return {
      raw: res[job],
      aggregate,
      instances
    };
  }).then((res) => {
    return fn(null, res);
  }).catch((err) => {
    return fn(err);
  });
};

const getStats = (ctx, fn) => {
  async.parallel({
    mem: async.apply(getMem, ctx)
  }, fn);
};

module.exports = (server) => ({
  on: (job) => {
    console.log('on', job);

    if (cdm[job] && (cdm[job].sockets > 0)) {
      cdm[job].sockets += 1;
      return;
    }

    let messageId = 0;

    const update = () => {
      console.log(`publishing /stats/${job}/${messageId += 1}`);

      getStats({
        job: job
      }, (err, stats) => {
        if (err) {
          return console.error(err);
        }

        server.publish(`/stats/${job}`, {
          when: new Date().getTime(),
          stats
        });
      });
    };

    cdm[job] = {
      interval: setInterval(update, 1000),
      sockets: 1
    };
  },
  off: (job) => {
    console.log('off', job);

    if (!(cdm[job].sockets -= 1)) {
      clearInterval(cdm[job].interval);
    }
  }
});

module.exports.tree = (ctx) => {
  return prometheus.tree({
    query: ['node_memory_heap_used_bytes']
  });
};
