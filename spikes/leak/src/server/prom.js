const os = require('os');
const process = require('process');
// const pidusage = require('pidusage');

const metric = ({ name, desc, type, value }) => `
# HELP ${name} ${desc}
# TYPE ${name} ${type || 'gauge'}
${name} ${value}
`;

const metrics = {
  process_mem_used_perc: () => {
    const free = os.freemem();
    const total = os.totalmem();
    const perc = ((total - free) * 100) / total;

    //
    // console.log({
    //   available: os.totalmem(),
    //   free: os.freemem(),
    //   heapTotal,
    //   prom: {
    //     name: 'proc_mem_used_perc',
    //     desc: 'Process memory used in percentage.',
    //     value: (heapTotal * 100) / available
    //   }
    // });
    //
    // pidusage.stat(process.pid, function(err, stat) {
    //   console.log(stat);
    // });

    return metric({
      name: 'proc_mem_used_perc',
      desc: 'Process memory used in percentage.',
      value: perc
    });
  }
}

module.exports = () => Object.keys(metrics)
  .map((name) => metrics[name]())
  .join('\n');
