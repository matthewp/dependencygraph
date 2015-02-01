@function for
@parent DependencyGraph.instance
@description Retrieve the dependency graph object for a given set of modules.

@signature `for([modules...])`

@param {String|Array<String>} modules The modules to retrieve using the configuration
created through [root], [config], and others. Whether 1 module or 10 modules (or more)
are provided, all are combined into a single graph object.

@return {Promise<Object>} A Promise that will resolve with a graph object.
