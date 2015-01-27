var trace = require("./trace");
var System = require("systemjs");
var _ = require("lodash");

module.exports = function(modules, config, options){
  var localSystem = System.clone();
  var buildSystem = System.clone();
  options = options || {};
  options.buildImport = options.buildImport || {};

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
		}, function(err){
			winston.warn("unable to resolve dependency ", err);
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

  var getNext = function(module) {
    var buildPromise = options.buildImport[module] ?
      buildSystem.import(module) : Promise.resolve();

    var appPromise = buildPromise.then(function() {
      return localSystem.import(module);
    });
    depPromises = [];

    return appPromise.then(function(){
      return Promise.all(depPromises).then(function(){
        if(modules.length) {
          return getNext(modules.shift());
        }
        global.System = originalSystem;

        return graph;
      });
    });
  };

  return getNext(modules.shift());
};
