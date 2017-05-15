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

var _require = require('zerorpc');
var Client = _require.Client;

var _require2 = require('events');
var EventEmitter = _require2.EventEmitter;

var awaitify = require('apr-awaitify');

var DockerComposeClient = function (_EventEmitter) {
  inherits(DockerComposeClient, _EventEmitter);

  function DockerComposeClient() {
    var _this2 = this;

    var endpoint = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'tcp://0.0.0.0:4242';
    classCallCheck(this, DockerComposeClient);

    var _this = possibleConstructorReturn(this, (DockerComposeClient.__proto__ || Object.getPrototypeOf(DockerComposeClient)).call(this));

    _this.client = new Client({
      heartbeatInterval: 60 * 4 * 1000, // 4m
      timeout: 60 * 30 });

    _this.client.connect(endpoint);
    _this.client.on('error', function (err) {
      newArrowCheck(this, _this2);
      return _this.emit('error', err);
    }.bind(this));

    _this._invoke = awaitify(_this._invoke.bind(_this));
    return _this;
  }

  // Why isn't client.connect async with error??


  createClass(DockerComposeClient, [{
    key: '_invoke',
    value: function _invoke(name) {
      var _client;

      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      return (_client = this.client).invoke.apply(_client, [name].concat(args));
    }
  }, {
    key: 'close',
    value: function close() {
      return this.client.close();
    }
  }, {
    key: 'provision',
    value: function provision(_ref) {
      var projectName = _ref.projectName,
          manifest = _ref.manifest;

      // eslint-disable-next-line camelcase
      return this._invoke('up', { project_name: projectName }, manifest);
    }
  }, {
    key: 'scale',
    value: function scale(_ref2) {
      var _this3 = this;

      var projectName = _ref2.projectName,
          services = _ref2.services,
          manifest = _ref2.manifest;

      return this._invoke('scale', {
        // eslint-disable-next-line camelcase
        project_name: projectName,
        services: Object.keys(services).map(function (name) {
          newArrowCheck(this, _this3);
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

module.exports = DockerComposeClient;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguZXMuanMiLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7IENsaWVudCB9ID0gcmVxdWlyZSgnemVyb3JwYycpO1xuY29uc3QgeyBFdmVudEVtaXR0ZXIgfSA9IHJlcXVpcmUoJ2V2ZW50cycpO1xuY29uc3QgYXdhaXRpZnkgPSByZXF1aXJlKCdhcHItYXdhaXRpZnknKTtcblxuY2xhc3MgRG9ja2VyQ29tcG9zZUNsaWVudCBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG4gIGNvbnN0cnVjdG9yKGVuZHBvaW50ID0gJ3RjcDovLzAuMC4wLjA6NDI0MicpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5jbGllbnQgPSBuZXcgQ2xpZW50KHtcbiAgICAgIGhlYXJ0YmVhdEludGVydmFsOiA2MCAqIDQgKiAxMDAwLCAvLyA0bVxuICAgICAgdGltZW91dDogNjAgKiAzMCwgLy8gMzBtXG4gICAgfSk7XG5cbiAgICB0aGlzLmNsaWVudC5jb25uZWN0KGVuZHBvaW50KTtcbiAgICB0aGlzLmNsaWVudC5vbignZXJyb3InLCBlcnIgPT4gdGhpcy5lbWl0KCdlcnJvcicsIGVycikpO1xuXG4gICAgdGhpcy5faW52b2tlID0gYXdhaXRpZnkodGhpcy5faW52b2tlLmJpbmQodGhpcykpO1xuICB9XG5cbiAgLy8gV2h5IGlzbid0IGNsaWVudC5jb25uZWN0IGFzeW5jIHdpdGggZXJyb3I/P1xuICBfaW52b2tlKG5hbWUsIC4uLmFyZ3MpIHtcbiAgICByZXR1cm4gdGhpcy5jbGllbnQuaW52b2tlKG5hbWUsIC4uLmFyZ3MpO1xuICB9XG5cbiAgY2xvc2UoKSB7XG4gICAgcmV0dXJuIHRoaXMuY2xpZW50LmNsb3NlKCk7XG4gIH1cblxuICBwcm92aXNpb24oeyBwcm9qZWN0TmFtZSwgbWFuaWZlc3QgfSkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjYW1lbGNhc2VcbiAgICByZXR1cm4gdGhpcy5faW52b2tlKCd1cCcsIHsgcHJvamVjdF9uYW1lOiBwcm9qZWN0TmFtZSB9LCBtYW5pZmVzdCk7XG4gIH1cblxuICBzY2FsZSh7IHByb2plY3ROYW1lLCBzZXJ2aWNlcywgbWFuaWZlc3QgfSkge1xuICAgIHJldHVybiB0aGlzLl9pbnZva2UoXG4gICAgICAnc2NhbGUnLFxuICAgICAge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY2FtZWxjYXNlXG4gICAgICAgIHByb2plY3RfbmFtZTogcHJvamVjdE5hbWUsXG4gICAgICAgIHNlcnZpY2VzOiBPYmplY3Qua2V5cyhzZXJ2aWNlcykubWFwKG5hbWUgPT4gKHtcbiAgICAgICAgICBuYW1lLFxuICAgICAgICAgIG51bTogc2VydmljZXNbbmFtZV1cbiAgICAgICAgfSkpXG4gICAgICB9LFxuICAgICAgbWFuaWZlc3RcbiAgICApO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRG9ja2VyQ29tcG9zZUNsaWVudDtcbiJdLCJuYW1lcyI6WyJyZXF1aXJlIiwiQ2xpZW50IiwiRXZlbnRFbWl0dGVyIiwiYXdhaXRpZnkiLCJEb2NrZXJDb21wb3NlQ2xpZW50IiwiZW5kcG9pbnQiLCJjbGllbnQiLCJjb25uZWN0Iiwib24iLCJlbWl0IiwiZXJyIiwiX2ludm9rZSIsImJpbmQiLCJuYW1lIiwiYXJncyIsImludm9rZSIsImNsb3NlIiwicHJvamVjdE5hbWUiLCJtYW5pZmVzdCIsInByb2plY3RfbmFtZSIsInNlcnZpY2VzIiwiT2JqZWN0Iiwia2V5cyIsIm1hcCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7ZUFBbUJBLFFBQVEsU0FBUjtJQUFYQyxrQkFBQUE7O2dCQUNpQkQsUUFBUSxRQUFSO0lBQWpCRSx5QkFBQUE7O0FBQ1IsSUFBTUMsV0FBV0gsUUFBUSxjQUFSLENBQWpCOztJQUVNSTs7O2lDQUN5Qzs7O1FBQWpDQyxRQUFpQyx1RUFBdEIsb0JBQXNCOzs7OztVQUd0Q0MsTUFBTCxHQUFjLElBQUlMLE1BQUosQ0FBVzt5QkFDSixLQUFLLENBQUwsR0FBUyxJQURMO2VBRWQsS0FBSyxFQUZTLEVBQVgsQ0FBZDs7VUFLS0ssTUFBTCxDQUFZQyxPQUFaLENBQW9CRixRQUFwQjtVQUNLQyxNQUFMLENBQVlFLEVBQVosQ0FBZSxPQUFmLEVBQXdCOzthQUFPLE1BQUtDLElBQUwsQ0FBVSxPQUFWLEVBQW1CQyxHQUFuQixDQUFQO0tBQXhCOztVQUVLQyxPQUFMLEdBQWVSLFNBQVMsTUFBS1EsT0FBTCxDQUFhQyxJQUFiLE9BQVQsQ0FBZjs7Ozs7Ozs7OzRCQUlNQyxNQUFlOzs7d0NBQU5DLElBQU07WUFBQTs7O2FBQ2QsZ0JBQUtSLE1BQUwsRUFBWVMsTUFBWixpQkFBbUJGLElBQW5CLFNBQTRCQyxJQUE1QixFQUFQOzs7OzRCQUdNO2FBQ0MsS0FBS1IsTUFBTCxDQUFZVSxLQUFaLEVBQVA7Ozs7b0NBR21DO1VBQXpCQyxXQUF5QixRQUF6QkEsV0FBeUI7VUFBWkMsUUFBWSxRQUFaQSxRQUFZOzs7YUFFNUIsS0FBS1AsT0FBTCxDQUFhLElBQWIsRUFBbUIsRUFBRVEsY0FBY0YsV0FBaEIsRUFBbkIsRUFBa0RDLFFBQWxELENBQVA7Ozs7aUNBR3lDOzs7VUFBbkNELFdBQW1DLFNBQW5DQSxXQUFtQztVQUF0QkcsUUFBc0IsU0FBdEJBLFFBQXNCO1VBQVpGLFFBQVksU0FBWkEsUUFBWTs7YUFDbEMsS0FBS1AsT0FBTCxDQUNMLE9BREssRUFFTDs7c0JBRWdCTSxXQUZoQjtrQkFHWUksT0FBT0MsSUFBUCxDQUFZRixRQUFaLEVBQXNCRyxHQUF0QixDQUEwQjs7aUJBQVM7c0JBQUE7aUJBRXRDSCxTQUFTUCxJQUFUO1dBRjZCO1NBQTFCO09BTFAsRUFVTEssUUFWSyxDQUFQOzs7O0VBOUI4QmhCOztBQTZDbENzQixPQUFPQyxPQUFQLEdBQWlCckIsbUJBQWpCIn0=
