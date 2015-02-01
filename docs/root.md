@function root
@parent DependencyGraph.instance
@description Sets the `baseURL` used during loading.

@signature `root(baseURL)`

```js
var dependencyGraph = DependencyGraph()
  .root(__dirname + '/app');
```

@param {String} baseURL Path to the baseURL to use.

@return {DependencyGraph} Returns the instance of DependencyGraph, for chaining.
