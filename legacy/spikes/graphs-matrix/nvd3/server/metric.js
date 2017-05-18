const Emitter = require('component-emitter');

const cdm = {};

module.exports = (server) => ({
  on: (id) => {
    console.log('on', cdm[id]);
    if (cdm[id] && (cdm[id].sockets > 0)) {
      cdm[id].sockets +=1;
      return;
    }


    let messageId = 0;
    const interval = setInterval(() => {
      console.log(`publishing /stats/${id}`);

      server.publish(`/stats/${id}`, {
        when: new Date().getTime(),
        cpu: Math.random() * 100
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
