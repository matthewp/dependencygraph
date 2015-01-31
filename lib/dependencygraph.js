var extend = require('lodash').extend;
var makeGraph = require('./make_graph');

module.exports = DependencyGraph;

function DependencyGraph() {
  if(!(this instanceof DependencyGraph)) {
    return new DependencyGraph();
  }

  this.configData = {};
  this.executedModules = {};
}

extend(DependencyGraph.prototype, {

  root: function(baseURL) {
    this.configData.baseURL = baseURL;
    return this;
  },

  config: function(configFile) {
    this.executedModules[configFile] = true;
    return this;
  },

  system: function(system) {
    this.loader = system;
    return this;
  },

  for: function(modules) {
    modules = typeof modules === 'string' ? [modules] : modules;
    return this.makeGraph(modules);
  },

  makeGraph: makeGraph


});
