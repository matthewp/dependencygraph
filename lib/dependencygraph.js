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

  config: function(configName) {
    this.executedModules[configName] = true;
    return this;
  },

  for: function(modules) {
    modules = typeof modules === 'string' ? [modules] : modules;
    return this.makeGraph(modules);
  },

  makeGraph: makeGraph,

  setup: function() {
    this.originalSystem = global.System;
    var System = require('systemjs');
    
    this.localSystem = System.clone();
    this.buildSystem = System.clone();
    return {
      localSystem: this.localSystem,
      buildSystem: this.buildSystem
    };
  },

  teardown: function() {
    global.System = this.originalSystem;
  },

  preBuild: function() {
    global.System = this.localSystem;
  },

  preLocal: function() {}

});
