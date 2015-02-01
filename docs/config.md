@function config
@parent DependencyGraph.instance
@description Appends a configuration file to be executed before loading any
module with [for]. Configuration files are an important part of client-side loaders
because they provide information needed to load a module such as its path.

@signature `config(configFile)`

```js
var dependencyGraph = DependencyGraph()
  .config('myconfig');
```

In the above example `myconfig` is a configuration file located at `myconfig.js` relative
to the `baseURL`. If you need to adjust the baseURL use [root].

@return {DependencyGraph} Returns the instance of DependencyGraph, for chaining.
