(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();









var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};





var newArrowCheck = function (innerThis, boundThis) {
  if (innerThis !== boundThis) {
    throw new TypeError("Cannot instantiate an arrow function");
  }
};





var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var cov_1eyosjm197 = function () {
  var path = '/Users/ramitos/dev/yld/joyent-portal/spikes/docker-compose-client/src/index.js',
      hash = '384e02ed4692c70a8c8d9e69b30064cdb319bdf4',
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/Users/ramitos/dev/yld/joyent-portal/spikes/docker-compose-client/src/index.js',
    statementMap: {
      '0': {
        start: {
          line: 1,
          column: 19
        },
        end: {
          line: 1,
          column: 37
        }
      },
      '1': {
        start: {
          line: 2,
          column: 25
        },
        end: {
          line: 2,
          column: 42
        }
      },
      '2': {
        start: {
          line: 3,
          column: 17
        },
        end: {
          line: 3,
          column: 40
        }
      },
      '3': {
        start: {
          line: 7,
          column: 4
        },
        end: {
          line: 7,
          column: 12
        }
      },
      '4': {
        start: {
          line: 9,
          column: 4
        },
        end: {
          line: 9,
          column: 31
        }
      },
      '5': {
        start: {
          line: 10,
          column: 4
        },
        end: {
          line: 10,
          column: 34
        }
      },
      '6': {
        start: {
          line: 11,
          column: 4
        },
        end: {
          line: 11,
          column: 60
        }
      },
      '7': {
        start: {
          line: 11,
          column: 35
        },
        end: {
          line: 11,
          column: 58
        }
      },
      '8': {
        start: {
          line: 13,
          column: 4
        },
        end: {
          line: 13,
          column: 53
        }
      },
      '9': {
        start: {
          line: 18,
          column: 4
        },
        end: {
          line: 18,
          column: 45
        }
      },
      '10': {
        start: {
          line: 22,
          column: 4
        },
        end: {
          line: 22,
          column: 31
        }
      },
      '11': {
        start: {
          line: 27,
          column: 4
        },
        end: {
          line: 27,
          column: 71
        }
      },
      '12': {
        start: {
          line: 31,
          column: 4
        },
        end: {
          line: 42,
          column: 6
        }
      },
      '13': {
        start: {
          line: 36,
          column: 53
        },
        end: {
          line: 39,
          column: 9
        }
      },
      '14': {
        start: {
          line: 46,
          column: 0
        },
        end: {
          line: 46,
          column: 37
        }
      }
    },
    fnMap: {
      '0': {
        name: '(anonymous_0)',
        decl: {
          start: {
            line: 6,
            column: 2
          },
          end: {
            line: 6,
            column: 3
          }
        },
        loc: {
          start: {
            line: 6,
            column: 47
          },
          end: {
            line: 14,
            column: 3
          }
        },
        line: 6
      },
      '1': {
        name: '(anonymous_1)',
        decl: {
          start: {
            line: 11,
            column: 28
          },
          end: {
            line: 11,
            column: 29
          }
        },
        loc: {
          start: {
            line: 11,
            column: 35
          },
          end: {
            line: 11,
            column: 58
          }
        },
        line: 11
      },
      '2': {
        name: '(anonymous_2)',
        decl: {
          start: {
            line: 17,
            column: 2
          },
          end: {
            line: 17,
            column: 3
          }
        },
        loc: {
          start: {
            line: 17,
            column: 25
          },
          end: {
            line: 19,
            column: 3
          }
        },
        line: 17
      },
      '3': {
        name: '(anonymous_3)',
        decl: {
          start: {
            line: 21,
            column: 2
          },
          end: {
            line: 21,
            column: 3
          }
        },
        loc: {
          start: {
            line: 21,
            column: 10
          },
          end: {
            line: 23,
            column: 3
          }
        },
        line: 21
      },
      '4': {
        name: '(anonymous_4)',
        decl: {
          start: {
            line: 25,
            column: 2
          },
          end: {
            line: 25,
            column: 3
          }
        },
        loc: {
          start: {
            line: 25,
            column: 39
          },
          end: {
            line: 28,
            column: 3
          }
        },
        line: 25
      },
      '5': {
        name: '(anonymous_5)',
        decl: {
          start: {
            line: 30,
            column: 2
          },
          end: {
            line: 30,
            column: 3
          }
        },
        loc: {
          start: {
            line: 30,
            column: 45
          },
          end: {
            line: 43,
            column: 3
          }
        },
        line: 30
      },
      '6': {
        name: '(anonymous_6)',
        decl: {
          start: {
            line: 36,
            column: 44
          },
          end: {
            line: 36,
            column: 45
          }
        },
        loc: {
          start: {
            line: 36,
            column: 53
          },
          end: {
            line: 39,
            column: 9
          }
        },
        line: 36
      }
    },
    branchMap: {
      '0': {
        loc: {
          start: {
            line: 6,
            column: 14
          },
          end: {
            line: 6,
            column: 45
          }
        },
        type: 'default-arg',
        locations: [{
          start: {
            line: 6,
            column: 25
          },
          end: {
            line: 6,
            column: 45
          }
        }],
        line: 6
      }
    },
    s: {
      '0': 0,
      '1': 0,
      '2': 0,
      '3': 0,
      '4': 0,
      '5': 0,
      '6': 0,
      '7': 0,
      '8': 0,
      '9': 0,
      '10': 0,
      '11': 0,
      '12': 0,
      '13': 0,
      '14': 0
    },
    f: {
      '0': 0,
      '1': 0,
      '2': 0,
      '3': 0,
      '4': 0,
      '5': 0,
      '6': 0
    },
    b: {
      '0': [0]
    },
    _coverageSchema: '332fd63041d2c1bcb487cc26dd0d5f7d97098a6c'
  },
      coverage = global[gcv] || (global[gcv] = {});

  if (coverage[path] && coverage[path].hash === hash) {
    return coverage[path];
  }

  coverageData.hash = hash;
  return coverage[path] = coverageData;
}();

var _ref = (++cov_1eyosjm197.s[0], require('zerorpc'));
var Client = _ref.Client;

var _ref2 = (++cov_1eyosjm197.s[1], require('events'));
var EventEmitter = _ref2.EventEmitter;

var awaitify = (++cov_1eyosjm197.s[2], require('apr-awaitify'));

var DockerComposeClient = function (_EventEmitter) {
  inherits(DockerComposeClient, _EventEmitter);

  function DockerComposeClient() {
    var _this2 = this;

    var endpoint = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (++cov_1eyosjm197.b[0][0], 'tcp://0.0.0.0:4242');
    classCallCheck(this, DockerComposeClient);
    ++cov_1eyosjm197.f[0];
    ++cov_1eyosjm197.s[3];

    var _this = possibleConstructorReturn(this, (DockerComposeClient.__proto__ || Object.getPrototypeOf(DockerComposeClient)).call(this));

    ++cov_1eyosjm197.s[4];


    _this.client = new Client();
    ++cov_1eyosjm197.s[5];
    _this.client.connect(endpoint);
    ++cov_1eyosjm197.s[6];
    _this.client.on('error', function (err) {
      newArrowCheck(this, _this2);
      ++cov_1eyosjm197.f[1];
      ++cov_1eyosjm197.s[7];
      return _this.emit('error', err);
    }.bind(this));

    ++cov_1eyosjm197.s[8];
    _this._invoke = awaitify(_this._invoke.bind(_this));
    return _this;
  }

  // Why isn't client.connect async with error??


  createClass(DockerComposeClient, [{
    key: '_invoke',
    value: function _invoke(name) {
      var _client;

      ++cov_1eyosjm197.f[2];
      ++cov_1eyosjm197.s[9];

      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      return (_client = this.client).invoke.apply(_client, [name].concat(args));
    }
  }, {
    key: 'close',
    value: function close() {
      ++cov_1eyosjm197.f[3];
      ++cov_1eyosjm197.s[10];

      return this.client.close();
    }
  }, {
    key: 'provision',
    value: function provision(_ref3) {
      var projectName = _ref3.projectName,
          manifest = _ref3.manifest;
      ++cov_1eyosjm197.f[4];
      ++cov_1eyosjm197.s[11];

      // eslint-disable-next-line camelcase
      return this._invoke('up', { project_name: projectName }, manifest);
    }
  }, {
    key: 'scale',
    value: function scale(_ref4) {
      var _this3 = this;

      var projectName = _ref4.projectName,
          services = _ref4.services,
          manifest = _ref4.manifest;
      ++cov_1eyosjm197.f[5];
      ++cov_1eyosjm197.s[12];

      return this._invoke('scale', {
        // eslint-disable-next-line camelcase
        project_name: projectName,
        services: Object.keys(services).map(function (name) {
          newArrowCheck(this, _this3);
          ++cov_1eyosjm197.f[6];
          ++cov_1eyosjm197.s[13];
          return {
            name: name,
            num: services[name]
          };
        }.bind(this))
      }, manifest);
    }
  }]);
  return DockerComposeClient;
}(EventEmitter);

++cov_1eyosjm197.s[14];


module.exports = DockerComposeClient;

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXgudW1kLmpzIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgeyBDbGllbnQgfSA9IHJlcXVpcmUoJ3plcm9ycGMnKTtcbmNvbnN0IHsgRXZlbnRFbWl0dGVyIH0gPSByZXF1aXJlKCdldmVudHMnKTtcbmNvbnN0IGF3YWl0aWZ5ID0gcmVxdWlyZSgnYXByLWF3YWl0aWZ5Jyk7XG5cbmNsYXNzIERvY2tlckNvbXBvc2VDbGllbnQgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuICBjb25zdHJ1Y3RvcihlbmRwb2ludCA9ICd0Y3A6Ly8wLjAuMC4wOjQyNDInKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuY2xpZW50ID0gbmV3IENsaWVudCgpO1xuICAgIHRoaXMuY2xpZW50LmNvbm5lY3QoZW5kcG9pbnQpO1xuICAgIHRoaXMuY2xpZW50Lm9uKCdlcnJvcicsIGVyciA9PiB0aGlzLmVtaXQoJ2Vycm9yJywgZXJyKSk7XG5cbiAgICB0aGlzLl9pbnZva2UgPSBhd2FpdGlmeSh0aGlzLl9pbnZva2UuYmluZCh0aGlzKSk7XG4gIH1cblxuICAvLyBXaHkgaXNuJ3QgY2xpZW50LmNvbm5lY3QgYXN5bmMgd2l0aCBlcnJvcj8/XG4gIF9pbnZva2UobmFtZSwgLi4uYXJncykge1xuICAgIHJldHVybiB0aGlzLmNsaWVudC5pbnZva2UobmFtZSwgLi4uYXJncyk7XG4gIH1cblxuICBjbG9zZSgpIHtcbiAgICByZXR1cm4gdGhpcy5jbGllbnQuY2xvc2UoKTtcbiAgfVxuXG4gIHByb3Zpc2lvbih7IHByb2plY3ROYW1lLCBtYW5pZmVzdCB9KSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNhbWVsY2FzZVxuICAgIHJldHVybiB0aGlzLl9pbnZva2UoJ3VwJywgeyBwcm9qZWN0X25hbWU6IHByb2plY3ROYW1lIH0sIG1hbmlmZXN0KTtcbiAgfVxuXG4gIHNjYWxlKHsgcHJvamVjdE5hbWUsIHNlcnZpY2VzLCBtYW5pZmVzdCB9KSB7XG4gICAgcmV0dXJuIHRoaXMuX2ludm9rZShcbiAgICAgICdzY2FsZScsXG4gICAgICB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjYW1lbGNhc2VcbiAgICAgICAgcHJvamVjdF9uYW1lOiBwcm9qZWN0TmFtZSxcbiAgICAgICAgc2VydmljZXM6IE9iamVjdC5rZXlzKHNlcnZpY2VzKS5tYXAobmFtZSA9PiAoe1xuICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgbnVtOiBzZXJ2aWNlc1tuYW1lXVxuICAgICAgICB9KSlcbiAgICAgIH0sXG4gICAgICBtYW5pZmVzdFxuICAgICk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBEb2NrZXJDb21wb3NlQ2xpZW50O1xuIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJDbGllbnQiLCJFdmVudEVtaXR0ZXIiLCJhd2FpdGlmeSIsIkRvY2tlckNvbXBvc2VDbGllbnQiLCJlbmRwb2ludCIsImNsaWVudCIsImNvbm5lY3QiLCJvbiIsImVtaXQiLCJlcnIiLCJfaW52b2tlIiwiYmluZCIsIm5hbWUiLCJhcmdzIiwiaW52b2tlIiwiY2xvc2UiLCJwcm9qZWN0TmFtZSIsIm1hbmlmZXN0IiwicHJvamVjdF9uYW1lIiwic2VydmljZXMiLCJPYmplY3QiLCJrZXlzIiwibWFwIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzttQ0FBbUJBLFFBQVEsU0FBUjtJQUFYQyxjQUFBQTs7b0NBQ2lCRCxRQUFRLFFBQVI7SUFBakJFLHFCQUFBQTs7QUFDUixJQUFNQyxtQ0FBV0gsUUFBUSxjQUFSLENBQVgsQ0FBTjs7SUFFTUk7OztpQ0FDeUM7OztRQUFqQ0MsUUFBaUMsa0dBQXRCLG9CQUFzQjs7Ozs7Ozs7OztVQUd0Q0MsTUFBTCxHQUFjLElBQUlMLE1BQUosRUFBZDs7VUFDS0ssTUFBTCxDQUFZQyxPQUFaLENBQW9CRixRQUFwQjs7VUFDS0MsTUFBTCxDQUFZRSxFQUFaLENBQWUsT0FBZixFQUF3QixlQUFPOzs7O21CQUFLQyxJQUFMLENBQVUsT0FBVixFQUFtQkMsR0FBbkI7S0FBL0I7OztVQUVLQyxPQUFMLEdBQWVSLFNBQVMsTUFBS1EsT0FBTCxDQUFhQyxJQUFiLE9BQVQsQ0FBZjs7Ozs7Ozs7OzRCQUlNQyxNQUFlOzs7Ozs7d0NBQU5DLElBQU07WUFBQTs7O2FBQ2QsZ0JBQUtSLE1BQUwsRUFBWVMsTUFBWixpQkFBbUJGLElBQW5CLFNBQTRCQyxJQUE1QixFQUFQOzs7OzRCQUdNOzs7O2FBQ0MsS0FBS1IsTUFBTCxDQUFZVSxLQUFaLEVBQVA7Ozs7cUNBR21DO1VBQXpCQyxXQUF5QixTQUF6QkEsV0FBeUI7VUFBWkMsUUFBWSxTQUFaQSxRQUFZOzs7OzthQUU1QixLQUFLUCxPQUFMLENBQWEsSUFBYixFQUFtQixFQUFFUSxjQUFjRixXQUFoQixFQUFuQixFQUFrREMsUUFBbEQsQ0FBUDs7OztpQ0FHeUM7OztVQUFuQ0QsV0FBbUMsU0FBbkNBLFdBQW1DO1VBQXRCRyxRQUFzQixTQUF0QkEsUUFBc0I7VUFBWkYsUUFBWSxTQUFaQSxRQUFZOzs7O2FBQ2xDLEtBQUtQLE9BQUwsQ0FDTCxPQURLLEVBRUw7O3NCQUVnQk0sV0FGaEI7a0JBR1lJLE9BQU9DLElBQVAsQ0FBWUYsUUFBWixFQUFzQkcsR0FBdEIsQ0FBMEIsZ0JBQVM7Ozs7O3NCQUFBO2lCQUV0Q0gsU0FBU1AsSUFBVDs7U0FGRztPQUxQLEVBVUxLLFFBVkssQ0FBUDs7OztFQTFCOEJoQjs7Ozs7QUF5Q2xDc0IsT0FBT0MsT0FBUCxHQUFpQnJCLG1CQUFqQjs7In0=
