var trace = require("./trace");
var _ = require("lodash");

module.exports = function(modules) {
  var config = this.configData;

  // Set up to run the "executed modules" first, like the config.
  var executedModules = this.executedModules;
  _.each(executedModules, function(v, m) { modules.unshift(m); });

  // Get the local/build loaders.
  var loader = this.loader || require('systemjs');

  var localSystem = loader.clone();
  var buildSystem = loader.clone();
  this.setup(localSystem, buildSystem);

  // Apply config
  [localSystem, buildSystem].forEach(function(loader) {
    loader.config(config);
  });

	// The graph object we are creating.
	var graph = {},
		depPromises = [];
	
	trace(localSystem, buildSystem, function(load, deps, pluginValue){
		// there could have been an old load from the BuildSystem
		var oldLoad = graph[load.name];
		
		var loadNode = graph[load.name] = {};
		loadNode.load = load;
		
		loadNode.deps = deps;
		
		if(arguments.length === 3){
			// only mark as plugin if there was an oldLoad
			loadNode.isPlugin = !oldLoad;
			loadNode.value = pluginValue;
		}

		var depPromise = Promise.all(deps.map(function(dep){
			return Promise.resolve( localSystem.normalize(dep, load.name, load.address) );
		})).then(function(dependencies){
			loadNode.dependencies = dependencies;
		});
		depPromises.push(depPromise);
	});

  var systemConfig = localSystem.config;
  localSystem.config = function() {
    buildSystem.config.apply(buildSystem, arguments);
    return systemConfig.apply(this, arguments);
  };

  var originalSystem = global.System;
  global.System = localSystem;

  var grapher = this;
  var getNext = function(module) {
    grapher.preBuild();

    var buildPromise = executedModules[module] ?
      buildSystem.import(module) : Promise.resolve();

    var appPromise = buildPromise.then(function() {
      grapher.preLocal();
      return localSystem.import(module);
    });
    depPromises = [];

    return appPromise.then(function(){
      return Promise.all(depPromises).then(function(){
        if(modules.length) {
          return getNext(modules.shift());
        }

        global.System = originalSystem;
        grapher.teardown();

        return graph;
      });
    });
  };

  return getNext(modules.shift());
};
