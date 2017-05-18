const prettyHrtime = require('pretty-hrtime');

// leak example from https://auth0.com/blog/four-types-of-leaks-in-your-javascript-code-and-how-to-get-rid-of-them/
let theLeak = null;
let anotherLeak = [];

const fibonacci = (num) => {
  if (num <= 1) return 1;

  return fibonacci(num - 1) + fibonacci(num - 2);
};

module.exports = (server) => {
  server.route({
    method: 'GET',
    path: '/mem-slow',
    config: {
      handler: (req, reply) => {
        console.log('got /mem-slow request');
        const start = process.hrtime();
        const length = (anotherLeak.length || 1);

        anotherLeak.push({
          longStr: Array.from({
            length: length * 50
          }, (v, i) => i)
        });

        console.log('mem-slow prev length', length);
        console.log('mem-slow new length', anotherLeak[length - 1].longStr.length);

        const end = process.hrtime(start);
        reply(prettyHrtime(end));
        console.log('sent /mem-slow response');
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/mem-fast',
    config: {
      handler: (req, reply) => {
        console.log('got /mem-fast request');

        const start = process.hrtime();

        const length = (((theLeak || {}).longStr || '').length || 1);

        theLeak = {
          longStr: Array.from({
            length: length + 500
          }, (v, i) => i)
        };

        console.log('mem-fast %d', theLeak.longStr.length);

        const end = process.hrtime(start);
        reply(prettyHrtime(end));
        console.log('sent /mem-fast response');
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/cpu',
    config: {
      handler: (req, reply) => {
        console.log('got /cpu request');

        const start = process.hrtime();

        fibonacci(40);

        const end = process.hrtime(start);
        reply(prettyHrtime(end));

        console.log('sent /cpu response');
      }
    }
  });
};