[![Build Status](https://travis-ci.org/matthewp/dependencygraph.svg?branch=master)](https://travis-ci.org/matthewp/dependencygraph)

# DependencyGraph

A module for creating dependency graphs from [SystemJS](https://github.com/systemjs/systemjs) and [StealJS](http://stealjs.com/) based projects.

## Install

```shell
npm install dependencygraph --save
```

## Use

```js
var DependencyGraph = require('dependencygraph');

var dependencyGraph = DependencyGraph()
  .config('path/to/config');

dependencyGraph.for('my/app').then(function(graph) {
  // graph is an object where each key is a module and contains
  // the `load` and `dependencies`.
});
```
