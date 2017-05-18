const async = require('async');
const disk = require('diskusage');
const os = require('os');

const cdm = {};

const osutils = require('os-utils');
const statistics = require('simple-statistics');

const getCPU = (fn) => {
  return fn(null, {
    user: os.cpus().reduce((sum, cpu) => sum + cpu.times.user, 0),
    sys: os.cpus().reduce((sum, cpu) => sum + cpu.times.sys, 0)
  });
};

const getPerc = (fn) => {
  async.timesSeries(5, (n, next) => {
    osutils.cpuUsage((p) => {
      const percentage = p * 100;
      next(null, percentage);
    });
  }, (err, sample) => {
    fn(err, {
      perc: {
        firstQuartile: statistics.quantile(sample, 0.25),
        median: statistics.median(sample),
        thirdQuartile: statistics.quantile(sample, 0.75),
        max: statistics.max(sample),
        min: statistics.min(sample),
        stddev: statistics.sampleStandardDeviation(sample)
      }
    });
  });
};

const getMem = (fn) => {
  async.timesSeries(10, (n, next) => {
    const free = os.freemem();
    const total = os.totalmem();
    const using = total - free;
    const perc = (using / total) * 100;
    setTimeout(() => {
      next(null, perc);
    }, 500);
  }, (err, sample) => {
    fn(err, {
      perc: {
        firstQuartile: statistics.quantile(sample, 0.25),
        median: statistics.median(sample),
        thirdQuartile: statistics.quantile(sample, 0.75),
        max: statistics.max(sample),
        min: statistics.min(sample),
        stddev: statistics.sampleStandardDeviation(sample)
      }
    });
  });
};

const getDisk = (fn) => {
  async.timesSeries(5, (n, next) => {
    disk.check('/', (err, data) => {
      setTimeout(() => {
        const perc = (data.available / data.total) * 100;
        next(err, perc);
      }, 2000);
    });
  }, (err, sample) => {
    fn(err, {
      perc: {
        firstQuartile: statistics.quantile(sample, 0.25),
        median: statistics.median(sample),
        thirdQuartile: statistics.quantile(sample, 0.75),
        max: statistics.max(sample),
        min: statistics.min(sample),
        stddev: statistics.sampleStandardDeviation(sample)
      }
    });
  });
};

const getStats = (fn) => {
  async.parallel({
    cpu: getPerc,
    mem: getMem,
    disk: getDisk
  }, fn);
};

module.exports = (server) => ({
  on: (id) => {
    console.log('on', cdm[id]);
    if (cdm[id] && (cdm[id].sockets > 0)) {
      cdm[id].sockets += 1;
      return;
    }

    let messageId = 0;
    const interval = setInterval(() => {
      console.log(`publishing /stats/${id}`);

      getStats((err, stats) => {
        server.publish(`/stats/${id}`, {
          when: new Date().getTime(),
          stats
        });
      });
    }, 1000);

    cdm[id] = {
      interval,
      sockets: 1
    };
  },
  off: (id) => {
    if (!(cdm[id].sockets -= 1)) {
      clearInterval(cdm[id].interval);
    }
  }
});
