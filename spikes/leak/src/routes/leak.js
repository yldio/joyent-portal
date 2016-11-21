const prettyHrtime = require('pretty-hrtime');
const clone = require('clone');

// leak example from https://auth0.com/blog/four-types-of-leaks-in-your-javascript-code-and-how-to-get-rid-of-them/
let theLeak = null;
const anotherLeak = [];

const fibonacci = (num) => {
  if (num <= 1) return 1;

  return fibonacci(num - 1) + fibonacci(num - 2);
};

module.exports = (server) => {
  server.route({
    method: 'GET',
    path: '/mem',
    config: {
      handler: (req, reply) => {
        const start = process.hrtime();

        const originalLeak = theLeak;

        const unused = () => {
          // referencig something that is going to be replaced
          if (originalLeak) {
            console.log("hi");
          }
        };

        theLeak = {
          longStr: new Array(1000000).join('*')
        };

        anotherLeak.push(anotherLeak.length);

        const end = process.hrtime(start);
        reply(prettyHrtime(end));
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/cpu',
    config: {
      handler: (req, reply) => {
        const start = process.hrtime();

        fibonacci(40);

        const end = process.hrtime(start);
        reply(prettyHrtime(end));
      }
    }
  });
};