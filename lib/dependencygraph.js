var makeGraph = require('./make_graph');
var baseURL;

var slice = Array.prototype.slice;

exports = module.exports = function(modules) {
  var config = {
    baseURL: baseURL
  };

  return makeGraph(modules, config);
};

exports.withConfig = function(configModule) {
  var withConfig = function(modules) {
    modules = slice.call(modules);
    modules.unshift(configModule);

    var config = {
      baseURL: baseURL
    };

    var buildImport = {};
    buildImport[configModule] = true;
    return makeGraph(modules, config, {
      buildImport: buildImport
    });
  };

  Object.defineProperty(withConfig, 'baseURL', baseURLSettings);
  return withConfig;
};

var baseURLSettings = {
  get: function() {
    return baseURL;
  },
  set: function(val) {
    baseURL = val;
  }
};

Object.defineProperty(exports, 'baseURL', baseURLSettings);
