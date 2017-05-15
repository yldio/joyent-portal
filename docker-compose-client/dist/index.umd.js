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

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXgudW1kLmpzIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgeyBDbGllbnQgfSA9IHJlcXVpcmUoJ3plcm9ycGMnKTtcbmNvbnN0IHsgRXZlbnRFbWl0dGVyIH0gPSByZXF1aXJlKCdldmVudHMnKTtcbmNvbnN0IGF3YWl0aWZ5ID0gcmVxdWlyZSgnYXByLWF3YWl0aWZ5Jyk7XG5cbmNsYXNzIERvY2tlckNvbXBvc2VDbGllbnQgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuICBjb25zdHJ1Y3RvcihlbmRwb2ludCA9ICd0Y3A6Ly8wLjAuMC4wOjQyNDInKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuY2xpZW50ID0gbmV3IENsaWVudCh7XG4gICAgICBoZWFydGJlYXRJbnRlcnZhbDogNjAgKiA0ICogMTAwMCwgLy8gNG1cbiAgICAgIHRpbWVvdXQ6IDYwICogMzAsIC8vIDMwbVxuICAgIH0pO1xuXG4gICAgdGhpcy5jbGllbnQuY29ubmVjdChlbmRwb2ludCk7XG4gICAgdGhpcy5jbGllbnQub24oJ2Vycm9yJywgZXJyID0+IHRoaXMuZW1pdCgnZXJyb3InLCBlcnIpKTtcblxuICAgIHRoaXMuX2ludm9rZSA9IGF3YWl0aWZ5KHRoaXMuX2ludm9rZS5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIC8vIFdoeSBpc24ndCBjbGllbnQuY29ubmVjdCBhc3luYyB3aXRoIGVycm9yPz9cbiAgX2ludm9rZShuYW1lLCAuLi5hcmdzKSB7XG4gICAgcmV0dXJuIHRoaXMuY2xpZW50Lmludm9rZShuYW1lLCAuLi5hcmdzKTtcbiAgfVxuXG4gIGNsb3NlKCkge1xuICAgIHJldHVybiB0aGlzLmNsaWVudC5jbG9zZSgpO1xuICB9XG5cbiAgcHJvdmlzaW9uKHsgcHJvamVjdE5hbWUsIG1hbmlmZXN0IH0pIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY2FtZWxjYXNlXG4gICAgcmV0dXJuIHRoaXMuX2ludm9rZSgndXAnLCB7IHByb2plY3RfbmFtZTogcHJvamVjdE5hbWUgfSwgbWFuaWZlc3QpO1xuICB9XG5cbiAgc2NhbGUoeyBwcm9qZWN0TmFtZSwgc2VydmljZXMsIG1hbmlmZXN0IH0pIHtcbiAgICByZXR1cm4gdGhpcy5faW52b2tlKFxuICAgICAgJ3NjYWxlJyxcbiAgICAgIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNhbWVsY2FzZVxuICAgICAgICBwcm9qZWN0X25hbWU6IHByb2plY3ROYW1lLFxuICAgICAgICBzZXJ2aWNlczogT2JqZWN0LmtleXMoc2VydmljZXMpLm1hcChuYW1lID0+ICh7XG4gICAgICAgICAgbmFtZSxcbiAgICAgICAgICBudW06IHNlcnZpY2VzW25hbWVdXG4gICAgICAgIH0pKVxuICAgICAgfSxcbiAgICAgIG1hbmlmZXN0XG4gICAgKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IERvY2tlckNvbXBvc2VDbGllbnQ7XG4iXSwibmFtZXMiOlsicmVxdWlyZSIsIkNsaWVudCIsIkV2ZW50RW1pdHRlciIsImF3YWl0aWZ5IiwiRG9ja2VyQ29tcG9zZUNsaWVudCIsImVuZHBvaW50IiwiY2xpZW50IiwiY29ubmVjdCIsIm9uIiwiZW1pdCIsImVyciIsIl9pbnZva2UiLCJiaW5kIiwibmFtZSIsImFyZ3MiLCJpbnZva2UiLCJjbG9zZSIsInByb2plY3ROYW1lIiwibWFuaWZlc3QiLCJwcm9qZWN0X25hbWUiLCJzZXJ2aWNlcyIsIk9iamVjdCIsImtleXMiLCJtYXAiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2VBQW1CQSxRQUFRLFNBQVI7SUFBWEMsa0JBQUFBOztnQkFDaUJELFFBQVEsUUFBUjtJQUFqQkUseUJBQUFBOztBQUNSLElBQU1DLFdBQVdILFFBQVEsY0FBUixDQUFqQjs7SUFFTUk7OztpQ0FDeUM7OztRQUFqQ0MsUUFBaUMsdUVBQXRCLG9CQUFzQjs7Ozs7VUFHdENDLE1BQUwsR0FBYyxJQUFJTCxNQUFKLENBQVc7eUJBQ0osS0FBSyxDQUFMLEdBQVMsSUFETDtlQUVkLEtBQUssRUFGUyxFQUFYLENBQWQ7O1VBS0tLLE1BQUwsQ0FBWUMsT0FBWixDQUFvQkYsUUFBcEI7VUFDS0MsTUFBTCxDQUFZRSxFQUFaLENBQWUsT0FBZixFQUF3Qjs7YUFBTyxNQUFLQyxJQUFMLENBQVUsT0FBVixFQUFtQkMsR0FBbkIsQ0FBUDtLQUF4Qjs7VUFFS0MsT0FBTCxHQUFlUixTQUFTLE1BQUtRLE9BQUwsQ0FBYUMsSUFBYixPQUFULENBQWY7Ozs7Ozs7Ozs0QkFJTUMsTUFBZTs7O3dDQUFOQyxJQUFNO1lBQUE7OzthQUNkLGdCQUFLUixNQUFMLEVBQVlTLE1BQVosaUJBQW1CRixJQUFuQixTQUE0QkMsSUFBNUIsRUFBUDs7Ozs0QkFHTTthQUNDLEtBQUtSLE1BQUwsQ0FBWVUsS0FBWixFQUFQOzs7O29DQUdtQztVQUF6QkMsV0FBeUIsUUFBekJBLFdBQXlCO1VBQVpDLFFBQVksUUFBWkEsUUFBWTs7O2FBRTVCLEtBQUtQLE9BQUwsQ0FBYSxJQUFiLEVBQW1CLEVBQUVRLGNBQWNGLFdBQWhCLEVBQW5CLEVBQWtEQyxRQUFsRCxDQUFQOzs7O2lDQUd5Qzs7O1VBQW5DRCxXQUFtQyxTQUFuQ0EsV0FBbUM7VUFBdEJHLFFBQXNCLFNBQXRCQSxRQUFzQjtVQUFaRixRQUFZLFNBQVpBLFFBQVk7O2FBQ2xDLEtBQUtQLE9BQUwsQ0FDTCxPQURLLEVBRUw7O3NCQUVnQk0sV0FGaEI7a0JBR1lJLE9BQU9DLElBQVAsQ0FBWUYsUUFBWixFQUFzQkcsR0FBdEIsQ0FBMEI7O2lCQUFTO3NCQUFBO2lCQUV0Q0gsU0FBU1AsSUFBVDtXQUY2QjtTQUExQjtPQUxQLEVBVUxLLFFBVkssQ0FBUDs7OztFQTlCOEJoQjs7QUE2Q2xDc0IsT0FBT0MsT0FBUCxHQUFpQnJCLG1CQUFqQjs7In0=
