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

var cov_es50xc93t = function () {
  var path = '/Users/ramitos/dev/yld/joyent-portal/spikes/compose-demo/vendor/docker-compose-client/src/index.js',
      hash = 'f84fef795787745e6663470c5523a8005895771a',
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/Users/ramitos/dev/yld/joyent-portal/spikes/compose-demo/vendor/docker-compose-client/src/index.js',
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
          line: 12,
          column: 7
        }
      },
      '5': {
        start: {
          line: 14,
          column: 4
        },
        end: {
          line: 14,
          column: 34
        }
      },
      '6': {
        start: {
          line: 15,
          column: 4
        },
        end: {
          line: 15,
          column: 60
        }
      },
      '7': {
        start: {
          line: 15,
          column: 35
        },
        end: {
          line: 15,
          column: 58
        }
      },
      '8': {
        start: {
          line: 17,
          column: 4
        },
        end: {
          line: 17,
          column: 53
        }
      },
      '9': {
        start: {
          line: 22,
          column: 4
        },
        end: {
          line: 22,
          column: 45
        }
      },
      '10': {
        start: {
          line: 26,
          column: 4
        },
        end: {
          line: 26,
          column: 31
        }
      },
      '11': {
        start: {
          line: 31,
          column: 4
        },
        end: {
          line: 31,
          column: 71
        }
      },
      '12': {
        start: {
          line: 35,
          column: 4
        },
        end: {
          line: 46,
          column: 6
        }
      },
      '13': {
        start: {
          line: 40,
          column: 53
        },
        end: {
          line: 43,
          column: 9
        }
      },
      '14': {
        start: {
          line: 50,
          column: 0
        },
        end: {
          line: 50,
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
            line: 18,
            column: 3
          }
        },
        line: 6
      },
      '1': {
        name: '(anonymous_1)',
        decl: {
          start: {
            line: 15,
            column: 28
          },
          end: {
            line: 15,
            column: 29
          }
        },
        loc: {
          start: {
            line: 15,
            column: 35
          },
          end: {
            line: 15,
            column: 58
          }
        },
        line: 15
      },
      '2': {
        name: '(anonymous_2)',
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
            column: 25
          },
          end: {
            line: 23,
            column: 3
          }
        },
        line: 21
      },
      '3': {
        name: '(anonymous_3)',
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
            column: 10
          },
          end: {
            line: 27,
            column: 3
          }
        },
        line: 25
      },
      '4': {
        name: '(anonymous_4)',
        decl: {
          start: {
            line: 29,
            column: 2
          },
          end: {
            line: 29,
            column: 3
          }
        },
        loc: {
          start: {
            line: 29,
            column: 39
          },
          end: {
            line: 32,
            column: 3
          }
        },
        line: 29
      },
      '5': {
        name: '(anonymous_5)',
        decl: {
          start: {
            line: 34,
            column: 2
          },
          end: {
            line: 34,
            column: 3
          }
        },
        loc: {
          start: {
            line: 34,
            column: 45
          },
          end: {
            line: 47,
            column: 3
          }
        },
        line: 34
      },
      '6': {
        name: '(anonymous_6)',
        decl: {
          start: {
            line: 40,
            column: 44
          },
          end: {
            line: 40,
            column: 45
          }
        },
        loc: {
          start: {
            line: 40,
            column: 53
          },
          end: {
            line: 43,
            column: 9
          }
        },
        line: 40
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

var _ref = (++cov_es50xc93t.s[0], require('zerorpc'));
var Client = _ref.Client;

var _ref2 = (++cov_es50xc93t.s[1], require('events'));
var EventEmitter = _ref2.EventEmitter;

var awaitify = (++cov_es50xc93t.s[2], require('apr-awaitify'));

var DockerComposeClient = function (_EventEmitter) {
  inherits(DockerComposeClient, _EventEmitter);

  function DockerComposeClient() {
    var _this2 = this;

    var endpoint = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (++cov_es50xc93t.b[0][0], 'tcp://0.0.0.0:4242');
    classCallCheck(this, DockerComposeClient);
    ++cov_es50xc93t.f[0];
    ++cov_es50xc93t.s[3];

    var _this = possibleConstructorReturn(this, (DockerComposeClient.__proto__ || Object.getPrototypeOf(DockerComposeClient)).call(this));

    ++cov_es50xc93t.s[4];


    _this.client = new Client({
      heartbeatInterval: 60 * 60 * 2,
      timeout: 60 * 60 * 2
    });

    ++cov_es50xc93t.s[5];
    _this.client.connect(endpoint);
    ++cov_es50xc93t.s[6];
    _this.client.on('error', function (err) {
      newArrowCheck(this, _this2);
      ++cov_es50xc93t.f[1];
      ++cov_es50xc93t.s[7];
      return _this.emit('error', err);
    }.bind(this));

    ++cov_es50xc93t.s[8];
    _this._invoke = awaitify(_this._invoke.bind(_this));
    return _this;
  }

  // Why isn't client.connect async with error??


  createClass(DockerComposeClient, [{
    key: '_invoke',
    value: function _invoke(name) {
      var _client;

      ++cov_es50xc93t.f[2];
      ++cov_es50xc93t.s[9];

      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      return (_client = this.client).invoke.apply(_client, [name].concat(args));
    }
  }, {
    key: 'close',
    value: function close() {
      ++cov_es50xc93t.f[3];
      ++cov_es50xc93t.s[10];

      return this.client.close();
    }
  }, {
    key: 'provision',
    value: function provision(_ref3) {
      var projectName = _ref3.projectName,
          manifest = _ref3.manifest;
      ++cov_es50xc93t.f[4];
      ++cov_es50xc93t.s[11];

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
      ++cov_es50xc93t.f[5];
      ++cov_es50xc93t.s[12];

      return this._invoke('scale', {
        // eslint-disable-next-line camelcase
        project_name: projectName,
        services: Object.keys(services).map(function (name) {
          newArrowCheck(this, _this3);
          ++cov_es50xc93t.f[6];
          ++cov_es50xc93t.s[13];
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

++cov_es50xc93t.s[14];


module.exports = DockerComposeClient;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguZXMuanMiLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7IENsaWVudCB9ID0gcmVxdWlyZSgnemVyb3JwYycpO1xuY29uc3QgeyBFdmVudEVtaXR0ZXIgfSA9IHJlcXVpcmUoJ2V2ZW50cycpO1xuY29uc3QgYXdhaXRpZnkgPSByZXF1aXJlKCdhcHItYXdhaXRpZnknKTtcblxuY2xhc3MgRG9ja2VyQ29tcG9zZUNsaWVudCBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG4gIGNvbnN0cnVjdG9yKGVuZHBvaW50ID0gJ3RjcDovLzAuMC4wLjA6NDI0MicpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5jbGllbnQgPSBuZXcgQ2xpZW50KHtcbiAgICAgIGhlYXJ0YmVhdEludGVydmFsOiAoNjAgKiA2MCAqIDIpLFxuICAgICAgdGltZW91dDogKDYwICogNjAgKiAyKVxuICAgIH0pO1xuXG4gICAgdGhpcy5jbGllbnQuY29ubmVjdChlbmRwb2ludCk7XG4gICAgdGhpcy5jbGllbnQub24oJ2Vycm9yJywgZXJyID0+IHRoaXMuZW1pdCgnZXJyb3InLCBlcnIpKTtcblxuICAgIHRoaXMuX2ludm9rZSA9IGF3YWl0aWZ5KHRoaXMuX2ludm9rZS5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIC8vIFdoeSBpc24ndCBjbGllbnQuY29ubmVjdCBhc3luYyB3aXRoIGVycm9yPz9cbiAgX2ludm9rZShuYW1lLCAuLi5hcmdzKSB7XG4gICAgcmV0dXJuIHRoaXMuY2xpZW50Lmludm9rZShuYW1lLCAuLi5hcmdzKTtcbiAgfVxuXG4gIGNsb3NlKCkge1xuICAgIHJldHVybiB0aGlzLmNsaWVudC5jbG9zZSgpO1xuICB9XG5cbiAgcHJvdmlzaW9uKHsgcHJvamVjdE5hbWUsIG1hbmlmZXN0IH0pIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY2FtZWxjYXNlXG4gICAgcmV0dXJuIHRoaXMuX2ludm9rZSgndXAnLCB7IHByb2plY3RfbmFtZTogcHJvamVjdE5hbWUgfSwgbWFuaWZlc3QpO1xuICB9XG5cbiAgc2NhbGUoeyBwcm9qZWN0TmFtZSwgc2VydmljZXMsIG1hbmlmZXN0IH0pIHtcbiAgICByZXR1cm4gdGhpcy5faW52b2tlKFxuICAgICAgJ3NjYWxlJyxcbiAgICAgIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNhbWVsY2FzZVxuICAgICAgICBwcm9qZWN0X25hbWU6IHByb2plY3ROYW1lLFxuICAgICAgICBzZXJ2aWNlczogT2JqZWN0LmtleXMoc2VydmljZXMpLm1hcChuYW1lID0+ICh7XG4gICAgICAgICAgbmFtZSxcbiAgICAgICAgICBudW06IHNlcnZpY2VzW25hbWVdXG4gICAgICAgIH0pKVxuICAgICAgfSxcbiAgICAgIG1hbmlmZXN0XG4gICAgKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IERvY2tlckNvbXBvc2VDbGllbnQ7XG4iXSwibmFtZXMiOlsicmVxdWlyZSIsIkNsaWVudCIsIkV2ZW50RW1pdHRlciIsImF3YWl0aWZ5IiwiRG9ja2VyQ29tcG9zZUNsaWVudCIsImVuZHBvaW50IiwiY2xpZW50IiwiY29ubmVjdCIsIm9uIiwiZW1pdCIsImVyciIsIl9pbnZva2UiLCJiaW5kIiwibmFtZSIsImFyZ3MiLCJpbnZva2UiLCJjbG9zZSIsInByb2plY3ROYW1lIiwibWFuaWZlc3QiLCJwcm9qZWN0X25hbWUiLCJzZXJ2aWNlcyIsIk9iamVjdCIsImtleXMiLCJtYXAiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tDQUFtQkEsUUFBUSxTQUFSO0lBQVhDLGNBQUFBOzttQ0FDaUJELFFBQVEsUUFBUjtJQUFqQkUscUJBQUFBOztBQUNSLElBQU1DLGtDQUFXSCxRQUFRLGNBQVIsQ0FBWCxDQUFOOztJQUVNSTs7O2lDQUN5Qzs7O1FBQWpDQyxRQUFpQyxpR0FBdEIsb0JBQXNCOzs7Ozs7Ozs7O1VBR3RDQyxNQUFMLEdBQWMsSUFBSUwsTUFBSixDQUFXO3lCQUNILEtBQUssRUFBTCxHQUFVLENBRFA7ZUFFYixLQUFLLEVBQUwsR0FBVTtLQUZSLENBQWQ7OztVQUtLSyxNQUFMLENBQVlDLE9BQVosQ0FBb0JGLFFBQXBCOztVQUNLQyxNQUFMLENBQVlFLEVBQVosQ0FBZSxPQUFmLEVBQXdCLGVBQU87Ozs7bUJBQUtDLElBQUwsQ0FBVSxPQUFWLEVBQW1CQyxHQUFuQjtLQUEvQjs7O1VBRUtDLE9BQUwsR0FBZVIsU0FBUyxNQUFLUSxPQUFMLENBQWFDLElBQWIsT0FBVCxDQUFmOzs7Ozs7Ozs7NEJBSU1DLE1BQWU7Ozs7Ozt3Q0FBTkMsSUFBTTtZQUFBOzs7YUFDZCxnQkFBS1IsTUFBTCxFQUFZUyxNQUFaLGlCQUFtQkYsSUFBbkIsU0FBNEJDLElBQTVCLEVBQVA7Ozs7NEJBR007Ozs7YUFDQyxLQUFLUixNQUFMLENBQVlVLEtBQVosRUFBUDs7OztxQ0FHbUM7VUFBekJDLFdBQXlCLFNBQXpCQSxXQUF5QjtVQUFaQyxRQUFZLFNBQVpBLFFBQVk7Ozs7O2FBRTVCLEtBQUtQLE9BQUwsQ0FBYSxJQUFiLEVBQW1CLEVBQUVRLGNBQWNGLFdBQWhCLEVBQW5CLEVBQWtEQyxRQUFsRCxDQUFQOzs7O2lDQUd5Qzs7O1VBQW5DRCxXQUFtQyxTQUFuQ0EsV0FBbUM7VUFBdEJHLFFBQXNCLFNBQXRCQSxRQUFzQjtVQUFaRixRQUFZLFNBQVpBLFFBQVk7Ozs7YUFDbEMsS0FBS1AsT0FBTCxDQUNMLE9BREssRUFFTDs7c0JBRWdCTSxXQUZoQjtrQkFHWUksT0FBT0MsSUFBUCxDQUFZRixRQUFaLEVBQXNCRyxHQUF0QixDQUEwQixnQkFBUzs7Ozs7c0JBQUE7aUJBRXRDSCxTQUFTUCxJQUFUOztTQUZHO09BTFAsRUFVTEssUUFWSyxDQUFQOzs7O0VBOUI4QmhCOzs7OztBQTZDbENzQixPQUFPQyxPQUFQLEdBQWlCckIsbUJBQWpCIn0=
