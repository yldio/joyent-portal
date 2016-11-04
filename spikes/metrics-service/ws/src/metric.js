const Emitter = require('component-emitter');

const cdm = {};

module.exports = (server) => ({
  on: (id) => {
    if (cdm[id]) {
      cdm[id].sockets +=1;
      return;
    }


    let messageId = 0;
    const interval = setInterval(() => {
      server.publish(`/stats/${id}`, {
        id: messageId += 1
      });
    }, 500);

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
